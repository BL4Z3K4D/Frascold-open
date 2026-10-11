export const COOLING_TYPES = [
  'chillers',
  'freezers',
  'cryogenic',
  'condensers',
  'evaporators',
  'compressors',
] as const;

export type CoolingType = (typeof COOLING_TYPES)[number];
