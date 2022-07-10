export function distance(x1, y1, x2, y2) {
  const x = x2 - x1;
  const y = y2 - y1;

  return Math.sqrt(x * x + y * y);
}

export function collide(x1, y1, x2, y2, radius) {
  if (distance(x1, y1, x2, y2) <= radius) {
    return true;
  } else {
    return false;
  }
}

export function getBWValue(r, g, b, isReversed) {
  const detect = 2;
  if (!isReversed) {
    return 255 - Math.floor((r + g + b) / detect);
  } else {
    return Math.floor((r + g + b) / detect);
  }
}
