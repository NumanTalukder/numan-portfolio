/**
 * Theme-aware atmosphere palette for the voyage scene. The CSS gradient (on the
 * canvas container) is the sky; the rest feed the WebGL materials. Dark =
 * moonlit night sea; light = soft dawn.
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
  moonColor: string; // the moon disc
  sea: string;
  seaDeep: string;
  foam: string; // wave crests / wake
  land: string;
  landLit: string;
  sand: string; // beach ring
  treeFoliage: string;
  treeTrunk: string;
  hull: string; // ship hull (wood)
  deck: string; // ship deck / lighter wood
  sail: string;
  lantern: string; // warm ship light
  bird: string;
  fish: string;
  ambient: number; // ambient light intensity
  moon: number; // directional light intensity
};

export const PALETTES: Record<"dark" | "light", Palette> = {
  dark: {
    gradient:
      "radial-gradient(130% 90% at 50% -12%, #15294f 0%, #0B1120 48%, #04060d 100%)",
    fog: "#060b18",
    fogNear: 14,
    fogFar: 100,
    star: "#bcd6f7",
    starOpacity: 0.9,
    starAdditive: true,
    core: "#eaf6ff",
    glow: "#38bdf8",
    moonColor: "#dfeaff",
    sea: "#0c2438",
    seaDeep: "#061425",
    foam: "#9fc6e8",
    land: "#163844",
    landLit: "#356069",
    sand: "#6a7a6c",
    treeFoliage: "#1c5040",
    treeTrunk: "#2e2418",
    hull: "#5a4128",
    deck: "#7c5a36",
    sail: "#e8f0fb",
    lantern: "#ffc066",
    bird: "#33455f",
    fish: "#8fb6d6",
    ambient: 0.55,
    moon: 1.15,
  },
  light: {
    gradient:
      "radial-gradient(130% 95% at 50% 112%, #fde3c6 0%, #f3e0e8 24%, #e6eefb 54%, #eef3fb 80%, #F8FAFC 100%)",
    fog: "#dde7f4",
    fogNear: 18,
    fogFar: 120,
    star: "#7c93b4",
    starOpacity: 0.45,
    starAdditive: false,
    core: "#fff4e2",
    glow: "#f6b35a",
    moonColor: "#fff3e0",
    sea: "#bcd0e8",
    seaDeep: "#9fbbdb",
    foam: "#ffffff",
    land: "#9ab98f",
    landLit: "#c4d8a8",
    sand: "#e6d6b0",
    treeFoliage: "#5f9a55",
    treeTrunk: "#6b4f38",
    hull: "#7a5a3e",
    deck: "#9c7c57",
    sail: "#fff6ea",
    lantern: "#ffcf8a",
    bird: "#46566f",
    fish: "#9fc0d8",
    ambient: 0.9,
    moon: 1.0,
  },
};
