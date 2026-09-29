import GradientWaves from "../GradientWaves";
import { useTheme } from "@/app/providers/ThemeProvider";

const GradientWavesBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <GradientWaves
      horizonColor={isDark ? "#050B1A" : "#F8FAFC"}
      waveColor={isDark ? "#1D4ED8" : "#003BFF"}
      crestColor={isDark ? "#60A5FA" : "#1E40FF"}
      speed={0.2}
      amplitude={2}
      waveScale={0.6}
      waveRatio={0.9}
      swell={25}
      turbulence={10}
      tilt={1.11}
      zoom={1}
      height={5.5}
      fogDepth={15}
      detail="low"
      brightness={1}
      opacity={1}
      mouseInteraction={false}
      grain={false}
    />
  );
};

export default GradientWavesBackground;
