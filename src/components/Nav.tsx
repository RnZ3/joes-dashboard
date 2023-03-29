import { Center, Button, HStack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "~/components/ColorModeSwitcher";
import { CustomConnectButton } from "~/components/CustomConnectButton";
import Link from "next/link";

export const Nav = () => {
  return (
    <>
      <Center mt={7}>
        <HStack>
          <Button>
            <Link href="/relic">relic</Link>
          </Button>
          <Button>
            <Link href="/read">read</Link>
          </Button>
          <Button>
            <Link href="/vp">mabeets vp</Link>
          </Button>
          <CustomConnectButton />
          <ColorModeSwitcher />
        </HStack>
      </Center>
    </>
  );
};

export default Nav;
