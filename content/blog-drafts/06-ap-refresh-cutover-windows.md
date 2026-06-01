---
title: "How AP Refresh Teams Actually Hit a 24-Hour Cutover Window"
slug: ap-refresh-24-hour-cutover-window
old_slugs: []
excerpt: "Refreshing several hundred APs inside one warehouse shutdown window is standard for hyperscale fulfillment. Hitting the window isn't about crew size — it's pre-staging, shift planning, and tracking."
category: "Wireless & AP"
author: "Saad Usmani"
publishedAt: "2026-05-12"
coverImageHint: "Field crew on scissor lifts performing coordinated overnight AP swap in a fulfillment warehouse"
---

Large-scale AP refresh in active fulfillment and logistics environments has one constraint that drives every other decision: the cutover window. Sites operate around the clock, every hour offline costs throughput, and the planned shutdown windows for network work are short — often 12 to 24 hours at a single site, sometimes less. Inside that window, several hundred access points have to come down, get replaced, get labeled, get validated, and come back online clean.

The pattern of how this actually works is worth writing down, because the gap between sites that hit the window and sites that miss it is mostly process discipline, not headcount.

## What a Typical Multi-Site Refresh Looks Like

For context, a representative scope: a global e-commerce or logistics operator refreshing wireless infrastructure across multiple North American facilities. Per site, the build might be:

- 400 to 1,200+ APs
- 20 to 25 IDFs spread across the floor
- Forty-foot ceilings with multiple mezzanine levels
- Scissor lift access required for most APs
- A non-negotiable cutover window (24-hour shutdown is common)
- Asset database updates required at install time — port ID, logical name, serial, MAC

That's the working environment. Here's what tends to determine success.

## Pre-Staging Day

The most underrated phase. The day before the cutover window opens, a small crew should walk the site to confirm:

- AP inventory matches the BOM, by quantity and by model
- Scissor lifts are present, charged, and operational
- Lift access paths are not blocked by racking, pallets, or active operations
- Fall protection gear is on-site and accessible
- IDF access is confirmed with site security and ops
- Labeling materials and pre-printed labels (where pre-printable) are staged at each IDF

The most common cause of missing a cutover window is not crew speed. It's discovering at hour two that a lift is dead, a label printer has the wrong ribbon, or an IDF is locked and the badge holder isn't on shift. Pre-staging day catches those.

## Shift Planning Inside the Window

A 24-hour window doesn't mean one crew working 24 hours. It means continuous coverage with planned hand-offs. The pattern that works:

- **Shift 1 (early):** Handle the highest, most lift-dependent zones — roof structures, top mezzanine, anything where lift cycle time dominates. Crew is fresh, lift batteries are full.
- **Shift 2 (middle):** Lower mezzanine and main floor, where lift access is faster but labeling discipline matters more.
- **Shift 3 (late/verification):** Full validation sweep, controller association checks, coverage spot-checks, documentation sign-off.

Clean hand-offs between shifts require running documentation — a shared tracking sheet, updated in real time, that shows what's done, what's outstanding, and what hit issues. Without that, shift 2 spends the first hour reconstructing where shift 1 left off.

## Real-Time Tracking, Not End-of-Shift Reports

Per-AP tracking, updated as work happens, is the difference between a clean handover and a chaotic one. A shared spreadsheet or tracking app, accessed from iPads in the field, with one row per AP and fields for:

- Install status (done / blocked / partial)
- Label applied (yes / no)
- Serial captured
- MAC captured
- Tester verification (signal, controller association)
- Photo reference (if required)

When this is updated as APs are completed, the supervisor and the operator's network team have a current picture at all times. When it's updated at end of shift, problems get discovered too late to recover inside the window.

## Pre-Labeling Where Feasible

For larger sites or repeat programs, pre-labeling APs before they leave the staging area is a force multiplier. The crew on the lift hangs the AP and labels it from a known schema, instead of stopping to label-print or write by hand. This requires:

- A label scheme aligned with the operator's CMDB or asset system
- Pre-printed label batches keyed to physical locations
- A discipline that says "if the label doesn't match the location, stop and reconcile, don't improvise"

The third bullet is where this can go wrong if the crew is rushed. A mismatch caught in the field is a 15-minute fix; a mismatch missed in the field is a CMDB cleanup project for someone six months later.

## Safety as Schedule Discipline

Lift work at 40 feet with scissor lifts, fall protection, and PPE compliance is not negotiable on a refresh program. What's often missed is that safety discipline is also schedule discipline. Crews that take shortcuts on PPE or spotter coverage either get someone hurt or get the program shut down by the operator's safety officer — both of which blow the cutover window worse than any technical problem.

The standard set:

- Full PPE: hard hat, safety vest, safety shoes, gloves
- Harness and lanyard above six feet
- Mandatory spotter for all scissor lift operations
- Site-specific contractor orientation completed by every technician before they touch a lift
- Daily safety briefing at shift start, regardless of how many days the crew has been on-site

A field execution partner that treats safety as a baseline operating condition runs faster than one that treats it as overhead, because they don't get interrupted.

## What This Looks Like in the Closeout

A clean refresh delivers, at the end of the program:

- Per-site AP database export reconciled against the operator's CMDB
- Photo documentation of representative installs
- Safety records: orientation completions, daily briefings, incident log (whether incidents occurred or not)
- Lessons-learned notes for future sites in the program

When the closeout shows up the day the window closes, the operator's network team can put the site into production immediately. When it shows up a week later in fragments, the program slips at the back end even if the front-end execution was clean.

## The Bottom Line

A 24-hour window is a hard deadline that rewards process and punishes improvisation. Most of what determines success happens before the window opens — pre-staging, label prep, crew briefing, lift logistics. Programs that treat the cutover window as the start of the work usually miss it. Programs that treat it as the moment the work has to finish usually hit it. The full 1,586-AP Ontario refresh from Q1 2026 is documented in the case studies section on this site.
