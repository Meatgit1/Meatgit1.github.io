import { idealSail, sailGeometry, percent, SAIL_VIEW } from "./sail-model.mjs";

const root = document.querySelector("#sail-lab");
if (root) {
  const get = (id) => root.querySelector(`#${id}`);
  const slider = get("sail-angle");
  const scene = get("sail-scene");
  const handle = get("sail-handle");
  const presets = Array.from(root.querySelectorAll("[data-sail-preset]"));
  const reset = get("sail-reset");
  const initialAngle = Number(slider.defaultValue);
  let activePointer = null;

  function render(angle) {
    const state = idealSail(angle);
    const geometry = sailGeometry(angle);
    const signedAngle = `${angle > 0 ? "+" : ""}${angle}°`;
    slider.value = String(angle);
    slider.setAttribute("aria-valuetext", `${angle} degrees from face-on${Math.abs(angle) === 90 ? ", edge-on" : angle === 0 ? ", facing the Sun" : ""}`);
    get("sail-angle-value").textContent = signedAngle;
    get("sail-total").textContent = percent(state.total);
    get("sail-radial").textContent = percent(state.radial);
    get("sail-sideways").textContent = percent(state.sideways, true);

    get("sail-sheet").setAttribute("transform", `translate(${SAIL_VIEW.x} ${SAIL_VIEW.y}) rotate(${-angle})`);
    handle.setAttribute("transform", `translate(${geometry.handle.x} ${geometry.handle.y})`);
    get("sail-normal-line").setAttribute("x2", geometry.handle.x);
    get("sail-normal-line").setAttribute("y2", geometry.handle.y);
    const arrow = get("sail-force-arrow");
    arrow.setAttribute("x2", geometry.force.x);
    arrow.setAttribute("y2", geometry.force.y);
    arrow.setAttribute("stroke-width", geometry.forceStroke);
    get("sail-force-head").setAttribute("markerWidth", geometry.forceHeadSize);
    get("sail-force-head").setAttribute("markerHeight", geometry.forceHeadSize);
    arrow.setAttribute("visibility", state.total === 0 ? "hidden" : "visible");
    const components = get("sail-components");
    components.setAttribute("d", `M${SAIL_VIEW.x} ${SAIL_VIEW.y}H${geometry.radial.x}V${geometry.force.y}`);
    components.setAttribute("stroke-width", Math.min(2, geometry.forceStroke));
    components.setAttribute("visibility", state.total === 0 ? "hidden" : "visible");

    const arc = get("sail-angle-arc");
    arc.setAttribute("d", `M${SAIL_VIEW.x + SAIL_VIEW.arcRadius} ${SAIL_VIEW.y} A${SAIL_VIEW.arcRadius} ${SAIL_VIEW.arcRadius} 0 0 ${geometry.arcSweep} ${geometry.arcEnd.x} ${geometry.arcEnd.y}`);
    arc.setAttribute("visibility", angle === 0 ? "hidden" : "visible");
    const halfAngle = angle * Math.PI / 360;
    const annotation = get("sail-angle-annotation");
    annotation.textContent = signedAngle;
    annotation.setAttribute("x", SAIL_VIEW.x + 55 * Math.cos(halfAngle));
    annotation.setAttribute("y", SAIL_VIEW.y - 55 * Math.sin(halfAngle) + (angle < 0 ? 18 : -8));

    let observation;
    if (angle === 0) observation = "Face-on: the strongest push is directly away from the Sun.";
    else if (Math.abs(angle) === 90) observation = "Edge-on: the light-pressure push is zero in this ideal model.";
    else if (angle > 0) observation = "Positive tilt adds a positive sideways component while reducing the total push.";
    else observation = "Negative tilt reverses the sideways component. The sail still pushes outward.";
    // Announce a changed physical regime, rather than three rapidly changing
    // readouts on every slider step. The range itself exposes the exact angle.
    if (get("sail-observation").textContent !== observation) get("sail-observation").textContent = observation;
    get("sail-svg-description").textContent = `Sunlight travels left to right. Sail-normal angle ${angle} degrees. Total acceleration ${percent(state.total)}, outward component ${percent(state.radial)}, sideways component ${percent(state.sideways, true)}, relative to face-on. The sail surface is perpendicular to the normal. This is not a flight path.`;
    for (const preset of presets) preset.setAttribute("aria-pressed", String(Number(preset.dataset.sailPreset) === angle));
  }

  slider.addEventListener("input", () => render(Number(slider.value)));
  for (const preset of presets) preset.addEventListener("click", () => render(Number(preset.dataset.sailPreset)));
  reset.addEventListener("click", () => render(initialAngle));

  function angleFromPointer(event) {
    const transform = scene.getScreenCTM();
    if (!transform) return;
    const local = new DOMPoint(event.clientX, event.clientY).matrixTransform(transform.inverse());
    const dx = local.x - SAIL_VIEW.x;
    const dy = SAIL_VIEW.y - local.y;
    // A pointer at the sail centre has no defined angle; retain the last state.
    if (Math.hypot(dx, dy) < 10) return;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    render(Math.round(Math.max(-90, Math.min(90, angle))));
  }

  handle.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    activePointer = event.pointerId;
    handle.setPointerCapture(event.pointerId);
    handle.classList.add("is-dragging");
    slider.focus({ preventScroll: true });
    event.preventDefault();
    angleFromPointer(event);
  });
  handle.addEventListener("pointermove", (event) => {
    if (event.pointerId === activePointer) angleFromPointer(event);
  });
  function finishDrag(event) {
    if (event.pointerId !== activePointer) return;
    if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
    activePointer = null;
    handle.classList.remove("is-dragging");
  }
  handle.addEventListener("pointerup", finishDrag);
  handle.addEventListener("pointercancel", finishDrag);
  handle.addEventListener("lostpointercapture", () => {
    activePointer = null;
    handle.classList.remove("is-dragging");
  });

  render(initialAngle);
  slider.disabled = false;
  reset.disabled = false;
  for (const preset of presets) preset.disabled = false;
}
