// Linear lerp
export const linear = (a: number, b: number, c: number) => a + (b - a) * c;

// Ease In Quad
export const easeInQuad = (a: number, b: number, t: number) => a + (b - a) * (t * t);

// Ease Out Quad
export const easeOutQuad = (a: number, b: number, t: number) => a + (b - a) * (1 - (1 - t) * (1 - t));

// Ease In-Out Quad
export const easeInOutQuad = (a: number, b: number, t: number) => a + (b - a) * (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

// Ease In Cubic
export const easeInCubic = (a: number, b: number, t: number) => a + (b - a) * (t * t * t);

// Ease Out Cubic
export const easeOutCubic = (a: number, b: number, t: number) => a + (b - a) * (1 - Math.pow(1 - t, 3));

// Ease In-Out Cubic
export const easeInOutCubic = (a: number, b: number, t: number) => a + (b - a) * (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Ease In Sine
export const easeInSine = (a: number, b: number, t: number) => a + (b - a) * (1 - Math.cos((t * Math.PI) / 2));

// Ease Out Sine
export const easeOutSine = (a: number, b: number, t: number) => a + (b - a) * Math.sin((t * Math.PI) / 2);

// Ease In-Out Sine
export const easeInOutSine = (a: number, b: number, t: number) => a + (b - a) * (-(Math.cos(Math.PI * t) - 1) / 2);

// Ease Out Bounce
export const easeOutBounce = (a: number, b: number, t: number) => {
  const n1 = 7.5625;
  const d1 = 2.75;
  let bounce: number;

  if (t < 1 / d1) {
    bounce = n1 * t * t;
  } else if (t < 2 / d1) {
    t -= 1.5 / d1;
    bounce = n1 * t * t + 0.75;
  } else if (t < 2.5 / d1) {
    t -= 2.25 / d1;
    bounce = n1 * t * t + 0.9375;
  } else {
    t -= 2.625 / d1;
    bounce = n1 * t * t + 0.984375;
  }

  return a + (b - a) * bounce;
};

// Ease In Elastic
export const easeInElastic = (a: number, b: number, t: number) => {
  const c4 = (2 * Math.PI) / 3;
  if (t === 0) return a;
  if (t === 1) return b;
  return a + (b - a) * -(Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4));
};

const map = {
  linear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeOutBounce,
  easeInElastic,
} as const;

export type LerpFunctions = keyof typeof map;

export const useLerp = (type: LerpFunctions) => {
  return map[type] ?? linear; // fallback to linear
};
