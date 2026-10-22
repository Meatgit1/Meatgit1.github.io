"use strict";

document.documentElement.classList.replace("no-js", "js");

const cases = {
  sail: {
    eyebrow: "01 / Master’s research · Ongoing",
    title: "Steering with sunlight.",
    summary: "How can evolutionary neurocontrol and local optimisation work together to refine an ideal solar-sail rendezvous trajectory?",
    facts: [["Focus", "Interplanetary rendezvous"], ["Context", "M.Sc. research · FH Aachen"], ["Status", "Research in progress"]],
    sections: [
      ["The problem", "A rendezvous requires a spacecraft to match a moving target’s position and velocity at the same epoch. With a solar sail, the direction of the sail changes how sunlight contributes to the motion, so the steering history is part of the trajectory problem."],
      ["What I’m building", "My current work connects a native C++ trajectory tool, InTrance, to a Python local-optimisation workflow. Evolutionary neurocontrol provides candidate histories; constrained optimisation refines the steering schedule. The work involves model interfaces, numerical integration, multiple shooting, and consistent treatment of the mission constraints."],
      ["How I check it", "Refinement is followed by independent continuous propagation and replay in the original simulation. I keep solver convergence, numerical consistency, and mission acceptance as separate questions, so a successful solve is interpreted alongside the resulting trajectory checks."],
      ["Where it stands", "The research is ongoing and uses an ideal-sail model. This overview describes the method; it does not claim a globally optimal trajectory or a flight-qualified solution."]
    ],
    takeaway: "A useful optimisation result needs a clear path from candidate to independently checked trajectory.",
    tags: ["C++", "Python", "CasADi", "Ipopt", "Multiple shooting", "Numerical integration", "Orbital dynamics"]
  },
  command: {
    eyebrow: "02 / Bachelor’s thesis · Completed",
    title: "From input to verified command.",
    summary: "A graphical command-verification workflow and mission-database integration for CubeSat electric propulsion.",
    facts: [["Focus", "Command and telemetry verification"], ["Context", "Bachelor’s thesis · FH Aachen / GOS"], ["Interface", "Python / PySide6"]],
    sections: [
      ["The problem", "An operator’s readable input has to become a correctly defined command that the surrounding ground software understands. Interface definitions, validation, and the operator tool need to stay consistent."],
      ["My contribution", "I developed a Python/PySide6 interface for telecommand generation and worked with XTCE/XML command and telemetry definitions in Yamcs. The thesis connected interface-level inputs with packet-level checks and mission-database integration."],
      ["The engineering work", "The workflow supported command and telemetry verification and hardware-in-the-loop test preparation. It brought together GUI behaviour, command construction, and the definitions used by the ground environment."],
      ["What I took forward", "This work gave me a practical foundation in the relationship between an operator interface, a mission database, and a testable spacecraft command workflow."]
    ],
    takeaway: "The interface is one part of the system. Its inputs and outputs need to agree with the definitions around it.",
    tags: ["Python", "PySide6 / Qt", "Yamcs", "XTCE / XML", "TM/TC", "HIL test preparation"]
  },
  ledger: {
    eyebrow: "03 / Independent software · Mac & Android",
    title: "Familiar workflow. Digital clarity.",
    summary: "Diamond Ledger / Heera Hisab translates an existing handwritten ledger workflow into a Gujarati-first offline application.",
    facts: [["Focus", "Accessible local software"], ["Platforms", "Mac and Android"], ["Data model", "Offline persistence"]],
    sections: [
      ["The problem", "A familiar handwritten process carries a lot of domain knowledge in its entry order and calculations. Digitising it means understanding that workflow before choosing the interface."],
      ["What I built", "I developed bilingual interfaces, automatic calculations, saved drafts, monthly reports, and backup/restore workflows. The design preserves the familiar entry sequence while making corrections and review easier."],
      ["The engineering choices", "The desktop version combines Python and web interface technologies. The Android version connects a Java/WebView interface to native validation and SQLite storage. Touch interactions distinguish deliberate entries from ordinary scrolling, while drafts and recoverable operations protect work in progress."],
      ["Where it stands", "Mac and Android versions have been packaged. Device-specific acceptance of the newest touch refinements remains a separate validation step. The illustration here uses an abstract workflow rather than actual ledger records."]
    ],
    takeaway: "Good software can preserve the user’s way of thinking while making the state easier to inspect and recover.",
    tags: ["Python", "HTML / CSS / JavaScript", "Android / Java", "WebView", "SQLite", "Gujarati-first UX"]
  },
  gst: {
    eyebrow: "04 / Independent software · Desktop prototype",
    title: "Make every output traceable.",
    summary: "GST Local Pro is an offline tool developed for an accounting workflow, connecting spreadsheet import with explicit validation, human review, and export.",
    facts: [["Focus", "Traceable data processing"], ["Platform", "Electron desktop application"], ["Status", "Packaged prototype"]],
    sections: [
      ["The problem", "Spreadsheet reports can contain irregular structure, incomplete fields, and corrections that are easy to lose during conversion. A useful export workflow needs to make those issues visible to the person reviewing it."],
      ["What I built", "I built an interface for importing reports, completing missing details, inspecting issues, and reviewing the output before export. Derived results retain a connection to their source rows, so corrections can be reviewed in context."],
      ["The engineering choices", "The Electron/Node.js implementation uses fixed-point numerical handling, structured diagnostics, explicit corrections, encrypted drafts, and portable backups. Incomplete information remains visible rather than being silently filled in."],
      ["Where it stands", "A desktop prototype has been packaged. Native Windows acceptance and live filing remain separate checks; this project overview makes no claim of portal certification or legal compliance. No client reports or business identifiers are displayed."]
    ],
    takeaway: "A conversion pipeline is more useful when a person can explain where every output came from.",
    tags: ["Electron", "Node.js", "JavaScript", "Spreadsheet processing", "Fixed-point arithmetic", "Data provenance"]
  },
  io: {
    eyebrow: "Engineering notebook / Team course project",
    title: "Connect the lander to its relay.",
    summary: "A coauthored communications and data-handling study within a conceptual Io lander mission-design project.",
    facts: [["Role", "Coauthor of subsystem study"], ["Context", "Team academic mission concept"], ["Focus", "Communication and data handling"]],
    sections: [
      ["The design question", "A lander can generate useful science data only if the mission can store it and move it through the communication chain. Antenna coverage, relay geometry, radio-link margins, contact timing, and buffering all influence that chain."],
      ["My contribution", "I coauthored the communications and data-handling study within the larger team project. The work connected antenna placement and coverage, link-budget reasoning, relay visibility, and data-return analysis, supported by Python calculations and visualisation."],
      ["What the checks taught me", "The review separated line of sight, antenna field of view, radio-link screening, and usable communication time. A geometric opportunity alone does not establish a complete communication window; pointing, link conditions, and data flow need consistent treatment."],
      ["Scope", "This is a conceptual academic design study. End-to-end operational qualification and coupled communication-buffer behaviour remain open validation questions. This overview shares the engineering reasoning without the original configuration tables or numerical results."]
    ],
    takeaway: "Visibility, a viable radio link, and useful data delivery are separate questions that need to agree.",
    tags: ["Communication links", "Antenna coverage", "Link budgets", "Data handling", "Python", "Mission concepts"]
  },
  lifeSupport: {
    eyebrow: "Engineering notebook / Coauthored course review",
    title: "Make life support a design driver.",
    summary: "A coauthored narrative engineering review of closed-loop life support for permanent lunar and Martian surface habitats.",
    facts: [["Role", "Coauthor"], ["Context", "Planets & Life coursework"], ["Method", "Literature-based systems review"]],
    sections: [
      ["The systems question", "Recovering air, water, and other resources changes the rest of a habitat. Higher loop closure also affects power demand, thermal control, maintenance, consumables, and the time the crew spends keeping the system running."],
      ["Our review", "We compared physico-chemical, biological, and hybrid life-support architectures using published work. The review considered how these approaches fit lunar and Martian surface habitats and how staged deployment changes the design choices."],
      ["My contribution", "I coauthored the course report and its engineering discussion. The project helped me connect subsystem choices to wider habitat constraints and explain trade-offs across disciplines."],
      ["Scope", "The outcome is a narrative engineering review of published concepts. The work supports comparison and systems reasoning; it does not provide a newly sized habitat, an experimental demonstration, or validated performance claims."]
    ],
    takeaway: "The useful design question is how resource recovery fits the whole habitat, including its crew and maintenance needs.",
    tags: ["Life support", "Habitat systems", "Loop closure", "Systems trade-offs", "Literature review"]
  },
  entry: {
    eyebrow: "Engineering notebook / Individual coursework",
    title: "Follow the entry physics.",
    summary: "Individual Python notebook studies connecting analytical entry dynamics with explicit physical assumptions.",
    facts: [["Role", "Individual notebook solutions"], ["Context", "Atmospheric-entry coursework"], ["Method", "Analytical models and plots"]],
    sections: [
      ["The physical question", "A capsule entering an atmosphere trades speed for aerodynamic forces and heating. Ballistic coefficient, entry angle, and atmospheric density influence where deceleration occurs and how the motion develops."],
      ["What I worked through", "I used Python notebooks for prescribed course problems involving return energy, drag, ballistic coefficient, peak deceleration, dynamic pressure, and velocity–altitude relationships. The notebooks connect calculations with plots so changes in assumptions can be interpreted physically."],
      ["Model judgement", "The study also examined limitations of simplified ideal-gas and drag-dominated treatments. Their predictions need to be interpreted within the speed ranges and physical effects represented by the model, particularly as omitted gravity or gas-physics effects become important."],
      ["Scope", "These are analytical coursework studies. The portfolio describes the methods and lessons without reproducing assignment questions, original result plots, or claiming a validated entry simulator."]
    ],
    takeaway: "An interpretable curve needs both an equation and a clear account of the physics that equation leaves out.",
    tags: ["Python", "Jupyter notebooks", "Atmospheric entry", "Ballistic coefficient", "Analytical modelling"]
  },
  gestures: {
    eyebrow: "Engineering notebook / Personal software adaptation",
    title: "Make gestures deliberate.",
    summary: "A personal Swift/AppKit fork of MiddleClick, adapting Magic Mouse touch gestures and their input lifecycle.",
    facts: [["Basis", "MiddleClick · GPL-3.0"], ["Contribution", "Personal gesture and control changes"], ["Status", "Working fork; device checks ongoing"]],
    sections: [
      ["The interaction problem", "A touch gesture needs enough evidence of deliberate intent before it becomes an action. Ordinary pointer activity, incomplete gestures, and changes in the application lifecycle can make that decision less straightforward."],
      ["My adaptation", "Building on MiddleClick, I adapted tap and inward-pinch gestures for my Magic Mouse and added separate sensitivity controls, local diagnostics, and reconnect controls. The changes include cancelling pending actions when their context changes and rejecting stale input."],
      ["How I separate checks", "Recognizer and lifecycle checks support software verification. Core gestures have also been checked on my own mouse. The newest sensitivity range, other mouse models, and physical sleep/reconnect scenarios still need separate device acceptance."],
      ["Attribution and scope", "This is a personal adaptation of an existing GPL-3.0 project. Upstream authorship is retained, and the portfolio describes my changes. The private fork, application package, sensor traces, and device identifiers are not distributed here."]
    ],
    takeaway: "Input handling needs to know both what a gesture means and whether its context is still valid when the action fires.",
    tags: ["Swift", "AppKit", "Gesture recognition", "State machines", "Lifecycle handling"],
    links: [["Upstream MiddleClick · GPL-3.0", "https://github.com/artginzburg/MiddleClick"]]
  }
};

