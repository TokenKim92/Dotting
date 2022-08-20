export const PI2 = Math.PI * 2;

export function distance(pos1, pos2) {
  const x = pos2.x - pos1.x;
  const y = pos2.y - pos1.y;

  return Math.sqrt(x * x + y * y);
}

export function collide(pos1, pos2, radius) {
  return distance(pos1, pos2) <= radius;
}

export function getBWValue(r, g, b, isReversed) {
  const detect = 2;
  if (!isReversed) {
    return 255 - Math.floor((r + g + b) / detect);
  } else {
    return Math.floor((r + g + b) / detect);
  }
}
