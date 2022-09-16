import { Image } from "@chakra-ui/react";

const PreviewImage = ({ image }) => {
  return (
    <Image
      rounded="full"
      boxSize="100px"
      justifyContent="center"
      src={
        image ||
        "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
      }
      alt="image placeholder"
    />
  );
};

export default PreviewImage;
