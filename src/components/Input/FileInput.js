import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FILE_SIZE, SUPPORTED_FORMATS } from "../../lib/helpers";

const InputFile = ({ label, setImageFile, ...props }) => {
  const [error, setError] = useState(null);

  const inputFileHandler = (event) => {
    const image = event.target.files[0];

    if (image.size > FILE_SIZE) {
      setError("Image size is too large");
    } else if (!SUPPORTED_FORMATS.includes(image.type)) {
      console.log(image.name, image.type);
      setError(`Only [${[...SUPPORTED_FORMATS]}] formats are supported`);
    } else {
      setImageFile(event.target.files[0]);
    }
  };

  return (
    <FormControl>
      <FormLabel>{label || props.id || props.name}</FormLabel>
      <Input type="file" onChange={inputFileHandler} {...props} />
      {error && <Text color="red">{error}</Text>}
    </FormControl>
  );
};

export default InputFile;
