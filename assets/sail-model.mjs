// Public ideal-sail force law, normalized to the face-on acceleration at a
// fixed Sun distance. This module contains no mission or thesis inputs.
// n = (cos(alpha), sin(alpha)); a/a0 = cos(alpha)^2 * n.
// Reference: Wawrzyniak & Howell (2011), section 2, equation (4).

export const SAIL_VIEW = Object.freeze({ x: 350, y: 210, forceScale: 130, handleRadius: 150, halfSheet: 67, arcRadius: 42 });

function clean(value) {
  return Math.abs(value) < 1e-12 ? 0 : value;
}

export function idealSail(angleDeg) {
  if (typeof angleDeg !== "number" || !Number.isFinite(angleDeg) || Math.abs(angleDeg) > 90) {
    throw new RangeError("Sail-normal angle must be a finite number between -90 and +90 degrees.");
  }
  const alpha = angleDeg * Math.PI / 180;
  const nx = clean(Math.cos(alpha));
  const ny = clean(Math.sin(alpha));
  const total = nx * nx;
  return Object.freeze({ angleDeg, nx, ny, total, radial: clean(total * nx), sideways: clean(total * ny) });
}

export function sailGeometry(angleDeg) {
  const model = idealSail(angleDeg);
  const { x, y, forceScale, handleRadius, halfSheet, arcRadius } = SAIL_VIEW;
  const forceLength = forceScale * model.total;
  // Physics uses +y upward. SVG uses +y downward, so every y component flips.
  return Object.freeze({
    model,
    forceLength,
    // Keep the arrowhead inside the vector as the sail approaches edge-on.
    forceHeadSize: Math.min(14, forceLength * 0.35),
    forceStroke: Math.min(3, forceLength / 4),
    force: { x: x + forceScale * model.radial, y: y - forceScale * model.sideways },
    radial: { x: x + forceScale * model.radial, y },
    handle: { x: x + handleRadius * model.nx, y: y - handleRadius * model.ny },
    sheetTip: { x: x - halfSheet * model.ny, y: y - halfSheet * model.nx },
    arcEnd: { x: x + arcRadius * model.nx, y: y - arcRadius * model.ny },
    arcSweep: angleDeg >= 0 ? 0 : 1
  });
}

export function percent(value, signed = false) {
  const rounded = Math.round(value * 1000) / 10;
  const number = Object.is(rounded, -0) ? 0 : rounded;
  const sign = signed && number > 0 ? "+" : "";
  return `${sign}${number.toFixed(1)}%`;
}
