/**
 * Theme-aware atmosphere palette for the voyage scene. The CSS gradient (on the
 * canvas container) is the sky; the rest are fed into the WebGL materials. Dark
 * = moonlit night sea; light = soft dawn.
 */
export type Palette = {
  gradient: string;
  fog: string;
  fogNear: number;
  fogFar: number;
  star: string;
  starOpacity: number;
  starAdditive: boolean;
  core: string; // north-star core
  glow: string; // north-star halo / beacons
  sea: string;
  seaDeep: string;
  land: string;
  landLit: string;
  sail: string;
  hull: string;
  ambient: number; // ambient light intensity
  moon: number; // directional light intensity
};

export const PALETTES: Record<"dark" | "light", Palette> = {
  dark: {
    gradient:
      "radial-gradient(130% 90% at 50% -12%, #15294f 0%, #0B1120 48%, #04060d 100%)",
    fog: "#060b18",
    fogNear: 12,
    fogFar: 95,
    star: "#bcd6f7",
    starOpacity: 0.9,
    starAdditive: true,
    core: "#eaf6ff",
    glow: "#38bdf8",
    sea: "#0c2034",
    seaDeep: "#06101e",
    land: "#13303a",
    landLit: "#2c5660",
    sail: "#dbe8fb",
    hull: "#0a1626",
    ambient: 0.5,
    moon: 1.1,
  },
  light: {
    gradient:
      "radial-gradient(130% 95% at 50% 112%, #fde3c6 0%, #f3e0e8 24%, #e6eefb 54%, #eef3fb 80%, #F8FAFC 100%)",
    fog: "#dde7f4",
    fogNear: 16,
    fogFar: 110,
    star: "#7c93b4",
    starOpacity: 0.45,
    starAdditive: false,
    core: "#fff4e2",
    glow: "#f6b35a",
    sea: "#bcd0e8",
    seaDeep: "#9fbbdb",
    land: "#9ab98f",
    landLit: "#c4d8a8",
    sail: "#fff6ea",
    hull: "#5a6b7d",
    ambient: 0.85,
    moon: 1.0,
  },
};
