/** One reveal, tied to native reading progress. No scene switching or exit choreography. */
export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function sceneAt(progress: number) {
  const p = clamp(progress);
  return { progress: p, spread: p * p * (3 - 2 * p) };
}
