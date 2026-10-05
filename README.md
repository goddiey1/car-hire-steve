# Godfrey Hire

Marketing site for Godfrey Hire, offering car hire and airport-transfer enquiries in Nairobi. It is a statically generated Next.js application and uses Web3Forms for lead delivery.

## Run locally

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

Edit `.env.local` with real contact details and a Web3Forms access key before testing a form. The file is ignored by Git.

## Required build-time configuration

All `NEXT_PUBLIC_` values are embedded in the browser bundle during `npm run build`. Configure them in the deployment platform before building and deploying:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL, including `https://` |
| `NEXT_PUBLIC_CONTACT_PHONE` | Phone number shown on the site, in international format |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number using digits only, with country code |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Web3Forms access key used to submit enquiries |

The Web3Forms access key is necessarily public in this browser-only architecture. Enable the provider's spam protection and monitor submitted leads. For confirmed reservations, availability management, or payment collection, add a serverless API and a database rather than treating this site as a booking system.

## Quality checks

```bash
npm run lint
npm run build
```
