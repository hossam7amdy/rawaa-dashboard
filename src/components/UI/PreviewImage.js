import { Image } from "@chakra-ui/react";

const PreviewImage = ({ image, ...props }) => {
  return (
    <Image
      fallbackSrc="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
      rounded="lg"
      boxSize="100px"
      justifyContent="center"
      src={image}
      alt="image placeholder"
      {...props}
    />
  );
};

export default PreviewImage;
