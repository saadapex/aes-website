# AES Website — Next.js 14

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## ⚠️ Windows Folder Rename Required

Next.js dynamic routes use `[slug]` folder names. Windows blocked creating brackets via shell.
You need to manually rename these two folders before `npm run dev`:

1. `src/app/case-studies/SLUG_PLACEHOLDER/` → rename to `[slug]`
   (the `__slug__` copy is a backup — delete after rename)
2. The industries `[slug]` folder was created successfully — no action needed there.

## Stack
- Next.js 14 App Router
- Tailwind CSS (AES tokens configured in tailwind.config.ts)
- shadcn/ui · Framer Motion · React Hook Form · Lucide React

## Before Launch
- [ ] Replace GTM-XXXXXXX in layout.tsx with real GTM ID
- [ ] Replace LinkedIn Insight Tag ID in layout.tsx
- [ ] Add CRM webhook URL to .env.local → NEXT_PUBLIC_CRM_WEBHOOK_URL
- [ ] Confirm ISO cert status (9001, 22301, 45001) before publishing badges
- [ ] Add real logo SVGs to /public/images/
- [ ] Add capability-statement.pdf to /public/assets/
- [ ] Rename case-studies/SLUG_PLACEHOLDER → [slug]
- [ ] Add real hero photo and case study images
