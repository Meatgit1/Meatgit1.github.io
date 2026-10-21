import test from "node:test";
import assert from "node:assert/strict";
import { idealSail, sailGeometry, percent, SAIL_VIEW } from "../assets/sail-model.mjs";

const close = (actual, expected, tolerance = 1e-10) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);

test("independent analytic reference cases", () => {
  for (const [angle, total, radial, sideways] of [
    [0, 1, 1, 0], [30, .75, .649519052838329, .375],
    [-30, .75, .649519052838329, -.375],
    [45, .5, .353553390593274, .353553390593274],
    [60, .25, .125, .216506350946110], [90, 0, 0, 0], [-90, 0, 0, 0]
  ]) {
    const state = idealSail(angle);
    close(state.total, total); close(state.radial, radial); close(state.sideways, sideways);
  }
});

test("vector magnitude, outward hemisphere and mirror symmetry across all slider values", () => {
  for (let angle = -90; angle <= 90; angle += 1) {
    const state = idealSail(angle), mirrored = idealSail(-angle);
    assert.ok(state.radial >= 0 && state.total >= 0 && state.total <= 1);
    close(Math.hypot(state.radial, state.sideways), state.total);
    close(state.total, mirrored.total); close(state.radial, mirrored.radial); close(state.sideways, -mirrored.sideways);
  }
});

test("sideways maximum is a local force maximum, not a trajectory optimum", () => {
  const angle = Math.atan(1 / Math.sqrt(2)) * 180 / Math.PI;
  const state = idealSail(angle);
  close(state.total, 2 / 3); close(state.sideways, 2 / (3 * Math.sqrt(3)));
  assert.ok(state.sideways > idealSail(angle - .1).sideways && state.sideways > idealSail(angle + .1).sideways);
});

test("SVG sheet stays perpendicular to its normal and force length reflects magnitude", () => {
  for (const angle of [-90, -60, -30, 0, 30, 60, 90]) {
    const g = sailGeometry(angle), { x, y } = SAIL_VIEW;
    const normal = [g.handle.x - x, g.handle.y - y];
    const surface = [g.sheetTip.x - x, g.sheetTip.y - y];
    close(normal[0] * surface[0] + normal[1] * surface[1], 0, 1e-9);
    close(Math.hypot(g.force.x - x, g.force.y - y), SAIL_VIEW.forceScale * g.model.total);
    if (angle > 0 && angle < 90) assert.ok(g.force.y < y);
    if (angle < 0 && angle > -90) assert.ok(g.force.y > y);
    if (Math.abs(angle) === 90) { close(g.force.x, x); close(g.force.y, y); }
  }
});

test("readouts preserve signs without negative zero", () => {
  assert.equal(percent(.375, true), "+37.5%");
  assert.equal(percent(-.375, true), "-37.5%");
  assert.equal(percent(-1e-16, true), "0.0%");
});

test("near edge-on arrowheads cannot exaggerate or reverse the shrinking force", () => {
  for (let angle = -90; angle <= 90; angle += 1) {
    const g = sailGeometry(angle);
    close(g.forceLength, Math.hypot(g.force.x - SAIL_VIEW.x, g.force.y - SAIL_VIEW.y));
    assert.ok(g.forceHeadSize <= g.forceLength * .35);
    assert.ok(g.forceHeadSize <= 14 && g.forceStroke <= 3);
    assert.ok(g.forceStroke <= g.forceLength / 4);
    if (Math.abs(angle) === 90) assert.equal(g.forceHeadSize, 0);
  }
});

test("invalid input cannot produce a nonphysical public diagram", () => {
  for (const angle of [NaN, Infinity, -Infinity, 91, -91, "35", null]) assert.throws(() => idealSail(angle), RangeError);
});
