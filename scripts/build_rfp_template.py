#!/usr/bin/env python3
"""
build_rfp_template.py

Rebuilds AES_Structured_Cabling_RFP_Template_v2.2.pdf using reportlab.

Brand tokens (Tech Orange system):
    Navy     #06284C
    Blue     #006FB9
    Orange   #FF6B00
    Cable    #7A9FC0
    Off-white #F4F7FA

Inputs:
    - rfp-images/cover_bg_photo.png   (full bleed cover hero)
    - rfp-images/banner_copper.png    (banner on Section 03 opener)
    - rfp-images/banner_fiber.png     (banner on Section 04 opener)
    - rfp-images/banner_testing.png   (banner on Section 05 opener)
    - rfp-images/back_cover_bg.png    (full bleed back cover)

Output (default):
    aes-website/public/assets/AES_Structured_Cabling_RFP_Template_v2.2.pdf

v2.2 deltas from v2.1:
    1) Alternate pricing rows added to Section 07.1 (sub-table 7.1.2)
    2) Section 1.5 Assumptions / Exclusions / Clarifications expanded
       with structured fields and prompt-style guidance
    3) RCDD review notes callout on "How to Use This Template" page
    4) Bug fix: callout box body widths now extend full width
    5) Bug fix: TR Schedule column widths sum to content width
       (no more overlapping "Existing Racks" / "New Racks" headers)
    6) Bug fix: header subtitle no longer overflows on long section titles

Usage:
    python build_rfp_template.py [--out PATH]
"""

from __future__ import annotations

import argparse
import os
from pathlib import Path

from reportlab.lib.colors import HexColor, Color, white, black
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT, TA_JUSTIFY
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    KeepTogether,
    Image,
    FrameBreak,
    NextPageTemplate,
    Flowable,
)
from reportlab.platypus.flowables import HRFlowable

# -----------------------------------------------------------------------------
# Paths
# -----------------------------------------------------------------------------

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent                  # aes-website/
REPO_ROOT = PROJECT_ROOT.parent                   # AES Website Build/
IMG_DIR = REPO_ROOT / "rfp-images"
LOGO_DIR = PROJECT_ROOT / "public" / "images"
LOGO_REVERSED = LOGO_DIR / "AES_Option3_Reversed_White_Nav_Tight_HiRes.png"  # white logo, transparent bg
LOGO_PRIMARY = LOGO_DIR / "AES_Option3_Horizontal_Lockup_No_Background.png"   # dark logo, transparent bg

DEFAULT_OUT = PROJECT_ROOT / "public" / "assets" / "AES_Structured_Cabling_RFP_Template_v2.2.pdf"

# -----------------------------------------------------------------------------
# Brand tokens
# -----------------------------------------------------------------------------

NAVY    = HexColor("#06284C")
BLUE    = HexColor("#006FB9")
ORANGE  = HexColor("#FF6B00")
CABLE   = HexColor("#7A9FC0")
OFFWHITE = HexColor("#F4F7FA")
INK     = HexColor("#1F2A38")           # body text
MUTED   = HexColor("#5C6776")           # secondary text
LINE    = HexColor("#D8DEE6")           # hairlines
ROW_ALT = HexColor("#F7F9FC")           # zebra row
INK_REVERSE = HexColor("#E9EEF5")       # text on dark bg
RED_ACCENT  = HexColor("#B6351F")       # risk alert accent

# -----------------------------------------------------------------------------
# Page geometry
# -----------------------------------------------------------------------------

PAGE_W, PAGE_H = LETTER
MARGIN_L = 0.55 * inch
MARGIN_R = 0.55 * inch
MARGIN_T = 0.80 * inch       # leaves room for header bar
MARGIN_B = 0.65 * inch       # leaves room for footer line
CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R

# -----------------------------------------------------------------------------
# Fonts
# -----------------------------------------------------------------------------

def _register_fonts():
    """Use Helvetica family (built-in) — keeps the script dependency-free."""
    return ("Helvetica", "Helvetica-Bold", "Helvetica-Oblique", "Helvetica-BoldOblique")

FONT, FONT_B, FONT_I, FONT_BI = _register_fonts()

# -----------------------------------------------------------------------------
# Styles
# -----------------------------------------------------------------------------

def make_styles():
    s = getSampleStyleSheet()

    base = ParagraphStyle(
        "Base",
        parent=s["Normal"],
        fontName=FONT,
        fontSize=9.5,
        leading=13,
        textColor=INK,
    )

    styles = {
        "body":         base,
        "body_sm":      ParagraphStyle("BodySm", parent=base, fontSize=8.5, leading=11.5),
        "body_xs":      ParagraphStyle("BodyXs", parent=base, fontSize=7.5, leading=10),
        "body_white":   ParagraphStyle("BodyWhite", parent=base, textColor=white),
        "label":        ParagraphStyle("Label", parent=base, fontName=FONT_B, fontSize=8.5,
                                       textColor=ORANGE, spaceAfter=2,
                                       leading=11),
        "section_tag":  ParagraphStyle("SectionTag", parent=base, fontName=FONT_B, fontSize=9,
                                       textColor=ORANGE, leading=11, spaceAfter=3,
                                       letterSpacing=0.5),
        "h1":           ParagraphStyle("H1", parent=base, fontName=FONT_B, fontSize=22,
                                       textColor=NAVY, leading=26, spaceAfter=4),
        "h1_small":     ParagraphStyle("H1Small", parent=base, fontName=FONT_B, fontSize=18,
                                       textColor=NAVY, leading=22, spaceAfter=2),
        "h2":           ParagraphStyle("H2", parent=base, fontName=FONT_B, fontSize=12.5,
                                       textColor=NAVY, leading=15, spaceBefore=7, spaceAfter=3),
        "h3":           ParagraphStyle("H3", parent=base, fontName=FONT_B, fontSize=10.5,
                                       textColor=NAVY, leading=13, spaceBefore=6, spaceAfter=2),
        "intro":        ParagraphStyle("Intro", parent=base, fontSize=9.5, leading=13,
                                       textColor=INK, spaceAfter=6),
        "note_red":     ParagraphStyle("NoteRed", parent=base, fontName=FONT, fontSize=9,
                                       leading=12, textColor=INK,
                                       leftIndent=14, firstLineIndent=-14),
        "cover_super":  ParagraphStyle("CoverSuper", parent=base, fontName=FONT_B, fontSize=9,
                                       textColor=ORANGE, leading=11, letterSpacing=0.5),
        "cover_title":  ParagraphStyle("CoverTitle", parent=base, fontName=FONT_B, fontSize=30,
                                       textColor=white, leading=34),
        "cover_sub":    ParagraphStyle("CoverSub", parent=base, fontSize=11.5,
                                       textColor=white, leading=15, spaceBefore=8),
        "cover_chip":   ParagraphStyle("CoverChip", parent=base, fontName=FONT_B, fontSize=8.5,
                                       textColor=white, leading=11, letterSpacing=0.5),
        "cover_caption":ParagraphStyle("CoverCaption", parent=base, fontSize=8.5,
                                       textColor=HexColor("#D9E1EA"), leading=11),
        "callout_title":ParagraphStyle("CalloutTitle", parent=base, fontName=FONT_B, fontSize=9,
                                       textColor=NAVY, leading=11, letterSpacing=0.5,
                                       spaceAfter=2),
        "callout_body": ParagraphStyle("CalloutBody", parent=base, fontSize=9, leading=12.5,
                                       textColor=INK),
        "table_head":   ParagraphStyle("TblHead", parent=base, fontName=FONT_B, fontSize=9,
                                       textColor=white, leading=11),
        "table_cell":   ParagraphStyle("TblCell", parent=base, fontSize=9, leading=12,
                                       textColor=INK),
        "table_cell_sm":ParagraphStyle("TblCellSm", parent=base, fontSize=8.5, leading=11,
                                       textColor=INK),
        "footer":       ParagraphStyle("Footer", parent=base, fontSize=8, leading=10,
                                       textColor=MUTED),
        "header_l":     ParagraphStyle("HeaderL", parent=base, fontName=FONT_B, fontSize=8.5,
                                       textColor=white, leading=11, letterSpacing=0.6),
        "header_r":     ParagraphStyle("HeaderR", parent=base, fontSize=8.5, alignment=TA_RIGHT,
                                       textColor=MUTED, leading=11),
        "back_title":   ParagraphStyle("BackTitle", parent=base, fontName=FONT_B, fontSize=24,
                                       textColor=white, leading=28),
        "back_body":    ParagraphStyle("BackBody", parent=base, fontSize=10, leading=14,
                                       textColor=HexColor("#E9EEF5")),
        "back_h":       ParagraphStyle("BackH", parent=base, fontName=FONT_B, fontSize=10,
                                       textColor=white, leading=13),
        "back_cta":     ParagraphStyle("BackCTA", parent=base, fontName=FONT_B, fontSize=9,
                                       textColor=ORANGE, letterSpacing=0.6, leading=12),
    }
    return styles


# -----------------------------------------------------------------------------
# Custom flowables
# -----------------------------------------------------------------------------

class OrangeRule(Flowable):
    """Thin orange underline used below section headings."""
    def __init__(self, width, thickness=1.6, color=ORANGE, space_before=2, space_after=4):
        super().__init__()
        self.width = width
        self.thickness = thickness
        self.color = color
        self.space_before = space_before
        self.space_after = space_after
        self.height = thickness + space_before + space_after

    def draw(self):
        c = self.canv
        c.setFillColor(self.color)
        c.rect(0, self.space_after, self.width, self.thickness, fill=1, stroke=0)


class Callout(Flowable):
    """
    Two-band callout box:
        [icon band w/ color] [body band w/ title + text]
    Body band uses the FULL remaining content width (bug fix).
    """
    ICON_W = 26
    PAD = 8

    def __init__(self, kind, title, body_html, width, styles):
        super().__init__()
        self.kind = kind
        self.title = title
        self.body_html = body_html
        self.width = width
        self.styles = styles

        # Resolve appearance per kind
        if kind == "owner":
            self.icon_ch, self.icon_bg, self.body_bg = "!", ORANGE, HexColor("#FFF1E5")
        elif kind == "risk":
            self.icon_ch, self.icon_bg, self.body_bg = "!", RED_ACCENT, HexColor("#FBEAE5")
        elif kind == "field":
            self.icon_ch, self.icon_bg, self.body_bg = "i", BLUE, HexColor("#E6F1FA")
        elif kind == "tip":
            self.icon_ch, self.icon_bg, self.body_bg = "?", ORANGE, HexColor("#FFF1E5")
        elif kind == "closeout":
            self.icon_ch, self.icon_bg, self.body_bg = "C", ORANGE, HexColor("#FFF1E5")
        elif kind == "rcdd":
            self.icon_ch, self.icon_bg, self.body_bg = "R", NAVY, HexColor("#E6EBF1")
        else:
            self.icon_ch, self.icon_bg, self.body_bg = "i", BLUE, HexColor("#E6F1FA")

        # Build inner paragraphs to measure required height
        body_w = self.width - self.ICON_W - 2 * self.PAD
        self._title_p = Paragraph(self.title, self.styles["callout_title"])
        self._body_p = Paragraph(self.body_html, self.styles["callout_body"])
        _, th = self._title_p.wrap(body_w, 1000)
        _, bh = self._body_p.wrap(body_w, 1000)
        self.height = max(34, th + bh + 2 * self.PAD + 3)

    def wrap(self, availWidth, availHeight):
        return self.width, self.height

    def draw(self):
        c = self.canv
        # Body band background
        c.setFillColor(self.body_bg)
        c.rect(0, 0, self.width, self.height, fill=1, stroke=0)
        # Icon band background
        c.setFillColor(self.icon_bg)
        c.rect(0, 0, self.ICON_W, self.height, fill=1, stroke=0)
        # Icon glyph centered
        c.setFillColor(white)
        c.setFont(FONT_B, 14)
        c.drawCentredString(self.ICON_W / 2, self.height / 2 - 5, self.icon_ch)

        # Inner content
        body_w = self.width - self.ICON_W - 2 * self.PAD
        x = self.ICON_W + self.PAD
        # Draw title at top, body below
        # Re-wrap to current width (paranoia)
        tw, th = self._title_p.wrap(body_w, 1000)
        bw, bh = self._body_p.wrap(body_w, 1000)
        y_top = self.height - self.PAD
        self._title_p.drawOn(c, x, y_top - th)
        self._body_p.drawOn(c, x, y_top - th - bh - 2)


class BannerImage(Flowable):
    """Banner image at top of section opener pages."""
    def __init__(self, img_path, width, height):
        super().__init__()
        self.img_path = str(img_path)
        self.width = width
        self.height = height

    def wrap(self, aW, aH):
        return self.width, self.height

    def draw(self):
        c = self.canv
        if os.path.exists(self.img_path):
            c.drawImage(
                self.img_path, 0, 0,
                width=self.width, height=self.height,
                preserveAspectRatio=True, mask='auto'
            )


# -----------------------------------------------------------------------------
# Header / footer painters
# -----------------------------------------------------------------------------