const projectCards = Array.from(document.querySelectorAll(".project-card"));
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const filterStatus = document.querySelector("#filter-status");

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    let visibleCount = 0;
    for (const card of projectCards) {
      card.hidden = selected !== "all" && card.dataset.category !== selected;
      if (!card.hidden) visibleCount += 1;
    }
    for (const candidate of filterButtons) {
      const active = candidate === button;
      candidate.classList.toggle("is-active", active);
      candidate.setAttribute("aria-pressed", String(active));
    }
    filterStatus.textContent = selected === "all"
      ? "Showing all 4 projects"
      : `Showing ${visibleCount} ${selected} projects`;
  });
}

// Content is authored locally. Build the dialog with text nodes so later edits
// cannot accidentally introduce HTML through project copy.
function element(tag, text, className) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (className) node.className = className;
  return node;
}

const dialog = document.querySelector("#case-dialog");
const content = document.querySelector("#case-content");
let opener = null;

function openCase(key, trigger) {
  const project = cases[key];
  if (!project || dialog.open) return;
  opener = trigger;
  content.replaceChildren();
  content.append(element("p", project.eyebrow, "case-eyebrow"));
  const title = element("h2", project.title);
  title.id = "case-title";
  content.append(title, element("p", project.summary, "case-summary"));
  const facts = element("dl", "", "case-facts");
  for (const [label, value] of project.facts) {
    const group = element("div");
    group.append(element("dt", label), element("dd", value));
    facts.append(group);
  }
  content.append(facts);
  for (const [heading, text] of project.sections) {
    const section = element("section", "", "case-section");
    section.append(element("h3", heading), element("p", text));
    content.append(section);
  }
  const takeaway = element("div", "", "case-takeaway");
  takeaway.append(element("span", "The engineering thread"), element("p", project.takeaway));
  content.append(takeaway);
  if (project.links) {
    const links = element("ul", "", "case-links");
    for (const [label, href] of project.links) {
      const item = element("li");
      const link = element("a", label);
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      item.append(link);
      links.append(item);
    }
    content.append(links);
  }
  const tags = element("ul", "", "case-tags tags");
  tags.setAttribute("aria-label", "Technologies and methods");
  for (const tag of project.tags) tags.append(element("li", tag));
  content.append(tags);
  dialog.showModal();
  document.body.classList.add("modal-open");
  dialog.scrollTop = 0;
  document.querySelector(".dialog-close").focus();
}

for (const trigger of document.querySelectorAll("[data-case]")) {
  trigger.addEventListener("click", () => openCase(trigger.dataset.case, trigger));
}

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  if (opener && opener.isConnected) opener.focus();
});

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
function closeMenu() {
  nav.dataset.open = "false";
  menuButton.setAttribute("aria-expanded", "false");
}
menuButton.addEventListener("click", () => {
  const opening = nav.dataset.open !== "true";
  nav.dataset.open = String(opening);
  menuButton.setAttribute("aria-expanded", String(opening));
});
for (const link of nav.querySelectorAll("a")) link.addEventListener("click", closeMenu);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.dataset.open === "true") {
    closeMenu();
    menuButton.focus();
  }
});
document.querySelector("#year").textContent = String(new Date().getFullYear());
