# Meet Bhalani — aerospace engineering portfolio

A responsive, buildless portfolio at **https://meetbhalani.tech**.

The site brings together solar-sail trajectory research, a CubeSat command-verification bachelor's thesis, ground-segment contributions at GOS, and two independent software projects.

## Edit the site

- `index.html`: page structure, summaries, education, and contact route.
- `assets/styles.css`: layout, responsive styles, and dialog presentation.
- `assets/portfolio.js`: project case studies, filters, mobile navigation, and accessible native dialogs.
- `assets/*.svg`: original conceptual illustrations and favicon.
- `CNAME`: the custom domain; retain it when updating the website.
- `.nojekyll`: direct static publishing without Jekyll processing.
- `robots.txt` and `sitemap.xml`: basic discovery metadata.

There are no package dependencies, external fonts, analytics, or build steps. Open `index.html` locally, or serve this directory with a static HTTP server.

Project summaries remain readable without JavaScript. JavaScript enables the filters, case-study dialogs, and compact mobile navigation. Motion preferences and keyboard navigation are respected.

## Public content

The case studies use high-level descriptions and original conceptual diagrams. They distinguish ongoing research, completed thesis work, and prototype or packaged software. The GitHub profile is the sole public contact route.

Keep client data, internal technical identifiers, operational screenshots, and private source material out of this repository. Local previews and working notes in `output/` are ignored by Git.

## Publish

GitHub Pages serves the repository root from `main`. Changes to that branch trigger deployment. The domain is managed through Namecheap; GitHub Pages provides HTTPS.