def paint_chrome(c, doc, page_num_total=23):
    """Standard header + footer for content pages."""
    page = c.getPageNumber() - 1  # cover is page 1; content starts at 2 → page indicator "pg 1/20"
    # Header navy band
    band_h = 0.36 * inch
    c.setFillColor(NAVY)
    c.rect(0, PAGE_H - band_h, PAGE_W, band_h, fill=1, stroke=0)
    # Orange separator under band
    c.setFillColor(ORANGE)
    c.rect(0, PAGE_H - band_h - 2, PAGE_W, 2, fill=1, stroke=0)

    # Header — small white AES logo on the left, version on the right.
    # Logo height is ~0.22" so it stays well inside the 0.36" navy band.
    logo_h = 0.22 * inch
    logo_w = logo_h * (1406.0 / 369.0)
    if LOGO_REVERSED.exists():
        c.drawImage(str(LOGO_REVERSED),
                    MARGIN_L, PAGE_H - band_h + (band_h - logo_h) / 2 - 1,
                    width=logo_w, height=logo_h,
                    preserveAspectRatio=True, mask='auto')
    # Subtitle text follows the logo — short so it never overflows (bug fix)
    c.setFillColor(HexColor("#C9D4E3"))
    c.setFont(FONT_B, 8)
    c.drawString(MARGIN_L + logo_w + 8, PAGE_H - band_h + 11,
                 "STRUCTURED CABLING & FIBER · RFP TEMPLATE")
    # Header right text — version
    c.setFont(FONT, 8.5)
    c.setFillColor(HexColor("#C9D4E3"))
    c.drawRightString(PAGE_W - MARGIN_R, PAGE_H - band_h + 11, "Version 2.2 · May 2026")

    # Footer hairline
    c.setStrokeColor(LINE)
    c.setLineWidth(0.5)
    c.line(MARGIN_L, MARGIN_B - 18, PAGE_W - MARGIN_R, MARGIN_B - 18)
    # Footer left
    c.setFillColor(MUTED)
    c.setFont(FONT, 8)
    c.drawString(MARGIN_L, MARGIN_B - 32, "© Apex Enterprise Solutions · apexsolutions.io · For single-project use. Questions? Contact AES.")
    # Footer right — page number (excludes cover)
    if page >= 1:
        c.drawRightString(PAGE_W - MARGIN_R, MARGIN_B - 32, f"pg {page} / {page_num_total}")


def paint_blank(c, doc):
    """No chrome — used for the cover and the back cover."""
    return


# Banner painter helpers — drawn on top of the content frame area for specific pages.
BANNER_H = 0.95 * inch

def _paint_banner(c, doc, img_name):
    img_path = IMG_DIR / img_name
    if img_path.exists():
        # preserveAspectRatio=False stretches the image to fill the banner box —
        # source images are panoramic so the result reads as a clean banner.
        c.drawImage(
            str(img_path),
            MARGIN_L,
            PAGE_H - 0.36 * inch - 2 - BANNER_H - 0.10 * inch,
            width=CONTENT_W, height=BANNER_H,
            preserveAspectRatio=False, mask='auto'
        )


def paint_chrome_copper(c, doc):
    paint_chrome(c, doc)
    _paint_banner(c, doc, "banner_copper.png")


def paint_chrome_fiber(c, doc):
    paint_chrome(c, doc)
    _paint_banner(c, doc, "banner_fiber.png")


def paint_chrome_testing(c, doc):
    paint_chrome(c, doc)
    _paint_banner(c, doc, "banner_testing.png")


# -----------------------------------------------------------------------------
# Cover & Back cover painters
# -----------------------------------------------------------------------------

def paint_cover(c, doc):
    img = IMG_DIR / "cover_bg_photo.png"
    # Full bleed background
    if img.exists():
        c.drawImage(str(img), 0, 0, width=PAGE_W, height=PAGE_H,
                    preserveAspectRatio=False, mask='auto')
    # Dark overlay for legibility
    overlay = Color(6/255, 40/255, 76/255, alpha=0.55)
    c.setFillColor(overlay)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    # Top brand row — real AES logo (white version on dark photo)
    if LOGO_REVERSED.exists():
        logo_h = 0.42 * inch
        # Source aspect ratio is ~3.8:1
        logo_w = logo_h * (1406.0 / 369.0)
        c.drawImage(str(LOGO_REVERSED),
                    MARGIN_L, PAGE_H - 0.40 * inch - logo_h,
                    width=logo_w, height=logo_h,
                    preserveAspectRatio=True, mask='auto')
    c.setFillColor(HexColor("#C9D4E3"))
    c.setFont(FONT, 8.5)
    c.drawRightString(PAGE_W - MARGIN_R, PAGE_H - 0.55 * inch, "apexsolutions.io")

    # Small tag row
    y = PAGE_H - 2.4 * inch
    c.setFillColor(ORANGE)
    c.setFont(FONT_B, 9)
    c.drawString(MARGIN_L, y, "RFP TEMPLATE  ·  VERSION 2.2")

    # Hero title
    title = "Structured Cabling & Fiber"
    sub = "Infrastructure RFP Template"
    c.setFillColor(white)
    c.setFont(FONT_B, 30)
    c.drawString(MARGIN_L, y - 0.55 * inch, title)
    c.drawString(MARGIN_L, y - 0.95 * inch, sub)

    # Lede
    c.setFont(FONT, 11.5)
    c.setFillColor(HexColor("#E9EEF5"))
    c.drawString(MARGIN_L, y - 1.35 * inch,
                 "A practical procurement template for IT directors,")
    c.drawString(MARGIN_L, y - 1.55 * inch,
                 "facility managers, and procurement professionals.")

    # Chip row
    chip_y = y - 2.05 * inch
    chips = ["PROCUREMENT + FIELD EXECUTION GUIDE"]
    chip_x = MARGIN_L
    for ch in chips:
        c.setFillColor(ORANGE)
        text_w = c.stringWidth(ch, FONT_B, 8.5) + 16
        c.roundRect(chip_x, chip_y, text_w, 18, 9, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont(FONT_B, 8.5)
        c.drawString(chip_x + 8, chip_y + 5, ch)
        chip_x += text_w + 8

    # Subtle note
    c.setFont(FONT, 8.5)
    c.setFillColor(HexColor("#C9D4E3"))
    c.drawString(MARGIN_L, chip_y - 16,
                 "References ANSI/TIA and BICSI structured cabling best practices.")

    # "What's Inside" panel
    panel_x = MARGIN_L
    panel_y = 1.10 * inch
    panel_w = CONTENT_W
    panel_h = 3.50 * inch
    # Panel background — semi-transparent navy
    c.setFillColor(Color(6/255, 40/255, 76/255, alpha=0.78))
    c.roundRect(panel_x, panel_y, panel_w, panel_h, 6, fill=1, stroke=0)
    # Panel header
    c.setFillColor(white)
    c.setFont(FONT_B, 12)
    c.drawString(panel_x + 16, panel_y + panel_h - 22, "What's Inside")
    # Orange underline
    c.setFillColor(ORANGE)
    c.rect(panel_x + 16, panel_y + panel_h - 30, 38, 2, fill=1, stroke=0)

    toc = [
        ("00", "Instructions to Bidders"),
        ("01", "Project Information & Scope of Work"),
        ("02", "Site Details & Telecommunications Room Schedule"),
        ("03", "Copper Cabling Specifications (ANSI/TIA-568.2 series)"),
        ("04", "Fiber Cabling Specifications (ANSI/TIA-568.3 series)"),
        ("05", "Testing, Labeling & Closeout Documentation"),
        ("06", "Vendor Qualifications & Insurance"),
        ("07", "Pricing Schedule & Evaluation Matrix"),
        ("08", "Bid Submittal Checklist & Bidder Certification"),
    ]
    col_w = panel_w / 2
    row_h = 18
    list_top = panel_y + panel_h - 46
    for i, (num, name) in enumerate(toc):
        col = 0 if i < 5 else 1
        row = i if col == 0 else i - 5
        x = panel_x + 16 + col * col_w
        y_row = list_top - row * (row_h + 6)
        # Number chip
        c.setFillColor(ORANGE)
        c.rect(x, y_row - 2, 22, 16, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont(FONT_B, 9)
        c.drawCentredString(x + 11, y_row + 2, num)
        # Name
        c.setFillColor(white)
        c.setFont(FONT, 9.5)
        c.drawString(x + 30, y_row + 2, name)

    # Bottom disclaimer — lighter color + slightly larger for readability on dark photo
    c.setFont(FONT, 8.5)
    c.setFillColor(HexColor("#EEF2F8"))
    c.drawString(MARGIN_L, 0.78 * inch,
                 "This template is provided for general procurement guidance only.")
    c.drawString(MARGIN_L, 0.62 * inch,
                 "Applicable standards, codes, licensing, safety, and Authority Having Jurisdiction (AHJ) requirements must be verified")
    c.drawString(MARGIN_L, 0.46 * inch,
                 "for each project and jurisdiction before issue. Version 2.2 · May 2026 · © Apex Enterprise Solutions")


def paint_back_cover(c, doc):
    img = IMG_DIR / "back_cover_bg.png"
    if img.exists():
        c.drawImage(str(img), 0, 0, width=PAGE_W, height=PAGE_H,
                    preserveAspectRatio=False, mask='auto')
    # Dark overlay
    c.setFillColor(Color(6/255, 40/255, 76/255, alpha=0.88))
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    # Top brand strip — real AES logo
    if LOGO_REVERSED.exists():
        logo_h = 0.42 * inch
        logo_w = logo_h * (1406.0 / 369.0)
        c.drawImage(str(LOGO_REVERSED),
                    MARGIN_L, PAGE_H - 0.40 * inch - logo_h,
                    width=logo_w, height=logo_h,
                    preserveAspectRatio=True, mask='auto')
    c.setFillColor(HexColor("#C9D4E3"))
    c.setFont(FONT, 8.5)
    c.drawRightString(PAGE_W - MARGIN_R, PAGE_H - 0.55 * inch, "apexsolutions.io")

    # Hero title
    y = PAGE_H - 2.2 * inch
    c.setFillColor(white)
    c.setFont(FONT_B, 28)
    c.drawString(MARGIN_L, y, "Need a field execution partner")
    c.drawString(MARGIN_L, y - 0.40 * inch, "to support this scope?")

    # Lede
    c.setFont(FONT, 11)
    c.setFillColor(HexColor("#D9E1EA"))
    lines = [
        "AES is a North America-based infrastructure deployment partner specializing in",
        "structured cabling, fiber optics, rack-and-stack, and large-scale AP rollouts.",
        "We work as a trusted subcontract execution partner for primes, integrators,",
        "and enterprise IT teams.",
    ]
    for i, line in enumerate(lines):
        c.drawString(MARGIN_L, y - 0.85 * inch - i * 16, line)

    # Chips row
    chip_y = y - 1.85 * inch
    chips = ["· BICSI-INFORMED PRACTICES", "· ANSI/TIA-ALIGNED PROCESSES", "· U.S. & CANADA COVERAGE"]
    cx = MARGIN_L
    for ch in chips:
        c.setFillColor(Color(1, 1, 1, alpha=0.10))
        text_w = c.stringWidth(ch, FONT_B, 8) + 16
        c.roundRect(cx, chip_y, text_w, 18, 9, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont(FONT_B, 8)
        c.drawString(cx + 8, chip_y + 5, ch)
        cx += text_w + 8

    # Three value pillars
    pillars = [
        ("Execution-oriented delivery",
         "Field coordination, tested workmanship, and documentation-ready handover — built to support on-schedule, specification-driven delivery."),
        ("Credential-aware crews",
         "BICSI-informed field standards and qualified leads aligned to scope requirements and jurisdiction-specific safety documentation."),
        ("Closeout-focused process",
         "As-builts, test reports, cable schedules, and warranty documentation organized for handover, aligned to the owner-approved label schema."),
    ]
    pillar_top = chip_y - 0.5 * inch
    col_w = (CONTENT_W - 2 * 0.20 * inch) / 3
    for i, (h, body) in enumerate(pillars):
        px = MARGIN_L + i * (col_w + 0.20 * inch)
        # Orange tick mark
        c.setFillColor(ORANGE)
        c.rect(px, pillar_top, 22, 2, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont(FONT_B, 10)
        c.drawString(px, pillar_top - 14, h)
        # Body lines wrapped manually
        from reportlab.lib.utils import simpleSplit
        c.setFillColor(HexColor("#D9E1EA"))
        c.setFont(FONT, 8.5)
        for j, ln in enumerate(simpleSplit(body, FONT, 8.5, col_w)):
            c.drawString(px, pillar_top - 28 - j * 11, ln)

    # CTA panel
    cta_y = 1.20 * inch
    cta_h = 1.50 * inch
    c.setFillColor(Color(1, 1, 1, alpha=0.08))
    c.roundRect(MARGIN_L, cta_y, CONTENT_W, cta_h, 8, fill=1, stroke=0)
    c.setFillColor(ORANGE)
    c.setFont(FONT_B, 9)
    c.drawString(MARGIN_L + 18, cta_y + cta_h - 22, "15-MIN SCOPE REVIEW")
    c.setFillColor(white)
    c.setFont(FONT_B, 14)
    c.drawString(MARGIN_L + 18, cta_y + cta_h - 44, "Need help scoping or executing this project?")
    c.setFillColor(HexColor("#D9E1EA"))
    c.setFont(FONT, 9.5)
    cta_lines = [
        "Send us your floor plans, drop counts, or RFP draft.",
        "AES can help validate scope, identify missing line items,",
        "and support field execution across the U.S. and Canada.",
    ]
    # 3 tight body lines + 1 contact line. Bump panel height so they don't overlap.
    for i, ln in enumerate(cta_lines):
        c.drawString(MARGIN_L + 18, cta_y + cta_h - 62 - i * 11, ln)
    c.setFillColor(ORANGE)
    c.setFont(FONT_B, 9.5)
    c.drawString(MARGIN_L + 18, cta_y + 14, "apexsolutions.io  ·  info@apexsolutions.io  ·  (669) 251-7810")

    # QR placeholder block on right of CTA panel
    qr_w = 0.85 * inch
    qr_x = PAGE_W - MARGIN_R - 18 - qr_w
    qr_y = cta_y + (cta_h - qr_w) / 2
    c.setFillColor(white)
    c.rect(qr_x, qr_y, qr_w, qr_w, fill=1, stroke=0)
    # Faux QR pattern
    c.setFillColor(NAVY)
    import random
    random.seed(7)
    cell = qr_w / 21
    for r in range(21):
        for cc in range(21):
            if (r, cc) in [(0, 0)] or random.random() < 0.45:
                c.rect(qr_x + cc * cell, qr_y + r * cell, cell, cell, fill=1, stroke=0)
    # Corner anchors
    for ax, ay in [(qr_x, qr_y + qr_w - 7 * cell),
                   (qr_x + qr_w - 7 * cell, qr_y + qr_w - 7 * cell),
                   (qr_x, qr_y)]:
        c.setFillColor(white)
        c.rect(ax, ay, 7 * cell, 7 * cell, fill=1, stroke=0)
        c.setFillColor(NAVY)
        c.rect(ax, ay, 7 * cell, 7 * cell, fill=0, stroke=1)
        c.rect(ax + 2 * cell, ay + 2 * cell, 3 * cell, 3 * cell, fill=1, stroke=0)
    c.setFillColor(HexColor("#C9D4E3"))
    c.setFont(FONT, 7.5)
    c.drawCentredString(qr_x + qr_w / 2, qr_y - 12, "Scan to book a 15-min")
    c.drawCentredString(qr_x + qr_w / 2, qr_y - 22, "scope review.")

    # Legal footer
    c.setFont(FONT, 7.2)
    c.setFillColor(HexColor("#9DAABB"))
    legal = [
        "© 2026 Apex Enterprise Solutions. All rights reserved. This template is for procurement guidance only. For single-project use.",
        "Consult a licensed RCDD and your AHJ for project-specific requirements. Documentation aligned to owner-approved label schema and applicable ANSI/TIA standards.",
        "Version history: v1.0 (Mar 2026) · v2.0 (Apr 2026) · v2.1 (May 2026) · v2.2 (May 2026, current).",
    ]
    for i, ln in enumerate(legal):
        c.drawString(MARGIN_L, 0.55 * inch - i * 11, ln)


# -----------------------------------------------------------------------------
# Reusable section heading
# -----------------------------------------------------------------------------

def section_heading(styles, tag, title, small=False):
    """Returns a list of flowables for a tag + title + orange underline."""
    items = [
        Paragraph(tag, styles["section_tag"]),
        Paragraph(title, styles["h1_small"] if small else styles["h1"]),
        OrangeRule(CONTENT_W, thickness=1.8, space_before=0, space_after=8),
    ]
    return items


def subsection_heading(styles, num_title):
    return Paragraph(num_title, styles["h2"])


# -----------------------------------------------------------------------------
# Table helpers
# -----------------------------------------------------------------------------

def header_row_style(extra=None):
    cmds = [
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_B),
        ("FONTSIZE", (0, 0), (-1, 0), 9),
        ("TOPPADDING", (0, 0), (-1, 0), 7),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 7),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 1), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 5),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -1), 0.3, LINE),
        ("FONTSIZE", (0, 1), (-1, -1), 9),
        ("TEXTCOLOR", (0, 1), (-1, -1), INK),
    ]
    if extra:
        cmds.extend(extra)
    return TableStyle(cmds)


