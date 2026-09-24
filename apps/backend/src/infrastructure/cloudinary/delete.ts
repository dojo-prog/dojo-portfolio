import { cloudinary } from "./cloudinary";

const deleteImage = async (publicId: string): Promise<void> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      throw new Error(`Cloudinary deletion failed: ${result.result}`);
    }
  } catch (error) {
    throw new Error("Cloudinary deletion failed", {
      cause: error,
    });
  }
};

export { deleteImage };
