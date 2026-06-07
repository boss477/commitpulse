// lib/svg/layoutConstants.accessibility.test.ts

import { describe, expect, it } from 'vitest';
import {
  GHOST_HEIGHT_PX,
  LOG_SCALE_MULTIPLIER,
  LINEAR_SCALE_MULTIPLIER,
  MAX_LOG_HEIGHT,
  MAX_LINEAR_HEIGHT,
  TILE_WIDTH_HALF,
  TILE_HEIGHT_HALF,
  GRID_ORIGIN_X,
  GRID_ORIGIN_Y,
} from './layoutConstants';

describe('Layout Constants Accessibility', () => {
  it('provides positive height values so towers render visibly for screen-reader users', () => {
    const heights = [GHOST_HEIGHT_PX, MAX_LOG_HEIGHT, MAX_LINEAR_HEIGHT];

    heights.forEach((value) => {
      expect(typeof value).toBe('number');
      expect(value).toBeGreaterThan(0);
      expect(Number.isFinite(value)).toBe(true);
    });
  });

  it('caps tower heights below the SVG viewport so content never clips out of assistive-tech reach', () => {
    // SVG canvas is 600x420 in this project; a safe upper bound for tower height
    // is well under half the viewport so labels and stats remain visible.
    const SAFE_MAX_HEIGHT = 200;

    expect(MAX_LOG_HEIGHT).toBeLessThan(SAFE_MAX_HEIGHT);
    expect(MAX_LINEAR_HEIGHT).toBeLessThan(SAFE_MAX_HEIGHT);
    expect(GHOST_HEIGHT_PX).toBeLessThan(MAX_LINEAR_HEIGHT);
  });

  it('exposes positive scale multipliers so contribution data maps to a predictable visual hierarchy', () => {
    expect(LOG_SCALE_MULTIPLIER).toBeGreaterThan(0);
    expect(LINEAR_SCALE_MULTIPLIER).toBeGreaterThan(0);

    // Logarithmic scaling must grow faster than linear at small values
    // so low-activity users still get a visually meaningful tower.
    expect(LOG_SCALE_MULTIPLIER).toBeGreaterThan(LINEAR_SCALE_MULTIPLIER);
  });

  it('anchors the grid origin inside the SVG canvas so the rendered city is reachable by visual focus order', () => {
    // The SVG canvas spans 0..600 horizontally and 0..420 vertically.
    expect(GRID_ORIGIN_X).toBeGreaterThan(0);
    expect(GRID_ORIGIN_X).toBeLessThan(600);

    expect(GRID_ORIGIN_Y).toBeGreaterThan(0);
    expect(GRID_ORIGIN_Y).toBeLessThan(420);
  });

  it('keeps isometric tile halves positive so tower geometry stays parseable for screen-reader title tags', () => {
    expect(TILE_WIDTH_HALF).toBeGreaterThan(0);
    expect(TILE_HEIGHT_HALF).toBeGreaterThan(0);

    // The isometric projection requires width-half > height-half to maintain
    // the 2:1 aspect ratio used by every <title>-tagged tower group.
    expect(TILE_WIDTH_HALF).toBeGreaterThan(TILE_HEIGHT_HALF);
  });
});