def make_table(data, col_widths, zebra=True, header_align_l=True, compact=False):
    """Wraps cell strings as Paragraphs for proper wrapping.

    compact=True uses smaller padding and font for dense, multi-row tables.
    """
    from reportlab.platypus import Paragraph as P
    styles = make_styles()
    cell_style = styles["table_cell_sm"] if compact else styles["table_cell"]
    new = []
    for i, row in enumerate(data):
        new_row = []
        for c in row:
            if isinstance(c, Flowable) or isinstance(c, P):
                new_row.append(c)
            elif c is None:
                new_row.append("")
            else:
                txt = str(c)
                if i == 0:
                    new_row.append(P(txt, styles["table_head"]))
                else:
                    new_row.append(P(txt, cell_style))
        new.append(new_row)
    t = Table(new, colWidths=col_widths, repeatRows=1)
    h_pad = 5 if compact else 6
    d_pad = 2 if compact else 4
    pad_lr = 5 if compact else 6
    cmds = [
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("TOPPADDING", (0, 0), (-1, 0), h_pad),
        ("BOTTOMPADDING", (0, 0), (-1, 0), h_pad),
        ("LEFTPADDING", (0, 0), (-1, -1), pad_lr),
        ("RIGHTPADDING", (0, 0), (-1, -1), pad_lr),
        ("TOPPADDING", (0, 1), (-1, -1), d_pad),
        ("BOTTOMPADDING", (0, 1), (-1, -1), d_pad),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -1), 0.3, LINE),
        ("BOX", (0, 0), (-1, -1), 0.4, LINE),
    ]
    if zebra:
        for i in range(1, len(data)):
            if i % 2 == 0:
                cmds.append(("BACKGROUND", (0, i), (-1, i), ROW_ALT))
    t.setStyle(TableStyle(cmds))
    return t


