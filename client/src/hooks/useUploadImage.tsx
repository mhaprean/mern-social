import { useUploadImageMutation } from '../redux/apiSlice';

export const useUploadImage = (currentFile: File | null) => {
  const [uploadImage, responseUploadImage] = useUploadImageMutation();

  const handleImageUpload = async () => {
    if (!currentFile) {
      return '';
    }

    try {
      const formData = new FormData();
      formData.append('image', currentFile);

      const imageResponse = await uploadImage(formData).unwrap();

      return imageResponse.uploadedImage.secure_url;
    } catch (error) {
      console.log('image upload failed. ', error);
      return '';
    }
  };

  return { handleImageUpload };
};
