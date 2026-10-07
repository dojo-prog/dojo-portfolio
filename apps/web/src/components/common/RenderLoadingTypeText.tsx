import TextType from "../TextType";

const RenderLoadingTypeText = () => {
  return (
    <div className="absolute left-0 right-0 h-130 flex items-center justify-center z-10 text-center">
      <TextType
        text={["Render server is rebooting...", "Almost there..."]}
        className="mb-5 text-4xl font-bold uppercase tracking-[0.2em] text-primary italic"
      />
    </div>
  );
};

export default RenderLoadingTypeText;