def make_form_table(rows, col_widths):
    """
    Form-style 2-column table: label cell + empty entry cell (light fill).
    `rows` is a list of label strings; columns are paired (label, entry, label, entry).
    """
    from reportlab.platypus import Paragraph as P
    styles = make_styles()
    data = []
    n = len(rows)
    # Build 2 column form: each row holds (Label, Entry, Label, Entry)
    pairs = []
    for i in range(0, n, 2):
        a = rows[i]
        b = rows[i + 1] if i + 1 < n else ""
        pairs.append([
            P(a, styles["table_cell"]) if a else "",
            "",
            P(b, styles["table_cell"]) if b else "",
            "",
        ])
    t = Table(pairs, colWidths=col_widths)
    cmds = [
        ("BACKGROUND", (1, 0), (1, -1), OFFWHITE),
        ("BACKGROUND", (3, 0), (3, -1), OFFWHITE),
        ("BOX", (0, 0), (-1, -1), 0.4, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]
    t.setStyle(TableStyle(cmds))
    return t


def make_single_form_table(rows, col_widths):
    """One label + one entry per row (single column form)."""
    from reportlab.platypus import Paragraph as P
    styles = make_styles()
    data = [
        [P(label, styles["table_cell"]) if label else "", ""] for label in rows
    ]
    t = Table(data, colWidths=col_widths)
    cmds = [
        ("BACKGROUND", (1, 0), (1, -1), OFFWHITE),
        ("BOX", (0, 0), (-1, -1), 0.4, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]
    t.setStyle(TableStyle(cmds))
    return t


def checkbox_list_two_col(items, styles, col_w=None, gap=10):
    """Two-column checkbox list — each item rendered as ☐ + text."""
    from reportlab.platypus import Paragraph as P
    if col_w is None:
        col_w = (CONTENT_W - gap) / 2

    rows = []
    n = len(items)
    for i in range(0, n, 2):
        a = items[i]
        b = items[i + 1] if i + 1 < n else ""
        rows.append([
            P(f'<font color="#7A9FC0">❑</font>  {a}', styles["table_cell"]) if a else "",
            "",
            P(f'<font color="#7A9FC0">❑</font>  {b}', styles["table_cell"]) if b else "",
        ])
    t = Table(rows, colWidths=[col_w, gap, col_w])
    t.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t


def checkbox_list_single(items, styles, col_w=None):
    from reportlab.platypus import Paragraph as P
    if col_w is None:
        col_w = CONTENT_W
    rows = [[P(f'<font color="#7A9FC0">❑</font>  {x}', styles["table_cell"])] for x in items]
    t = Table(rows, colWidths=[col_w])
    t.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t


# -----------------------------------------------------------------------------
# Document build
# -----------------------------------------------------------------------------

class RFPDoc(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            filename,
            pagesize=LETTER,
            leftMargin=MARGIN_L,
            rightMargin=MARGIN_R,
            topMargin=MARGIN_T,
            bottomMargin=MARGIN_B,
            title="AES — Structured Cabling & Fiber RFP Template v2.2",
            author="Apex Enterprise Solutions",
            subject="Procurement template for structured cabling and fiber projects",
            keywords="RFP, structured cabling, fiber, BICSI, ANSI/TIA, procurement, AES",
            creator="AES build_rfp_template.py",
        )

        # Frames
        full_frame = Frame(
            MARGIN_L, MARGIN_B, CONTENT_W, PAGE_H - MARGIN_T - MARGIN_B,
            leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
            id="full"
        )
        # Section-opener frames leave room for the banner image (BANNER_H + spacing)
        banner_frame = Frame(
            MARGIN_L, MARGIN_B,
            CONTENT_W, PAGE_H - MARGIN_T - MARGIN_B - BANNER_H - 0.10 * inch,
            leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
            id="banner"
        )
        # Cover/back use a fake frame (entire page chrome is painted in onPage)
        blank_frame = Frame(
            0, 0, PAGE_W, PAGE_H,
            leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0,
            id="blank"
        )

        self.addPageTemplates([
            PageTemplate(id="cover", frames=[blank_frame], onPage=paint_cover),
            PageTemplate(id="content", frames=[full_frame], onPage=paint_chrome),
            PageTemplate(id="copper", frames=[banner_frame], onPage=paint_chrome_copper),
            PageTemplate(id="fiber", frames=[banner_frame], onPage=paint_chrome_fiber),
            PageTemplate(id="testing", frames=[banner_frame], onPage=paint_chrome_testing),
            PageTemplate(id="back_cover", frames=[blank_frame], onPage=paint_back_cover),
        ])


# -----------------------------------------------------------------------------
# Page content builders
# -----------------------------------------------------------------------------

def build_story():
    styles = make_styles()
    story = []

    # ========== PAGE 1: COVER ==========
    # Cover is painted entirely in onPage; just emit a page break to next template.
    story.append(NextPageTemplate("content"))
    story.append(PageBreak())

    # ========== PAGE 2: How to Use This Template ==========
    story.extend(section_heading(styles, "GUIDANCE", "How to Use This Template"))
    story.append(Paragraph(
        "This template is a practical starting point — not a finished procurement package. The structure below "
        "walks the Owner from preparation to award and helps both sides arrive at a fair, comparable bid.",
        styles["intro"]
    ))

    steps = [
        ("1. Prepare",
         "Complete the RFP Readiness Checklist on the next page before issuing. Without estimated drop counts, "
         "site details, and scope decisions, bidders cannot give comparable pricing."),
        ("2. Customize",
         "Fill in dates, contacts, scope checkboxes, owner specifications, line-item quantities, and qualification "
         "requirements. Use the assumptions/exclusions and OFCI sections to capture project-specific items."),
        ("3. Issue",
         "Distribute as a single PDF to qualified bidders. Confirm receipt, schedule the site walk if applicable, "
         "and accept questions in writing only. Issue all clarifications as written addenda to all registered bidders."),
        ("4. Receive Bids",
         "Verify each submittal against Section 08 Bid Submittal Checklist. Missing items should be handled "
         "according to the Owner's procurement rules; materially incomplete bids may be deemed non-responsive."),
        ("5. Evaluate",
         "Use Section 07.4 Evaluation Matrix. Score technical, experience, price, schedule, and warranty/closeout "
         "commitments. Flag any bid more than 30% below median for clarification before award."),
        ("6. Award & Closeout",
         "Issue notice of award, hold a kickoff, and enforce closeout deliverables (Section 05.4) before releasing "
         "final retainage. The closeout package is what protects the asset long-term."),
    ]
    step_data = []
    for h, body in steps:
        step_data.append([
            Paragraph(f'<font name="Helvetica-Bold" color="#06284C">{h}</font>',
                      styles["table_cell"]),
            Paragraph(body, styles["table_cell"]),
        ])
    t = Table(step_data, colWidths=[1.5 * inch, CONTENT_W - 1.5 * inch])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, LINE),
    ]))
    story.append(t)
    story.append(Spacer(1, 10))

    story.append(Callout(
        "owner", "OWNER ACTION REQUIRED",
        "Do not issue this RFP until estimated quantities are entered in Section 02.3 and the pricing schedule "
        "(Section 07.1). Bidders cannot provide comparable pricing without unit quantities.",
        CONTENT_W, styles
    ))
    story.append(Spacer(1, 8))
    # RCDD review notes callout (new in v2.2)
    story.append(Callout(
        "rcdd", "RCDD REVIEW NOTES",
        "Have a licensed RCDD (Registered Communications Distribution Designer) review pathway sizing, fiber link "
        "budgets, grounding/bonding design, and labeling schema before issue. RCDD review is a cost-effective way "
        "to catch design issues before they become change orders during execution.",
        CONTENT_W, styles
    ))
    story.append(Spacer(1, 8))
    story.append(Callout(
        "field", "FIELD NOTE",
        "Templates are starting points, not finished engineering or legal documents. Project-specific requirements "
        "should be reviewed by the Owner, a licensed RCDD or design professional, AHJ, insurer, and procurement "
        "counsel before issue. AES does not provide legal advice.",
        CONTENT_W, styles
    ))

    story.append(PageBreak())

    # ========== PAGE 3: RFP Readiness Checklist ==========
    story.extend(section_heading(styles, "PRE-ISSUE", "RFP Readiness Checklist"))
    story.append(Paragraph(
        "Confirm each item below before issuing this RFP. Skipping items leads to vague bids, non-comparable "
        "pricing, and disputes during execution.",
        styles["intro"]
    ))

    readiness = [
        "Site address, building access, and operational hours documented",
        "Estimated drop counts (work area outlets + AP drops + other) entered in Section 02.3",
        "TR / IDF / MDF list with room types, sizes, and rack quantities completed",
        "Cable category (CAT6 / CAT6A) and construction (U/UTP / F/UTP) selected",
        "Fiber type, strand count, connector type, polish, polarity method, and pathway type selected",
        "Pathway responsibility decided: who installs cable tray, conduit, J-hooks, innerduct",
        "Firestopping scope and responsibility defined (UL-listed systems where required)",
        "Lift responsibility decided: Contractor-furnished or Owner-furnished",
        "Work hours, blackout periods, after-hours requirements, and shutdown windows defined",
        "Site access, badging, parking / loading dock, and escort procedures documented",
        "Testing requirements decided: Tier 1 only, or Tier 1 + Tier 2 OTDR for fiber",
        "Closeout documentation expectations confirmed (Section 05.4)",
        "Permit and AHJ inspection responsibility assigned",
        "Owner-furnished materials list (OFCI) completed if applicable",
        "Insurance limits set per Owner risk manager and jurisdiction requirements",
        "Evaluation weights confirmed in Section 07.2",
        "Mandatory vs preferred qualifications reviewed for project scope and size",
        "Estimated quantities entered in Section 07.1 pricing schedule",
    ]
    story.append(checkbox_list_two_col(readiness, styles))
    story.append(Spacer(1, 10))
    story.append(Callout(
        "risk", "RISK ALERT",
        "If lift responsibility, work hours, access windows, firestopping, and patch cords are not defined, bidders "
        "may price different scopes — and the lowest bid may not be the real lowest cost once change orders pile up.",
        CONTENT_W, styles
    ))

    story.append(PageBreak())

    # ========== PAGE 4: Common RFP Mistakes ==========
    story.extend(section_heading(styles, "FIELD EXPERIENCE", "Common RFP Mistakes to Avoid"))
    story.append(Paragraph(
        "Drawn from field execution across structured cabling, fiber, rack-and-stack, and wireless deployments. "
        "Each of these mistakes is easy to avoid in the RFP stage and expensive to fix in the field.",
        styles["intro"]
    ))
    mistakes = [
        ("Issuing without drop counts",
         "Without estimated quantities, bidders price assumptions instead of scope. Their assumptions will not match. "
         "You receive bids that cannot be compared and an award decision that is essentially a coin flip."),
        ("Leaving lift responsibility ambiguous",
         "AP drops, high-ceiling work, and cable tray installation often require scissor or boom lifts. If the RFP does "
         "not say who furnishes the lift, half the bidders include it and half do not. This becomes a common change-order trigger."),
        ("Forgetting firestopping",
         "Every wall, floor, and ceiling penetration needs a UL-listed firestop system. Owners frequently leave this out "
         "of the RFP. Then it gets added in the field at a premium with no competitive pricing."),
        ("No native test files",
         "PDF-only summaries are harder to audit and may not preserve the full tester record. Always require native files "
         "from the approved certification platform (.flw, .SOR, .OFR, or equivalent). Native files make incomplete or failed results easier to audit."),
        ("Ignoring patch cords",
         "Patch cords are not part of horizontal cabling and are often left out of bids. Patch cords may then be "
         "purchased later at higher cost and under schedule pressure."),
        ("Ambiguous after-hours work",
         "If the data center cuts over at 2 AM Saturday, that is not standard labor. If the RFP does not specify work "
         "hours and the after-hours premium structure, expect re-pricing, delay, or schedule negotiation."),
        ("Releasing retainage before closeout",
         "Once final payment is released, motivation to complete as-builts, label schema cross-references, and "
         "punch-list closure disappears. Hold retainage until the full closeout package is accepted."),
        ('Asking for "low-voltage license" only',
         "License terminology varies by state and province. Use a jurisdiction-neutral requirement so qualified bidders "
         "are not disqualified by terminology mismatches."),
        ('Accepting "BICSI-certified" without proof',
         "BICSI has multiple certifications (Installer 1, Installer 2 Copper, Installer 2 Fiber, RCDD, DCDC). Require the "
         "specific credential needed for the work and ask for current credential cards."),
        ("Treating lowest price as the answer",
         "A bid 30% below median almost always reflects missing scope, optimistic crew size, or compressed schedule. "
         "Use the Evaluation Matrix and flag outliers for clarification before award."),
    ]
    for h, body in mistakes:
        story.append(Paragraph(
            f'<font name="Helvetica-Bold" color="#06284C">{h}</font>',
            ParagraphStyle("MhRow", parent=styles["body"], spaceBefore=4, spaceAfter=1, fontSize=10)
        ))
        story.append(Paragraph(body, styles["body"]))

    story.append(PageBreak())

    # ========== PAGE 5: Section 00 — Instructions to Bidders ==========
    story.extend(section_heading(styles, "SECTION 00", "Instructions to Bidders", small=True))
    story.append(Paragraph(
        '<font color="#FF6B00">■</font>  Read this section carefully before preparing your proposal. Proposals that '
        'are materially incomplete or non-responsive may be rejected at the Owner\'s discretion.',
        styles["intro"]
    ))

    story.append(subsection_heading(styles, "0.1 Key Dates & Deadlines"))
    dates = [
        ["Milestone", "Date / Time", "Notes"],
        ["RFP Issue Date", "", "Owner to complete before issuing"],
        ["Pre-Bid Site Walk", "", "See 0.3 for site walk type (mandatory / optional / not required)"],
        ["Deadline — Written Questions", "", "Questions received after this date will not be answered"],
        ["Addendum Issue Date (if any)", "", "All addenda supersede the original RFP"],
        ["Proposal Due Date & Time", "", "Late submissions will not be accepted"],
        ["Anticipated Award Date", "", ""],
        ["Anticipated Project Start", "", ""],
    ]
    cw = [2.0 * inch, 1.55 * inch, CONTENT_W - 2.0 * inch - 1.55 * inch]
    story.append(make_table(dates, cw))
    story.append(Spacer(1, 8))

    story.append(subsection_heading(styles, "0.2 Submission Requirements"))
    story.append(Paragraph(
        "Proposals must be submitted as a single PDF. Hard copy submissions will not be accepted unless noted in "
        "an addendum. Proposals must include:", styles["body"]
    ))
    sub_items = [
        "Cover letter on company letterhead, signed by an authorized representative",
        "Completed pricing schedule (Section 07) — all applicable line items priced; non-applicable items marked N/A with explanation",
        "Proposed project schedule — milestone-level Gantt or equivalent",
        "Assumptions, exclusions, owner-furnished materials, and any proposed deviations from stated scope",
        "Company qualifications and references per Section 06 requirements",
        "Proof of insurance naming Owner as additional insured (certificate of insurance)",
        "Credential cards for assigned lead technicians and OSHA / provincial safety documentation for all field personnel as required",
    ]
    bullet_p = ParagraphStyle("Bullet", parent=styles["body"], leftIndent=14, firstLineIndent=-14)
    for it in sub_items:
        story.append(Paragraph(f'<font color="#FF6B00">■</font>  {it}', bullet_p))

    story.append(Spacer(1, 6))
    story.append(subsection_heading(styles, "0.3 Point of Contact & Questions"))
    story.append(Paragraph(
        "All questions must be submitted in writing to the contact below. Oral responses are not binding. "
        "Questions received by the deadline will be answered via written addendum issued to all registered "
        "bidders / plan holders.",
        styles["body"]
    ))
    story.append(Spacer(1, 4))
    contact_rows = ["Point of Contact — Name & Title", "Email Address",
                    "Phone", "Issuing Organization"]
    story.append(make_form_table(contact_rows, [1.7 * inch, 1.9 * inch, 1.7 * inch, CONTENT_W - 5.3 * inch]))
    story.append(Spacer(1, 6))
    sw_data = [
        [Paragraph('<b>Site Walk Status</b>', styles["table_cell"]),
         Paragraph('<font color="#7A9FC0">❑</font>  Mandatory', styles["table_cell"]),
         Paragraph('<font color="#7A9FC0">❑</font>  Optional', styles["table_cell"]),
         Paragraph('<font color="#7A9FC0">❑</font>  Not Required', styles["table_cell"])],
    ]
    sw = Table(sw_data, colWidths=[1.6 * inch, 1.7 * inch, 1.7 * inch, CONTENT_W - 5.0 * inch])
    sw.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.4, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("BACKGROUND", (0, 0), (0, 0), OFFWHITE),
    ]))
    story.append(sw)

    story.append(PageBreak())

    # ========== PAGE 6: 0.4-0.5 + Section 01 (1.1) ==========
    story.append(subsection_heading(styles, "0.4 General Conditions"))
    gc_rows = [
        ("Right to Reject",
         "Owner reserves the right to reject any or all proposals, waive informalities, and award in the best interest of the project."),
        ("Addenda",
         "Only written addenda issued by the Owner are binding. Bidders are responsible for confirming receipt of all addenda before submission and acknowledging them in Section 08."),
        ("Bid Validity",
         "Proposals shall remain valid for 90 days from the due date unless otherwise noted in an addendum."),
        ("Pre-Bid Site Walk",
         "If the site walk is marked Mandatory in 0.3, bidders must attend to remain eligible. If marked Optional, attendance is strongly encouraged. Bidders who do not attend remain responsible for understanding visible site conditions."),
        ("Substitutions",
         "Proposed substitutions to specified materials require written pre-approval at least 5 business days before the proposal due date."),
        ("Subcontractors",
         "List all proposed subcontractors and their scope in the proposal. Owner reserves the right to reject proposed subcontractors."),
        ("Site Access & Work Hours",
         "Specify standard work hours, after-hours requirements, blackout periods, escort / badging procedures, parking / loading dock access, and access-control restrictions in 1.3."),
        ("Permits & AHJ",
         "Owner shall identify who obtains and pays for required permits and inspections, and the level of AHJ coordination required for the project."),
    ]
    gc_data = []
    for k, v in gc_rows:
        gc_data.append([
            Paragraph(f'<font name="Helvetica-Bold" color="#06284C">{k}</font>', styles["table_cell"]),
            Paragraph(v, styles["table_cell"]),
        ])
    gc = Table(gc_data, colWidths=[1.6 * inch, CONTENT_W - 1.6 * inch])
    gc.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LINEBELOW", (0, 0), (-1, -2), 0.3, LINE),
        ("BACKGROUND", (0, 0), (0, -1), OFFWHITE),
    ]))
    story.append(gc)

    story.append(Spacer(1, 8))
    story.append(subsection_heading(styles, "0.5 Addenda Acknowledgment"))
    story.append(Paragraph(
        "Bidder shall acknowledge receipt of all addenda issued by the Owner. List addendum number and date received.",
        styles["body"]
    ))
    story.append(Spacer(1, 3))
    add_data = [
        ["Addendum #", "Date Received", "Acknowledged By"],
        ["", "", ""], ["", "", ""], ["", "", ""],
    ]
    story.append(make_table(add_data, [1.4 * inch, 1.6 * inch, CONTENT_W - 3.0 * inch]))

    story.append(Spacer(1, 14))
    story.extend(section_heading(styles, "SECTION 01", "Project Information & Scope of Work", small=True))
    story.append(subsection_heading(styles, "1.1 Issuing Organization"))
    iss_rows = ["Organization / Company Name", "Primary Contact Name & Title",
                "Mailing Address", "City, State / Province, ZIP / Postal",
                "Phone", "Email Address",
                "RFP Reference Number", "Issue Date",
                "Proposal Due Date & Time", "Submission Method"]
    story.append(make_form_table(iss_rows, [1.7 * inch, 1.9 * inch, 1.7 * inch, CONTENT_W - 5.3 * inch]))

    story.append(PageBreak())

    # ========== PAGE 7: 1.2 - 1.5 ==========
    story.append(subsection_heading(styles, "1.2 Project Description"))
    story.append(Paragraph(
        "Summarize the project: purpose (new build / refresh / expansion), expected start date, and any critical "
        "constraints bidders must know.", styles["body"]
    ))
    # Open entry field
    desc_box = Table([[""]], colWidths=[CONTENT_W], rowHeights=[0.55 * inch])
    desc_box.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), OFFWHITE),
        ("BOX", (0, 0), (-1, -1), 0.4, LINE),
    ]))
    story.append(Spacer(1, 4))
    story.append(desc_box)

    story.append(subsection_heading(styles, "1.3 Scope of Work"))
    story.append(Paragraph(
        "Check all items included in this engagement. Bidders must price all checked items and identify "
        "assumptions, exclusions, and Owner-furnished materials.", styles["body"]
    ))
    story.append(Spacer(1, 4))
    scope_items = [
        "Site survey and pathway design prior to installation",
        "Horizontal copper cabling — CAT6 / CAT6A (specify in Section 03)",
        "Backbone fiber cabling — multimode / single-mode (specify in Section 04)",
        "Telecommunications room buildout: racks, patch panels, cable management, labeling",
        "Pathway installation: cable tray, conduit, J-hooks, innerduct",
        "Grounding and bonding per latest Owner-adopted ANSI/TIA bonding and grounding/earthing standard and AHJ requirements",
        "Field certification testing — copper and fiber",
        "Labeling of all cables, panels, and outlets per Owner-approved label schema and applicable ANSI/TIA administration standard",
        "As-built drawings, test reports, label schedule, and closeout package",
        "Project management, daily progress reporting, and site safety compliance",
        "Demolition and removal of abandoned cable per NEC/CEC/local code and Owner direction",
        "Firestopping at wall / floor / ceiling penetrations — UL-listed assemblies, documentation submitted",
        "Patch cords — quantity and length per Owner direction; included unless noted otherwise",
        "Lift rental and operation (scissor / boom) — Contractor-furnished unless noted Owner-furnished",
        "Permits and AHJ inspections — Contractor obtains unless noted Owner-obtained",
        "After-hours / weekend / shutdown-window work — pricing premium identified in Section 07",
        "Network device configuration (switch / AP / VLAN / patching) — EXCLUDED unless explicitly checked",
        "Owner-furnished, Contractor-installed materials — list provided in 1.4",
    ]
    story.append(checkbox_list_two_col(scope_items, styles))

    story.append(subsection_heading(styles, "1.4 Owner-Furnished Contractor-Installed Materials (OFCI)"))
    story.append(Paragraph(
        "List Owner-furnished materials that the Contractor will install. Include manufacturer, model, quantity, "
        "and delivery method (drop-shipped to site / Owner staging / etc.).", styles["body"]
    ))
    ofci_data = [
        ["Manufacturer", "Model / Part #", "Qty", "Delivery Method"],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
    ]
    ofci_cw = [1.6 * inch, 1.8 * inch, 0.7 * inch, CONTENT_W - 4.1 * inch]
    story.append(Spacer(1, 4))
    story.append(make_table(ofci_data, ofci_cw))

    # 1.5 — EXPANDED in v2.2
    story.append(subsection_heading(styles, "1.5 Assumptions, Exclusions & Clarifications"))
    story.append(Paragraph(
        "Bidders shall list assumptions, exclusions, and clarifications affecting their proposal. Without this, "
        "the Owner may receive non-comparable bids. Use the structured prompts below; expand each entry as needed.",
        styles["body"]
    ))
    story.append(PageBreak())

    # ========== PAGE 8 (was 1.5 continuation + SECTION 02) ==========
    # Expanded 1.5 prompts — new in v2.2
    story.append(Paragraph(
        '<font name="Helvetica-Bold" color="#06284C">1.5 Assumptions, Exclusions &amp; Clarifications '
        '<font color="#FF6B00">(continued)</font></font>',
        styles["h3"]
    ))
    expanded_15 = [
        ("Assumed labor model",
         "Standard business hours, single shift, M–F unless after-hours premium identified in 7.1.",),
        ("Assumed access conditions",
         "Site access during work hours, escort provided by Owner, parking / loading dock available.",),
        ("Assumed pathway condition",
         "Existing pathways usable as-installed; new pathways priced in 7.1 where checked in 1.3.",),
        ("Assumed lift availability",
         "Contractor-furnished scissor or boom lift where required, billed per 7.1 line 22.",),
        ("Assumed test scope",
         "Tier 1 IL bi-directional for fiber; Tier 2 OTDR only where checked. Copper: permanent link.",),
        ("Excluded scope",
         "Network device configuration, programming, VLAN assignments, and active equipment commissioning.",),
        ("Excluded materials",
         "Owner-furnished equipment (see OFCI list 1.4); patch cords over Owner-specified quantity.",),
        ("Clarifications",
         "Note any deviations from specified manufacturer, polarity method, or termination method.",),
    ]
    ex_data = []
    for k, prompt in expanded_15:
        ex_data.append([
            Paragraph(f'<font name="Helvetica-Bold" color="#06284C">{k}</font>'
                      f'<br/><font color="#5C6776">{prompt}</font>', styles["table_cell"]),
            "",
        ])
    ex_tbl = Table(ex_data, colWidths=[2.4 * inch, CONTENT_W - 2.4 * inch])
    ex_tbl.setStyle(TableStyle([
        ("BACKGROUND", (1, 0), (1, -1), OFFWHITE),
        ("BOX", (0, 0), (-1, -1), 0.4, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(ex_tbl)
    story.append(Spacer(1, 8))
    story.append(Callout(
        "field", "FIELD NOTE",
        "Vague assumptions are the single biggest cause of non-comparable bids. Asking each bidder to list "
        "assumptions in the same structure makes the eventual award decision defensible.",
        CONTENT_W, styles
    ))
    story.append(PageBreak())

    # ========== PAGE 9 (was 8): Section 02 ==========
    story.extend(section_heading(styles, "SECTION 02",
                                 "Site Details &amp; Telecommunications Room Schedule", small=True))
    story.append(subsection_heading(styles, "2.1 Facility Information"))
    fac_rows = ["Site Address", "Building Type",
                "Total Gross Square Footage", "Number of Occupied Floors",
                "Number of Buildings / Wings", "Ceiling Height (typical)",
                "Existing Cable Infrastructure", "Year Constructed / Last Refresh",
                "Pathway Constraints", "Power / Cooling / Access Notes"]
    story.append(make_form_table(fac_rows, [1.7 * inch, 1.9 * inch, 1.7 * inch, CONTENT_W - 5.3 * inch]))

    story.append(subsection_heading(styles, "2.2 Telecommunications Room (TR) Schedule"))
    story.append(Paragraph(
        "Complete one row per TR / IDF / MDF location. Add rows as needed.", styles["body"]
    ))
    story.append(Spacer(1, 4))
    # Bug fix: column widths sum exactly to CONTENT_W and header text fits.
    tr_data = [
        ["TR ID", "Location / Floor", "Room Type", "Size (sq ft)", "Status", "Existing\nRacks", "New\nRacks"],
        ["TR-01", "", "", "", "", "", ""],
        ["TR-02", "", "", "", "", "", ""],
        ["TR-03", "", "", "", "", "", ""],
        ["TR-04", "", "", "", "", "", ""],
        ["TR-05", "", "", "", "", "", ""],
        ["TR-06", "", "", "", "", "", ""],
    ]
    # Widths that sum to CONTENT_W
    tr_cw = [
        0.65 * inch,   # TR ID
        1.40 * inch,   # Location / Floor
        1.10 * inch,   # Room Type
        0.85 * inch,   # Size (sq ft)
        0.90 * inch,   # Status
        0.80 * inch,   # Existing Racks
        0.80 * inch,   # New Racks
    ]
    # Pad last column to fill any rounding gap
    used = sum(tr_cw)
    tr_cw[-1] += (CONTENT_W - used)
    story.append(make_table(tr_data, tr_cw))

    story.append(subsection_heading(styles, "2.3 Drop Count Estimate"))
    story.append(Paragraph(
        "Drop counts are planning estimates for bid comparison and unit-price extension. Final quantities shall be "
        "verified during site walk, Owner review, or approved change process unless issued as binding quantities.",
        styles["body"]
    ))
    story.append(Spacer(1, 4))
    dc_data = [
        ["Zone / Floor", "Work Area Outlets", "AP Drops", "Other", "Total Drops"],
        ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""],
        ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""],
        ["TOTAL", "", "", "", ""],
    ]
    dc_cw = [1.6 * inch, 1.5 * inch, 1.1 * inch, 1.0 * inch, CONTENT_W - 5.2 * inch]
    story.append(make_table(dc_data, dc_cw))

    story.append(NextPageTemplate("copper"))
    story.append(PageBreak())
    # If content overflows, fall through to a plain content page (no banner).
    story.append(NextPageTemplate("content"))

    # ========== PAGE 10 (was 9): Section 03 Copper — uses copper banner template ==========
    story.extend(section_heading(styles, "SECTION 03", "Copper Cabling Specifications", small=True))
    story.append(Paragraph(
        '<font color="#FF6B00">■</font>  All copper cabling shall comply with the ANSI/TIA-568.2 series '
        '(latest Owner-adopted edition). Use the Owner Selection column to specify your requirements. The '
        'Reference / Guidance column is for evaluator context only — it does not set project requirements.',
        styles["intro"]
    ))
    story.append(subsection_heading(styles, "3.1 Horizontal Copper — Owner Specification"))
    copper_data = [
        ["Parameter", "Owner Selection", "Reference / Guidance"],
        ["Cable Category", "",
         "CAT6A required for 10GBase-T up to 100 m. CAT6 may be acceptable where project requirements are limited to 1G applications and 10GBase-T is not required."],
        ["Cable Construction", "",
         "F/UTP may be required in high-EMI environments (factories, hospitals, near heavy electrical equipment). Shielded systems require continuous bonding and grounding design."],
        ["Max Horizontal Run", "90 m permanent link / 100 m channel",
         "Per applicable ANSI/TIA-568.2 series requirements (latest Owner-adopted edition). Measure cable path, not straight-line distance."],
        ["Connector Pinout", "",
         "Choose T568A or T568B and apply consistently throughout the project. Mixing causes wiring faults."],
        ["Fire / Plenum Rating", "",
         "CMP or applicable plenum-rated cable required where mandated by NEC/CEC/local code and AHJ."],
        ["Outlets per WAO", "",
         "Dual-gang faceplate with 2 ports is standard for office environments."],
        ["Accepted Manufacturers", "",
         "System warranty eligibility shall be based on approved components, authorized installer status, manufacturer requirements, and completed registration."],
        ["Testing Standard", "ANSI/TIA-1152-A · Level IIIe or Level IV tester",
         "Fluke DSX-8000, VIAVI Certifier40G, or approved equal. Tester model, adapter type, calibration status, and firmware version shall appear on submitted reports."],
    ]
    cop_cw = [1.55 * inch, 1.70 * inch, CONTENT_W - 1.55 * inch - 1.70 * inch]
    story.append(make_table(copper_data, cop_cw))
    story.append(subsection_heading(styles, "3.2 Additional Copper Notes"))
    story.append(Paragraph(
        "Enter any project-specific copper requirements, approved substitutions, or scope exceptions below.",
        styles["body"]
    ))
    story.append(Spacer(1, 4))
    notes_box = Table([[""]], colWidths=[CONTENT_W], rowHeights=[0.65 * inch])
    notes_box.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), OFFWHITE),
        ("BOX", (0, 0), (-1, -1), 0.4, LINE),
    ]))
    story.append(notes_box)

    # Next page is Section 04 (fiber banner). Overflow falls through to content.
    story.append(NextPageTemplate("fiber"))
    story.append(PageBreak())
    story.append(NextPageTemplate("content"))

    # ========== PAGE 11 (was 10): Section 04 Fiber — uses fiber banner template ==========
    story.extend(section_heading(styles, "SECTION 04", "Fiber Cabling Specifications", small=True))
    story.append(Paragraph(
        '<font color="#FF6B00">■</font>  All fiber cabling shall comply with the ANSI/TIA-568.3 series '
        '(latest Owner-adopted edition). Use the Owner Selection column to specify your requirements. The '
        'Reference / Guidance column is for evaluator context only.',
        styles["intro"]
    ))
    story.append(subsection_heading(styles, "4.1 Backbone Fiber — Owner Specification"))
    fiber_data = [
        ["Parameter", "Owner Selection", "Reference / Guidance"],
        ["Fiber Type", "",
         "OS2 for campus / inter-building runs. OM4 / OM5 for intra-building and data center. OM5 supports short-wave WDM."],
        ["Strand Count", "",
         "Specify per route or per TR-to-TR run. Account for current need plus spare strands (typically 25–50% spare for backbone)."],
        ["Cable Jacket / Rating", "",
         "OFNP (plenum), OFNR (riser), OFNG/OFN (general), or LSZH. Outdoor: armored or non-armored, water-blocked, UV-rated as applicable."],
        ["Pathway Type", "",
         "Indoor / OSP / direct-buried / aerial / innerduct. OSP and direct-buried have different cable construction and termination requirements."],
        ["Polarity Method", "",
         "Methods A, B, or C per ANSI/TIA-568.3 series. Maintain consistent polarity throughout the system. Required for MPO/MTP trunk + module deployments."],
        ["Min Bend Radius", "Per cable manufacturer specification",
         "Honored during pull, after-install, and in cable management. Violating bend radius causes long-term attenuation/failures."],
        ["Spare Strands", "",
         "Recommended 25–50% spare for backbone runs. Document spare strand count in closeout package."],
        ["Connector Type", "",
         "LC duplex is the industry standard for equipment patch connections. MPO is preferred for pre-terminated trunk cabling."],
        ["Polish Type", "",
         "APC required where return loss is critical (DWDM, passive optical networks). APC and UPC connectors shall not be mated together."],
        ["Max IL per Connector", "≤ 0.75 dB per mated pair (ANSI/TIA-568.3 series)",
         "Per ANSI/TIA-568.3 series loss budget. Use approved field tester referenced and calibrated against the selected wavelengths."],
        ["End-Face Inspection", "Pass per IEC 61300-3-35",
         "Inspect with approved fiber inspection scope and cleaning procedure prior to mating."],
        ["Termination Method", "",
         "Factory assemblies provide better insertion loss and warranty coverage. Fusion splicing may be required for OSP / campus runs depending on design, restoration requirements, pathway, and Owner standards."],
        ["Accepted Manufacturers", "",
         "System warranty eligibility shall be based on approved components, authorized installer status, manufacturer requirements, and completed registration."],
        ["Testing Standard", "TIA-526.14 series (MM) · TIA-526-7 (SM)",
         "Tier 1 insertion loss testing required. Tier 2 OTDR testing shall be provided where specified by scope, warranty, link criticality, or Owner requirements. Tester model and calibration shall appear on reports."],
    ]
    fib_cw = [1.55 * inch, 1.70 * inch, CONTENT_W - 1.55 * inch - 1.70 * inch]
    story.append(make_table(fiber_data, fib_cw, compact=True))

    story.append(NextPageTemplate("content"))
    story.append(PageBreak())

    # ========== PAGE 12 (was 11): 4.2 + 4.3 ==========
    story.append(subsection_heading(styles, "4.2 Fiber Selection Checklist"))
    story.append(Paragraph(
        "Confirm each item before issue. These design decisions drive cost, schedule, and warranty eligibility — "
        "leaving them ambiguous is a common cause of mid-project change orders.", styles["body"]
    ))
    story.append(Spacer(1, 4))
    fiber_checklist = [
        "Strand count and spare strand allocation confirmed for each backbone run",
        "Fiber type (OM3 / OM4 / OM5 / OS2) selected and approved by Owner",
        "Polarity method (A, B, or C) selected and consistent end-to-end",
        "Termination method (factory pre-terminated vs field termination) decided",
        "Pathway type (innerduct, conduit, cable tray, J-hook) defined for each segment",
        "Minimum bend radius and pull tension limits documented in scope",
        "Service loop / slack storage strategy defined at each LIU / patch location",
        "Jacket rating (OFNP / OFNR / LSZH / OSP) selected per pathway type and AHJ",
        "Labeling schema confirmed and matches Owner CMDB / asset records",
        "Testing tier (Tier 1 IL only vs Tier 1 + Tier 2 OTDR) decided and documented",
        "Approved manufacturer(s) and authorized installer requirements confirmed for warranty",
        "System warranty term (15 / 20 / 25 yr) selected and registration responsibility assigned",
    ]
    story.append(checkbox_list_single(fiber_checklist, styles))

    story.append(subsection_heading(styles, "4.3 Additional Fiber Notes"))
    story.append(Paragraph(
        "Enter any project-specific fiber requirements, approved substitutions, or scope exceptions below.",
        styles["body"]
    ))
    story.append(Spacer(1, 4))
    nb = Table([[""]], colWidths=[CONTENT_W], rowHeights=[1.10 * inch])
    nb.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), OFFWHITE),
        ("BOX", (0, 0), (-1, -1), 0.4, LINE),
    ]))
    story.append(nb)

    story.append(NextPageTemplate("testing"))
    story.append(PageBreak())
    story.append(NextPageTemplate("content"))

    # ========== PAGE 13 (was 12): Section 05 — uses testing banner template ==========
    story.extend(section_heading(styles, "SECTION 05",
                                 "Testing, Labeling &amp; Closeout Documentation", small=True))
    story.append(subsection_heading(styles, "5.1 Copper Acceptance Criteria — All Links Must Pass"))
    story.append(Paragraph(
        "All copper links shall receive a PASS result using an approved field certification tester configured for "
        "the applicable cable category, test limit, and permanent-link or channel configuration required by the project.",
        styles["body"]
    ))
    story.append(Spacer(1, 4))
    cop_test = [
        ["Test Parameter", "Pass Criterion"],
        ["Wire Map", "Correct pin-to-pin; no opens, shorts, reversed pairs, or split pairs"],
        ["Length", "Within permanent link (90 m) or channel (100 m) maximum"],
        ["Insertion Loss", "Pass per approved field tester against the selected cable category and approved permanent-link / channel test limit"],
        ["NEXT / PS-NEXT", "Pass per approved field tester against the selected cable category and approved permanent-link / channel test limit"],
        ["ACR-F / PSACR-F", "Pass per approved field tester against the selected cable category and approved permanent-link / channel test limit (per ANSI/TIA-568.2 series)"],
        ["Return Loss", "Pass per approved field tester against the selected cable category and approved permanent-link / channel test limit"],
        ["Propagation Delay", "≤ 570 ns at 100 MHz"],
        ["Delay Skew", "≤ 50 ns between any two pairs"],
    ]
    story.append(make_table(cop_test, [1.85 * inch, CONTENT_W - 1.85 * inch]))

    story.append(subsection_heading(styles, "5.2 Fiber Acceptance Criteria"))
    story.append(Paragraph(
        "Fiber links shall meet the approved link budget and manufacturer / Owner requirements.", styles["body"]
    ))
    story.append(Spacer(1, 4))
    fib_test = [
        ["Test", "Standard", "Wavelength", "Pass Criterion"],
        ["Insertion Loss — MM", "TIA-526.14 series", "850 nm / 1300 nm", "≤ calculated link budget (OFL)"],
        ["Insertion Loss — SM", "TIA-526-7", "1310 nm / 1550 nm", "≤ calculated link budget (FOTP-78)"],
        ["OTDR — MM (Tier 2 if required)", "TIA-FOTP-60", "850 nm / 1300 nm",
         "No unexpected events; connector/splice loss and reflectance to meet approved link budget and manufacturer requirements"],
        ["OTDR — SM (Tier 2 if required)", "TIA-FOTP-60", "1310 nm / 1550 nm",
         "No unexpected events; splice loss ≤ 0.15 dB (typical) and reflectance to meet approved link budget"],
        ["End-Face Inspection", "IEC 61300-3-35", "N/A",
         "Pass per IEC 61300-3-35 using approved fiber inspection scope and cleaning procedure"],
    ]
    ft_cw = [1.55 * inch, 1.20 * inch, 1.15 * inch, CONTENT_W - 1.55 * inch - 1.20 * inch - 1.15 * inch]
    story.append(make_table(fib_test, ft_cw))

    story.append(NextPageTemplate("content"))
    story.append(PageBreak())

    # ========== PAGE 14 (was 13): 5.3 + 5.4 ==========
    story.append(subsection_heading(styles, "5.3 Label Schema"))
    story.append(Paragraph(
        "Labeling shall follow the Owner-approved label schema and applicable ANSI/TIA administration standard. "
        "Labels shall match the cable schedule, patch panel records, and closeout documentation.",
        styles["body"]
    ))
    story.append(Spacer(1, 4))
    label_data = [
        ["Element", "Format", "Example"],
        ["Horizontal Cable", "[TR-ID]-[Panel]-[Port]", "TR-01-PP-A-01"],
        ["Backbone Fiber", "[Origin]-[Dest]-[Count]-[Type]", "TR-01-MDF-12F-SM"],
        ["Outlet / WAO", "Room number + port number; matches patch panel port record", "RM-114-P03"],
        ["TR / Room", "Room designation on door and inside near light switch", "TR-01"],
        ["Rack ID", "Front top and bottom verticals; both sides of rack", "R-01-A"],
    ]
    story.append(make_table(label_data,
                           [1.55 * inch, 3.20 * inch, CONTENT_W - 1.55 * inch - 3.20 * inch]))

    story.append(subsection_heading(styles, "5.4 Closeout Documentation Package"))
    story.append(Paragraph(
        "All items below are required for final project acceptance and release of final payment / retainage. "
        "Use checkboxes to confirm inclusion in your proposal.", styles["body"]
    ))
    story.append(Spacer(1, 4))
    closeout = [
        "As-built drawings (PDF + DWG) — all cable routes, TR locations, and pathways",
        "Cable schedule (XLSX) — every link: ID, origin, destination, type, test result, label",
        "Copper test reports — PDF summaries and native files from the approved certification platform (.flw or equivalent), every link",
        "Fiber test reports — IL results required (PDF + native files from approved tester platform: .SOR, .OFR, or equivalent); OTDR traces where Tier 2 specified",
        "Label schema master list (XLSX) — physical label ↔ cable ID cross-reference",
        "Manufacturer warranty registration confirmations, registered in Owner's name",
        "Material submittals — data sheets for all cable, connectors, and hardware installed",
        "Firestop documentation — UL-listed or approved firestop system documentation where applicable",
        "Photo log — installation photos of TR rooms, racks, pathways, terminations, labels, and final state",
        "Tester calibration certificates — current calibration status for all field certification equipment used",
        "Final redline drawings — as-installed deviations from issued drawings, dated and signed",
        "Signed punch list clearance — all items resolved before final payment release",
    ]
    story.append(checkbox_list_single(closeout, styles))

    story.append(PageBreak())

    # ========== PAGE 15 (was 14): Sample Closeout Package ==========
    story.extend(section_heading(styles, "REFERENCE", "Sample Closeout Package", small=True))
    story.append(Paragraph(
        'This is what "clean closeout" looks like in practice. AES recommends the structure below and uses it as '
        'a standard closeout model where applicable. Owners should require equivalent deliverables from any cabling '
        'contractor before releasing final payment or retainage.',
        styles["intro"]
    ))

    story.append(Paragraph('<font name="Helvetica-Bold" color="#06284C">Sample Cable Schedule (XLSX)</font>', styles["h3"]))
    sched = [
        ["Cable ID", "Path (Origin → Dest)", "Type", "Length", "Result", "Label", "Date"],
        ["TR-01-PP-A-01", "RM-114-P03 → TR-01 / PP-A Port 01", "CAT6A U/UTP", "78 m", "PASS", "TR01-PP-A-01", "05/14/26"],
        ["TR-01-PP-A-02", "RM-114-P04 → TR-01 / PP-A Port 02", "CAT6A U/UTP", "79 m", "PASS", "TR01-PP-A-02", "05/14/26"],
        ["TR-01-PP-B-01", "RM-118 AP-01 → TR-01 / PP-B Port 01", "CAT6A U/UTP", "62 m", "PASS", "TR01-PP-B-01", "05/14/26"],
        ["TR01-MDF-12F-SM-01", "TR-01 LIU-A → MDF LIU-A", "OS2 12F", "184 m", "PASS", "TR01-MDF-12F-SM", "05/15/26"],
        ["…", "…", "…", "…", "…", "…", "…"],
    ]
    # 7-column layout — wider Cable ID, Label, Date columns to prevent wrapping
    sched_cw = [
        1.30 * inch,   # Cable ID — fits TR01-MDF-12F-SM-01 (18 chars)
        2.00 * inch,   # Path
        0.70 * inch,   # Type
        0.60 * inch,   # Length — wide enough for header on one line
        0.55 * inch,   # Result
        1.15 * inch,   # Label
        0.65 * inch,   # Date
    ]
    used = sum(sched_cw)
    sched_cw[1] += (CONTENT_W - used)
    story.append(make_table(sched, sched_cw, compact=True))

    story.append(Paragraph('<font name="Helvetica-Bold" color="#06284C">Sample Test Report Index</font>', styles["h3"]))
    tr_idx = [
        ["File", "Tester", "Calibration", "Wavelength / Limit", "Link Count", "Pass"],
        ["copper_perm_link_TR01.flw", "Fluke DSX-8000", "03/12/26", "TIA Cat6A Perm Link", "48", "48"],
        ["copper_perm_link_TR02.flw", "Fluke DSX-8000", "03/12/26", "TIA Cat6A Perm Link", "32", "32"],
        ["fiber_TR01_MDF_OS2.SOR", "VIAVI MTS-2000", "02/28/26", "1310 / 1550 nm", "12 strands", "12"],
        ["fiber_TR01_MDF_OS2_IL.OFR", "VIAVI Certifier40G", "02/28/26", "Tier 1 IL bidirectional", "12 strands", "12"],
        ["…", "…", "…", "…", "…", "…"],
    ]
    ti_cw = [
        2.00 * inch,   # File (was 1.60, widened — long .flw / .SOR / .OFR names)
        1.15 * inch,   # Tester
        0.80 * inch,   # Calibration
        1.55 * inch,   # Wavelength / Limit
        0.85 * inch,   # Link Count
        0.55 * inch,   # Pass
    ]
    used = sum(ti_cw)
    ti_cw[3] += (CONTENT_W - used)
    story.append(make_table(tr_idx, ti_cw, compact=True))

    story.append(Paragraph('<font name="Helvetica-Bold" color="#06284C">Sample Punch List Tracker</font>', styles["h3"]))
    punch = [
        ["#", "Item", "Location", "Owner", "Status", "Closed"],
        ["1", "Mislabeled patch panel port", "TR-01 PP-B Port 14", "Contractor", "Closed", "05/16/26"],
        ["2", "Missing firestop sleeve", "Wall penetration RM-118 → corridor", "Contractor", "Closed", "05/17/26"],
        ["3", "Failed link re-terminate", "TR-02 PP-A Port 09", "Contractor", "Closed", "05/17/26"],
        ["4", "As-built drawing markup", "TR-01 backbone path", "Contractor", "Closed", "05/18/26"],
        ["…", "…", "…", "…", "…", "…"],
    ]
    p_cw = [0.35 * inch, 1.80 * inch, 1.85 * inch, 0.85 * inch, 0.80 * inch, 0.65 * inch]
    used = sum(p_cw)
    p_cw[1] += (CONTENT_W - used)
    story.append(make_table(punch, p_cw, compact=True))

    story.append(Spacer(1, 6))
    story.append(Callout(
        "closeout", "CLOSEOUT REQUIREMENT",
        "Closeout is what protects the asset for the next 10–20 years. The cable schedule + label schema + test "
        "reports + as-built drawings should make any future technician (or any future RFP) faster, cheaper, and "
        "lower-risk. Without it, future work starts from scratch.",
        CONTENT_W, styles
    ))

    story.append(PageBreak())

    # ========== PAGE 16 (was 15): Section 06 ==========
    story.extend(section_heading(styles, "SECTION 06", "Vendor Qualifications &amp; Insurance", small=True))
    story.append(subsection_heading(styles, "6.1 Mandatory Qualifications"))
    story.append(Paragraph(
        "Firms not meeting the mandatory requirements below may be deemed non-responsive at the Owner's discretion. "
        "Submit supporting documentation with your proposal.", styles["body"]
    ))
    story.append(Spacer(1, 4))
    mq = [
        ["Requirement", "Standard / Issuing Body", "Proof Required"],
        ["BICSI Installer 2 (Copper or Optical Fiber) for lead technicians, RCDD for design-build scopes, OR qualified supervisor identified — applicable where required by project scope or warranty",
         "BICSI International",
         "Copy of current credential card for each assigned lead"],
        ["Manufacturer Authorized Installer (cable + connector system)",
         "Belden, CommScope, Panduit, Leviton, or approved equal",
         "Letter of authorization — required only where Owner specifies a manufacturer system warranty"],
        ["Low-Voltage / Electrical / Telecommunications Contractor License",
         "State, provincial, municipal, or trade license required by project jurisdiction and scope",
         "Current license number and expiry; copy of certificate"],
        ["Minimum 5 years installing structured cabling at comparable scale",
         "Bidder statement plus references",
         "3 verifiable references — projects ≥ 200 drops, completed in past 3 years"],
        ["Safety Training for all on-site technicians",
         "OSHA 10 or OSHA 30 (U.S.) — or applicable provincial / territorial safety training documentation (Canada)",
         "Copy of safety card / certificate for every technician assigned"],
    ]
    mq_cw = [2.20 * inch, 2.10 * inch, CONTENT_W - 2.20 * inch - 2.10 * inch]
    story.append(make_table(mq, mq_cw, compact=True))

    story.append(Spacer(1, 6))
    story.append(Callout(
        "field", "FIELD NOTE",
        "For smaller projects (under 200 drops or no manufacturer system warranty required), the Owner may waive "
        "BICSI Installer 2 and Manufacturer Authorized Installer requirements in favor of a qualified field "
        "supervisor identified by the bidder. Adjust mandatory clauses to match project scope.",
        CONTENT_W, styles
    ))

    story.append(subsection_heading(styles, "6.2 Preferred / Scored Qualifications"))
    story.append(Paragraph(
        "The following will be scored but are not mandatory. Bidders should indicate which apply.", styles["body"]
    ))
    story.append(Spacer(1, 4))
    pref = [
        "RCDD on staff for design review",
        "BICSI DCDC (Data Center Design Consultant) credential on staff",
        "ISO 9001 or equivalent quality management certification",
        "OSHA VPP, COR, or equivalent safety program certification",
        "Established local presence within 100 km / 60 miles of project site",
    ]
    story.append(checkbox_list_single(pref, styles))

    ins = [
        ["Coverage Type", "Minimum Limit", "Additional Insured"],
        ["Commercial General Liability", "$2,000,000 per occurrence / $4,000,000 aggregate", "Owner to be named"],
        ["Workers' Compensation (U.S. and / or WSIB / WCB / provincial equivalent in Canada)", "Statutory — per state / province", "N/A"],
        ["Employer's Liability", "$1,000,000 per occurrence", "N/A"],
        ["Commercial Auto Liability", "$1,000,000 CSL", "Owner to be named"],
        ["Professional Liability (E&amp;O) — where design or design-build scope", "$1,000,000 per claim", "Owner to be named"],
    ]
    ins_cw = [2.40 * inch, 2.30 * inch, CONTENT_W - 2.40 * inch - 2.30 * inch]
    # KeepTogether: 6.3 heading + table stay on one page; if there's not enough
    # room, the whole block jumps to the next page (no orphan rows).
    story.append(KeepTogether([
        subsection_heading(styles, "6.3 Insurance Requirements"),
        make_table(ins, ins_cw, compact=True),
    ]))

    story.append(PageBreak())

    # ========== PAGE 17 (was 16): 6.4 + 6.5 ==========
    story.append(subsection_heading(styles, "6.4 Workmanship Warranty"))
    story.append(Paragraph(
        "Bidder shall provide an installation workmanship warranty covering defects in materials supplied by "
        "Contractor and installation labor. State warranty duration and any exclusions. Where the manufacturer "
        "system warranty (typically 20–25 years) is required, Contractor is responsible for registration in the "
        "Owner's name and meeting all eligibility requirements.",
        styles["body"]
    ))
    story.append(Spacer(1, 4))
    war_data = [
        ["Workmanship Warranty — Duration", "", "Manufacturer System Warranty — Years", "", "Exclusions / Conditions", ""],
    ]
    war = Table([
        [Paragraph('<b>Workmanship Warranty — Duration</b>', styles["table_cell"]), ""],
        [Paragraph('<b>Manufacturer System Warranty — Years</b>', styles["table_cell"]), ""],
        [Paragraph('<b>Exclusions / Conditions</b>', styles["table_cell"]), ""],
    ], colWidths=[2.5 * inch, CONTENT_W - 2.5 * inch])
    war.setStyle(TableStyle([
        ("BACKGROUND", (1, 0), (1, -1), OFFWHITE),
        ("BOX", (0, 0), (-1, -1), 0.4, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(war)

    story.append(Spacer(1, 8))
    story.append(Callout(
        "field", "FIELD NOTE",
        "Manufacturer warranty does not replace workmanship responsibility for installation defects. Even when a "
        "20–25 year manufacturer system warranty is in place, the Contractor remains liable for poor terminations, "
        "mislabeled links, incorrect polarity, and pathway/firestop deficiencies.",
        CONTENT_W, styles
    ))
    story.append(Spacer(1, 6))
    story.append(Callout(
        "risk", "RISK ALERT",
        "Manufacturer system warranties may be voided, rejected, or delayed when: (a) the installer is not an authorized partner; "
        "(b) approved components are mixed with non-approved components; (c) registration is not completed within "
        "the manufacturer's required window after final test; or (d) test results do not meet the manufacturer's "
        "acceptance criteria. Confirm all four conditions before releasing final payment.",
        CONTENT_W, styles
    ))

    story.append(subsection_heading(styles, "6.5 Warranty Period — Owner Notes"))
    story.append(Paragraph(
        "Capture any project-specific warranty conditions, exclusions, or service-level expectations below.",
        styles["body"]
    ))
    story.append(Spacer(1, 4))
    nb2 = Table([[""]], colWidths=[CONTENT_W], rowHeights=[1.20 * inch])
    nb2.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), OFFWHITE),
        ("BOX", (0, 0), (-1, -1), 0.4, LINE),
    ]))
    story.append(nb2)

    story.append(PageBreak())

    # ========== PAGE 18 (was 17): Section 07 — Pricing schedule p1 ==========
    story.extend(section_heading(styles, "SECTION 07", "Pricing Schedule &amp; Evaluation Matrix", small=True))
    story.append(subsection_heading(styles, "7.1 Unit Pricing Schedule"))
    story.append(Paragraph(
        "Unit pricing is required for all applicable line items. Owner may also request a base lump-sum summary "
        "using the estimated quantities provided. Non-applicable line items shall be marked N/A with explanation. "
        "Owner reserves the right to increase or decrease quantities against unit rates.",
        styles["body"]
    ))
    story.append(Paragraph(
        '<font name="Helvetica-Bold" color="#06284C">Owner action required before issuing:</font> Insert estimated '
        "quantities in the Est. Qty column. Bidders will complete Unit Price and Extended columns. Do not issue "
        "without quantities.",
        styles["body"]
    ))
    story.append(Spacer(1, 6))
    story.append(Callout(
        "tip", "BID COMPARISON TIP",
        "This PDF form is manual-entry. Fields do not auto-calculate. Bidders are responsible for verifying all "
        "arithmetic. Unit prices govern over extended totals in the event of any discrepancy.",
        CONTENT_W, styles
    ))
    story.append(Spacer(1, 6))
    story.append(Callout(
        "field", "FIELD NOTE",
        "Require native test files (.flw, .SOR, .OFR, or equivalent), not just PDF summaries. Native files make "
        "incomplete or failed certification results easier to audit and give the Owner a defensible audit trail.",
        CONTENT_W, styles
    ))
    story.append(Spacer(1, 8))

    pricing_p1 = [
        ["#", "Description", "Unit", "Est. Qty", "Unit Price ($)", "Extended ($)"],
        ["1",  "CAT6A U/UTP cable — installed, terminated both ends, labeled", "Drop", "", "", ""],
        ["2",  "CAT6A F/UTP (shielded) cable — installed, terminated, labeled", "Drop", "", "", ""],
        ["3",  "CAT6A 24-port patch panel — installed and labeled", "Each", "", "", ""],
        ["4",  "CAT6A keystone jack + 2-port faceplate — installed and labeled", "WAO", "", "", ""],
        ["5",  "OM4 fiber backbone — per foot installed (pull + termination)", "LF", "", "", ""],
        ["6",  "OS2 single-mode backbone — per foot installed", "LF", "", "", ""],
        ["7",  "LC duplex fiber enclosure, 24-port, rack-mount — installed", "Each", "", "", ""],
        ["8",  "MPO/MTP pre-terminated trunk, 12F OM4 (specify length)", "Each", "", "", ""],
        ["9",  "Open-frame 42U rack — installed, grounded, labeled", "Each", "", "", ""],
        ["10", "Horizontal cable manager 1U — installed", "Each", "", "", ""],
        ["11", "6-inch galvanized cable tray — installed with supports", "LF", "", "", ""],
        ["12", "3/4-inch EMT conduit — installed with fittings", "LF", "", "", ""],
        ["13", "Firestop sleeve / system at wall or floor penetration", "Each", "", "", ""],
        ["14", "Copper certification test (permanent link or channel) — per link", "Link", "", "", ""],
        ["15", "Fiber Tier 1 IL test — both directions, per link", "Link", "", "", ""],
        ["16", "Fiber Tier 2 OTDR test — where specified, per link", "Link", "", "", ""],
        ["17", "TMGB / TGB ground bar — installed and bonded", "Each", "", "", ""],
        ["18", "Closeout documentation package — all deliverables per Section 5.4", "Lump", "", "", ""],
        ["19", "Mobilization / demobilization", "Lump", "", "", ""],
    ]
    pr_cw = [0.30 * inch, 3.10 * inch, 0.60 * inch, 0.80 * inch, 1.00 * inch, 1.00 * inch]
    used = sum(pr_cw)
    pr_cw[1] += (CONTENT_W - used)
    story.append(make_table(pricing_p1, pr_cw, compact=True))

    story.append(PageBreak())

    # ========== PAGE 19 (was 18): Pricing schedule p2 ==========
    pricing_p2 = [
        ["#", "Description", "Unit", "Est. Qty", "Unit Price ($)", "Extended ($)"],
        ["20", "Project Management (PM) — duration of project", "Lump", "", "", ""],
        ["21", "Site survey (post-award, if required)", "Lump", "", "", ""],
        ["22", "Lift rental (scissor / boom) — per day", "Day", "", "", ""],
        ["23", "After-hours / weekend labor premium (% over standard labor rate)", "%", "", "", ""],
        ["24", "Travel and per diem (when project is > 50 mi / 80 km from base of operations)", "Lump", "", "", ""],
        ["25", "Demolition / removal of abandoned cable per NEC/CEC/local code", "Drop", "", "", ""],
        ["26", "Patch cords — CAT6A, length / qty per Owner direction", "Each", "", "", ""],
        ["27", "Permits and inspections (where Contractor is responsible)", "Lump", "", "", ""],
        ["28", "As-built drafting (PDF + DWG)", "Lump", "", "", ""],
        ["29", "Change-order labor — Technician hourly rate", "Hr", "", "", ""],
        ["30", "Change-order labor — Lead / Foreman hourly rate", "Hr", "", "", ""],
        ["31", "Change-order labor — PM hourly rate", "Hr", "", "", ""],
        ["32", "Change-order — Material markup over invoice", "%", "", "", ""],
        [Paragraph('<b>TOTAL BID</b>', make_styles()["table_cell"]),
         "", "", "", "",
         ""],
    ]
    story.append(make_table(pricing_p2, pr_cw))
    # Make the TOTAL BID row span columns 0..4 visually by overlay style
    # (achieved via separate styling on that row's first cell using SPAN)
    # We'll rebuild with span for clarity
    story.pop()  # remove the table we just appended
    pr2_tbl = Table(pricing_p2, colWidths=pr_cw, repeatRows=1)
    pr2_style = [
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_B),
        ("FONTSIZE", (0, 0), (-1, 0), 9),
        ("TOPPADDING", (0, 0), (-1, 0), 7),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 7),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 1), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 5),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -1), 0.3, LINE),
        ("BOX", (0, 0), (-1, -1), 0.4, LINE),
        ("FONTSIZE", (0, 1), (-1, -1), 9),
        ("TEXTCOLOR", (0, 1), (-1, -1), INK),
        # Highlight TOTAL BID row
        ("SPAN", (0, -1), (4, -1)),
        ("BACKGROUND", (0, -1), (-1, -1), HexColor("#FFF1E5")),
        ("FONTNAME", (0, -1), (-1, -1), FONT_B),
        ("ALIGN", (0, -1), (4, -1), "LEFT"),
    ]
    # zebra
    for i in range(1, len(pricing_p2) - 1):
        if i % 2 == 0:
            pr2_style.append(("BACKGROUND", (0, i), (-1, i), ROW_ALT))
    pr2_tbl.setStyle(TableStyle(pr2_style))
    story.append(pr2_tbl)
    story.append(Paragraph(
        '<font size="8" color="#5C6776">Note: extended-column and total-bid arithmetic shall be verified by the '
        'bidder. Bidder shall confirm sum of extended values equals total bid.</font>',
        styles["body_sm"]
    ))

    # NEW in v2.2: 7.2 Alternate Pricing Lines — its own page (renumbered from 7.1.2 after QA)
    story.append(PageBreak())
    story.append(subsection_heading(styles, "7.2 Alternate Pricing Lines (Add / Deduct Alternates)"))
    story.append(Paragraph(
        "Bidders shall price the alternates below. Each alternate is independent and may be accepted or rejected at "
        "the Owner's discretion. Use Add (+) for added scope and Deduct (−) for value engineering.",
        styles["body"]
    ))
    story.append(Spacer(1, 4))
    alts = [
        ["Alt #", "Description", "Type", "Unit", "Est. Qty", "Unit Price ($)", "Extended ($)"],
        ["A-1", "Upgrade horizontal cabling from CAT6 to CAT6A (price differential per drop)", "Add", "Drop", "", "", ""],
        ["A-2", "Shielded F/UTP system in lieu of U/UTP (per drop)", "Add", "Drop", "", "", ""],
        ["A-3", "OS2 single-mode backbone in lieu of OM4 (per foot)", "Add", "LF", "", "", ""],
        ["A-4", "Tier 2 OTDR testing for all backbone fiber links", "Add", "Link", "", "", ""],
        ["A-5", "Pre-terminated MPO trunk system in lieu of field-terminated", "Add", "Each", "", "", ""],
        ["A-6", "After-hours installation window (weekend / overnight) — 100% of scope", "Add", "Lump", "", "", ""],
        ["A-7", "Owner-furnished patch cords (delete Contractor-supplied patch cords)", "Deduct", "Each", "", "", ""],
        ["A-8", "Manufacturer 25-year system warranty (registration + eligibility)", "Add", "Lump", "", "", ""],
        ["A-9", "Additional 25% spare strands on backbone fiber routes", "Add", "LF", "", "", ""],
        ["A-10", "Performance bond (if required)", "Add", "Lump", "", "", ""],
    ]
    alt_cw = [
        0.45 * inch,   # Alt #
        3.05 * inch,   # Description
        0.55 * inch,   # Type
        0.55 * inch,   # Unit
        0.70 * inch,   # Est. Qty
        0.90 * inch,   # Unit Price
        0.90 * inch,   # Extended
    ]
    used = sum(alt_cw)
    alt_cw[1] += (CONTENT_W - used)
    story.append(make_table(alts, alt_cw, compact=True))

    story.append(PageBreak())

    # ========== PAGE 20 (was 19): 7.1.1 Base Bid Summary ==========
    story.append(subsection_heading(styles, "7.3 Base Bid Summary"))
    story.append(Paragraph(
        "In addition to the unit pricing schedule above, bidders shall provide the following base bid summary. "
        "In case of arithmetic discrepancy between unit prices and totals, unit prices shall govern.",
        styles["body"]
    ))
    story.append(Spacer(1, 4))
    bbs_rows = [
        "Base Bid — Sum of Extended Line Items (Section 7.1)",
        "Alternates / Add-Alternates (list separately — see 7.2)",
        "Allowances (e.g., contingency, owner-directed work)",
        "Applicable Taxes (where required by jurisdiction)",
        "Bonds (where required)",
        "TOTAL BID PRICE (excludes alternates unless accepted by Owner)",
    ]
    bbs_data = []
    for r in bbs_rows:
        bbs_data.append([
            Paragraph(
                f'<font name="Helvetica-Bold" color="#06284C">{r}</font>' if r == "TOTAL BID PRICE"
                else r,
                styles["table_cell"]),
            ""
        ])
    bbs_tbl = Table(bbs_data, colWidths=[3.6 * inch, CONTENT_W - 3.6 * inch])
    bbs_style = [
        ("BACKGROUND", (1, 0), (1, -1), OFFWHITE),
        ("BOX", (0, 0), (-1, -1), 0.4, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("BACKGROUND", (0, -1), (-1, -1), HexColor("#FFF1E5")),
    ]
    bbs_tbl.setStyle(TableStyle(bbs_style))
    story.append(bbs_tbl)
    story.append(Spacer(1, 8))
    story.append(Callout(
        "tip", "BID COMPARISON TIP",
        "A bid more than 30% below the median should be flagged for clarification before award. Confirm labor "
        "assumptions, material scope, testing scope, access assumptions, and exclusions — the lowest bid may not "
        "be the lowest cost.",
        CONTENT_W, styles
    ))

    story.append(PageBreak())

    # ========== PAGE 21 (was 20): 7.2 + 7.3 + 7.4 ==========
    story.append(subsection_heading(styles, "7.4 Proposal Evaluation Matrix"))
    eval_data = [
        ["Criterion", "Weight", "What Evaluators Are Looking For"],
        ["Technical Approach & Methodology", "25%",
         "Quality of installation process; QC and testing workflow; repeatable deployment standard"],
        ["Relevant Experience & References", "25%",
         "Comparable project scope in past 3 years; BICSI credential compliance; reference quality"],
        ["Price", "25%",
         "Lowest compliant bid scored at full weight; others scaled proportionally. Bids more than 30% below median flagged for clarification."],
        ["Proposed Project Schedule", "15%",
         "Realism and detail of milestone schedule; ability to meet required completion date"],
        ["Warranty & Closeout Commitments", "10%",
         "Manufacturer system warranty eligibility; quality of proposed closeout deliverables; workmanship warranty"],
        [Paragraph('<b>TOTAL</b>', styles["table_cell"]),
         Paragraph('<b>100%</b>', styles["table_cell"]), ""],
    ]
    ev_cw = [2.30 * inch, 0.80 * inch, CONTENT_W - 2.30 * inch - 0.80 * inch]
    ev_tbl = Table(eval_data, colWidths=ev_cw, repeatRows=1)
    ev_style = [
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), white),
        ("FONTNAME", (0, 0), (-1, 0), FONT_B),
        ("FONTSIZE", (0, 0), (-1, 0), 9),
        ("TOPPADDING", (0, 0), (-1, 0), 7),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 7),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 1), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 6),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LINEBELOW", (0, 0), (-1, -1), 0.3, LINE),
        ("BOX", (0, 0), (-1, -1), 0.4, LINE),
        ("FONTSIZE", (0, 1), (-1, -1), 9),
        ("TEXTCOLOR", (0, 1), (-1, -1), INK),
        ("BACKGROUND", (0, -1), (-1, -1), HexColor("#FFF1E5")),
    ]
    for i in range(1, len(eval_data) - 1):
        if i % 2 == 0:
            ev_style.append(("BACKGROUND", (0, i), (-1, i), ROW_ALT))
    ev_tbl.setStyle(TableStyle(ev_style))
    story.append(ev_tbl)
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        '<font color="#5C6776"><b>How to score:</b> Each criterion is scored 0–100 and multiplied by its weight. '
        'For Price, the lowest compliant unit-price total receives the full Price weight (25%); other bidders '
        'receive a proportional score using Score = (Lowest Compliant Price / Bidder Price) × Weight. Flag any '
        'bid more than 30% below the median for clarification before award. Recommend award to the highest '
        'weighted total from a technically qualified firm.</font>',
        styles["body_sm"]
    ))

    story.append(subsection_heading(styles, "7.5 Change Order Process"))
    story.append(Paragraph(
        "All scope changes shall be documented via written change order signed by Owner and Contractor before "
        "work proceeds. Change-order pricing shall use the labor rates and material markup specified in Section "
        "7.1. Time impact, if any, shall be identified in writing within 5 business days.",
        styles["body"]
    ))

    story.append(subsection_heading(styles, "7.6 Payment Terms & Retainage"))
    pt_rows = [
        "Payment Terms",
        "Retainage %",
        "Retainage Release Trigger (e.g., punch-list closure + closeout package acceptance)",
    ]
    story.append(make_single_form_table(pt_rows, [2.5 * inch, CONTENT_W - 2.5 * inch]))

    story.append(PageBreak())

    # ========== PAGE 22 (was 21): Section 08 ==========
    story.extend(section_heading(styles, "SECTION 08",
                                 "Bid Submittal Checklist &amp; Bidder Certification", small=True))
    story.append(Paragraph(
        '<font color="#FF6B00">■</font>  Complete this checklist before submitting your proposal. All items '
        'marked Required must be included. Proposals missing required items may be deemed non-responsive at the '
        'Owner\'s discretion.',
        styles["intro"]
    ))
    story.append(subsection_heading(styles, "8.1 Proposal Package — Required Items"))
    req = [
        "Cover letter on company letterhead, signed by authorized representative",
        "Completed pricing schedule (Section 07) — all applicable line items priced; non-applicable items marked N/A with explanation",
        "Proposed project schedule — milestone Gantt or equivalent, with completion date",
        "Three verifiable project references (projects ≥ 200 drops, past 3 years)",
        "Copy of current BICSI Installer 2 or RCDD credential card for each assigned lead, as required by Section 06 and project scope",
        "OSHA 10 / 30 (U.S.) or equivalent provincial / territorial safety documentation (Canada) for every technician assigned",
        "Manufacturer letter of authorization (required for system warranty eligibility)",
        "Current state / provincial / municipal license per project jurisdiction — copy and number",
        "Certificate of insurance — all coverages per Section 6.3, Owner named as additional insured",
        "List of proposed subcontractors with scope description (if any)",
        "Assumptions, exclusions, and clarifications per Section 1.5",
        "Addenda acknowledgment per Section 0.5",
    ]
    story.append(checkbox_list_single(req, styles))

    story.append(subsection_heading(styles, "8.2 Recommended Additions (Scored — Not Disqualifying)"))
    rec = [
        "Written methodology describing installation process, QC checkpoints, and testing workflow",
        "Site safety plan or reference to company safety program",
        "Manufacturer pre-qualification letter confirming system warranty eligibility",
        "Sample closeout documentation package from a comparable completed project",
        "List of clarifying questions or proposed scope exceptions with rationale",
    ]
    story.append(checkbox_list_single(rec, styles))

    story.append(subsection_heading(styles, "8.3 Bidder Certification"))
    story.append(Paragraph(
        "By submitting this proposal, the undersigned certifies that: (a) all information provided is accurate "
        "and complete; (b) the firm meets all qualification requirements stated herein; (c) the pricing submitted "
        "is valid for 90 days from the proposal due date; (d) the bidder acknowledges receipt of all addenda "
        "listed in Section 0.5; (e) the bidder has identified all assumptions, exclusions, and clarifications in "
        "Section 1.5; and (f) the signer represents they are authorized to bind the company.",
        styles["body"]
    ))
    story.append(Spacer(1, 4))
    cert_rows = ["Authorized Signature", "Date",
                 "Printed Name", "Title",
                 "Company Name", "Phone",
                 "Addenda Acknowledged (range)", "Email",
                 "Tax ID / Business Reg. #", "State / Prov."]
    story.append(make_form_table(cert_rows, [1.7 * inch, 1.9 * inch, 1.7 * inch, CONTENT_W - 5.3 * inch]))

    # Switch to back cover and emit final break
    story.append(NextPageTemplate("back_cover"))
    story.append(PageBreak())
    # A no-op paragraph so the back cover page actually gets emitted
    story.append(Spacer(1, 1))

    return story


# -----------------------------------------------------------------------------
# Main
# -----------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="Build AES Structured Cabling RFP Template PDF.")
    parser.add_argument("--out", default=str(DEFAULT_OUT),
                        help="Output PDF path (default: aes-website/public/assets/...)")
    args = parser.parse_args()

    out_path = Path(args.out).resolve()
    out_path.parent.mkdir(parents=True, exist_ok=True)

    doc = RFPDoc(str(out_path))
    story = build_story()
    doc.build(story)
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
