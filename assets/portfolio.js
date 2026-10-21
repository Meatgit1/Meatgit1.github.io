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
