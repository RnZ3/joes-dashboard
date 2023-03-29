import { Box } from "@chakra-ui/react";
import Image from "next/image";
import fbeet from "../../public/fBEETS.png";

export const FbSmall = () => {
  return (
      <Image
        alt="fbeet image"
        src={fbeet}
        placeholder="blur"
        quality={90}
        sizes="100vw"
        style={{
display: "inline-block",
verticalAlign: "text-bottom",
          opacity: "100%",
          width: "20px",
          height: "20px",
        }}
      />
  );
};

export const FbBack = () => {
  return (
    <Box>
      <Image
        alt="fbeet background"
        src={fbeet}
        placeholder="blur"
        quality={90}
        sizes="100vw"
        style={{
          opacity: "10%",
          width: "100%",
          height: "100%",
          position: "fixed",
          margin: "auto",
          top: "0px",
          objectFit: "contain",
          zIndex: "-7",
        }}
      />
    </Box>
  );
};

export default FbBack
