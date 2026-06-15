"use client";

import dynamic from "next/dynamic";

/**
 * Client-only mount for the WebGL scene. R3F needs the DOM, so the canvas is
 * dynamically imported with ssr:false. Until the chunk loads, the theme-aware
 * page/body background stands in — there is nothing to render server-side.
 */
const Scene = dynamic(() => import("./Scene").then((m) => m.Scene), {
  ssr: false,
});

export function SceneMount() {
  return <Scene />;
}
