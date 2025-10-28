import Beams from "@/components/cool/FaultyGrid";
import LandingPage from "../components/LandingPage";

export default function Home() {
  return (
    <main className="relative w-full h-screen ">
      <LandingPage />
      <div className="bg-gradient-to-t from-black to-transparent z-[1] absolute inset-0 pointer-events-none"></div>
      <Beams
        beamWidth={2}
        beamHeight={15}
        beamNumber={10}
        lightColor="#f00fff"
        speed={2}
        noiseIntensity={1.75}
        scale={0.3}
        rotation={135}
      />
    </main>
  );
}
