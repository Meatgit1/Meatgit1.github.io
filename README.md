# Meet Bhalani — aerospace engineering portfolio

A responsive, buildless portfolio at **https://meetbhalani.tech**.

The site brings together solar-sail trajectory research, a CubeSat command-verification bachelor's thesis, ground-segment contributions at GOS, and two independent software projects. An engineering notebook adds an Io communications team study, a coauthored life-support review, individual atmospheric-entry coursework, and a personal MiddleClick adaptation.

## Edit the site

- `index.html`: page structure, summaries, education, and contact route.
- `assets/styles.css`: layout, responsive styles, and dialog presentation.
- `assets/portfolio.js`: project case studies, filters, mobile navigation, and accessible native dialogs.
- `assets/notebook.css`: the compact engineering-notebook cards and attribution links.
- `assets/sail-model.mjs`: public, normalized ideal-sail physics and diagram geometry.
- `assets/sail-explorer.js` and `assets/sail-explorer.css`: angle slider, drag handle, presets, readouts, and presentation.
- `tests/sail-model.test.mjs`: analytic reference cases, vector invariants, geometry, and boundary checks.
- `assets/*.svg`: original conceptual illustrations and favicon.
- `CNAME`: the custom domain; retain it when updating the website.
- `.nojekyll`: direct static publishing without Jekyll processing.
- `robots.txt` and `sitemap.xml`: basic discovery metadata.

There are no package dependencies, external fonts, analytics, or build steps. Serve this directory with a static HTTP server so the JavaScript modules load correctly, for example `python3 -m http.server 60330 --bind 127.0.0.1`.

Project summaries remain readable without JavaScript. JavaScript enables the filters, case-study dialogs, and compact mobile navigation. Motion preferences and keyboard navigation are respected.

## Interactive solar sail

Visitors can change the sail-normal angle from −90° to +90° with a keyboard-accessible slider, four presets, or a diagram drag handle. The sheet, normal, acceleration vector, components, and readouts update together. Reset returns to +35°.

At fixed sunlight and distance, a flat perfect reflector has normalized acceleration `a/a0 = cos²(alpha) n`, with `n = (cos(alpha), sin(alpha))`. The diagram shows instantaneous acceleration, excluding gravity and non-ideal optics; it does not predict a trajectory. The face-on reference is `a0 = 1`, with no mission-specific scale or inputs.

Reference: [Wawrzyniak & Howell (2011), section 2, equation (4)](https://engineering.purdue.edu/people/kathleen.howell.1/Publications/Journals/2011_IJAE_WawHow.pdf). The geometry and examples are original illustrations derived from this public force law, not thesis output.

Run the dependency-free model checks with Node.js: `node --test tests/sail-model.test.mjs`.

## Public content

The case studies use high-level descriptions and original conceptual diagrams. They distinguish ongoing research, completed thesis work, and prototype or packaged software. The GitHub profile is the sole public contact route.

The notebook keeps team coursework, coauthored literature review, individual course solutions, and a personal software fork distinct. The MiddleClick entry links to [its upstream project](https://github.com/artginzburg/MiddleClick) and retains GPL-3.0 attribution. Reference-only applications and materials are excluded from personal project claims.

Keep client data, internal technical identifiers, operational screenshots, and private source material out of this repository. Local previews and working notes in `output/` are ignored by Git.

## Publish

GitHub Pages serves the repository root from `main`. Changes to that branch trigger deployment. The domain is managed through Namecheap; GitHub Pages provides HTTPS.
