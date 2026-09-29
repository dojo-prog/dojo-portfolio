import GradientWaves from "../GradientWaves";
import { useTheme } from "@/app/providers/ThemeProvider";

const GradientWavesBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <GradientWaves
      horizonColor={isDark ? "#020617" : "#F8FAFC"}
      waveColor={isDark ? "#0B2A6F" : "#0038B8"}
      crestColor={isDark ? "#1E40AF" : "#002B8F"}
      speed={0.4}
      amplitude={2.5}
      waveScale={0.6}
      waveRatio={0.9}
      swell={35}
      turbulence={20}
      tilt={1.11}
      zoom={1}
      height={5.5}
      fogDepth={15}
      detail="medium"
      brightness={1}
      opacity={1}
      mouseInteraction={false}
      parallaxStrength={0.5}
      grain
      grainIntensity={0.05}
    />
  );
};

export default GradientWavesBackground;
