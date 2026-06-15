import { Nav } from "@/components/Nav";
import { FallbackLayer } from "@/components/voyage/FallbackLayer";
import { Logbook } from "@/components/voyage/Logbook";
import { VoyageMount } from "@/components/voyage/VoyageMount";

export default function Home() {
  return (
    <div id="top">
      <Nav />
      {/* SSR baseline + small-screen / reduced-motion / no-WebGL experience. */}
      <FallbackLayer>
        <Logbook />
      </FallbackLayer>
      {/* The interactive 3D voyage, mounted only on capable clients. */}
      <VoyageMount />
    </div>
  );
}
