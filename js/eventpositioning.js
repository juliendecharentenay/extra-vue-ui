export function getPositionFromCenter(evt) {
  // const bb = evt.target.getBoundingClientRect();
  const {x: cx, y: cy} = getTargetCenter(evt);
  return {x: evt.clientX - cx,  // bb.left - 0.5 * bb.width,
          y: evt.clientY - cy}; // bb.top - 0.5 * bb.height};
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

export function getDistanceAsRatio(evt) {
  const tr = getTargetRadius(evt);
  if (tr > 1e-3) {
    return getDistanceFromCenter(evt)/tr;
  } else {
    return 1.0;
  }
}

export function getDistanceFromCenter(evt) {
  const { x, y } = getPositionFromCenter(evt);
  return Math.sqrt(x**2 + y**2);
}

function getTargetCenter(evt) {
  const bb = evt.target.getBoundingClientRect();
  return {x: bb.left + 0.5 * bb.width,
          y: bb.top + 0.5 * bb.height};
}

function getTargetRadius(evt) {
  const bb = evt.target.getBoundingClientRect();
  return Math.sqrt((0.5*bb.width)**2 + (0.5*bb.height)**2);
}

