UTPAL WISHES — PREMIUM V2

What changed:
- Clean short wish URLs like /birthday/AB12CD34 instead of long encoded query strings.
- Wishes are stored in Netlify Blobs so the same link can open on another phone.
- Optional recipient photo is stored with the wish and revealed beautifully.
- Surprise-first experience: For [name] → gift → Open → personalised wish.
- Automatic WhatsApp/share text with mystery wording.
- Dynamic Open Graph title/description for wish URLs via Netlify Edge Function.
- 14 occasions, responsive mobile UI, confetti, animated reveal, photo frame.

IMPORTANT DEPLOYMENT:
Upload the whole folder/ZIP to Netlify as a site (not just index.html). Netlify Functions and Edge Functions must be deployed. The site uses Netlify Blobs; no separate database account is required.

After deployment, create a wish and the URL will look like:
https://YOUR-SITE.netlify.app/birthday/AB12CD34

The old ?wish=... links are not used by V2.
