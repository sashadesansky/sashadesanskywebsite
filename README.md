# sashadesansky.com

A personal portfolio / brand site for Aleksandra "Sasha" Desansky — a running
showcase of experience, AI projects, and travel. Styled after Wired
magazine's editorial black-and-white design language: a display serif for
headlines, a humanist serif for reading copy, a clean sans for structure.

**No build step, no framework, no server required.** It's plain HTML, CSS,
and JavaScript, so it can be hosted for free on GitHub Pages and edited
directly in a browser.

## Editing the content

👉 If you just want to update your bio, add a project, or add a place
you've traveled to, see **[CONTENT_GUIDE.md](CONTENT_GUIDE.md)** — it's
written for a non-technical editor and only involves editing one file,
`content.js`.

## File map

```
index.html          Page structure (rarely needs edits)
content.js           <-- YOUR CONTENT LIVES HERE. Edit this file.
css/style.css        Visual design (colors, fonts, spacing)
js/main.js           Renders the page from content.js (rarely needs edits)
images/              Your photos. Put project photos in images/projects/,
                      travel photos in images/travel/, and a headshot
                      directly in images/.
CNAME                Tells GitHub Pages this site should answer to
                      sashadesansky.com
```

## Previewing locally

Because browsers block loading local files via `fetch()`, and this site
avoids that entirely by loading content through a plain `<script>` tag,
you can preview it two ways:

1. **Just double-click `index.html`** — it will open directly in your
   browser and work, no server needed.
2. Or, from this folder, run a tiny local server and visit
   `http://localhost:8000`:
   ```
   python3 -m http.server 8000
   ```

## Deploying to sashadesansky.com (GitHub Pages)

1. Push this repository to GitHub (or merge this branch into `main`).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch",
   pick the `main` branch and `/ (root)` folder, then **Save**.
4. GitHub will publish the site at `https://<your-username>.github.io/<repo>/`
   within a minute or two.
5. To use the custom domain `sashadesansky.com` (already set up via the
   `CNAME` file in this repo):
   - In your domain registrar's DNS settings, add:
     - Four `A` records for the apex domain (`sashadesansky.com`) pointing to
       GitHub Pages' IPs: `185.199.108.153`, `185.199.109.153`,
       `185.199.110.153`, `185.199.111.153`
     - A `CNAME` record for `www` pointing to `<your-username>.github.io`
   - Back in **Settings → Pages**, enter `sashadesansky.com` as the custom
     domain and enable **Enforce HTTPS** once it's verified (can take up to
     24 hours for DNS to propagate).

No further configuration, database, or build pipeline is needed — every
future update is just an edit to `content.js` (or a photo drop into
`images/`) followed by a commit.

## Design system

The visual language is defined with CSS custom properties at the top of
`css/style.css` (colors, type scale, spacing, radius). It mirrors an
editorial "Wired magazine" brand: strict black-on-white, `Playfair Display`
for display headlines, `Lora` for long-form body copy, `Inter` for
navigation/labels/buttons, and square (0px radius) corners everywhere
except circular avatar/icon marks.
