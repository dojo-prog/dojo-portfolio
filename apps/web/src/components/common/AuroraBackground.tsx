import Aurora from "../Aurora";

const AuroraBackground = () => {
  return (
    <Aurora
      colorStops={["#050B1A", "#1D4ED8", "#60A5FA"]}
      blend={0.5}
      amplitude={0.5}
      speed={0.5}
    />
  );
};

export default AuroraBackground;
