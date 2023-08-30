export function getPositionFromCenter(evt) {
  const bb = evt.target.getBoundingClientRect();
  return {x: evt.clientX - bb.left - 0.5 * bb.width,
          y: evt.clientY - bb.top - 0.5 * bb.height};
}

export function getAngleDegrees(evt) {
  const { x, y } = getPositionFromCenter(evt);
  const r = Math.sqrt(x**2 + y**2);
  if (Math.abs(r) > 1e-3) {
    if (x > 0) {
      return Math.acos(-y/r)*180/Math.PI;
    } else {
      return -Math.acos(-y/r)*180/Math.PI;
    }
  } else {
    return null;
  }
}
