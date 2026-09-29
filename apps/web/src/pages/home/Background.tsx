import { useTheme } from "@/app/providers/ThemeProvider";
import GradientWaves from "@/components/GradientWaves";

const Background = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 z-0">
      <GradientWaves
        horizonColor={isDark ? "#030712" : "#F8FAFC"}
        waveColor={isDark ? "#1E40AF" : "#0026CC"}
        crestColor={isDark ? "#3B82F6" : "#1740FF"}
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
        mouseInteraction
        parallaxStrength={0.5}
        grain
        grainIntensity={0.05}
      />
    </div>
  );
};

export default Background;
