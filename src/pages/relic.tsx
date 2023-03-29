import {
  Box,
  Card,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import { CustomConnectButton } from "~/components/CustomConnectButton";
import { FbSmall } from "~/components/fbeet";
import { useAccount } from "wagmi";
import { api } from "~/utils/api";

const Relic: NextPage = () => {
  const account = useAccount();

  console.log(account.address, account.isConnected);

  return (
    <>
      <VStack m={5}>
        <Heading>Relic Tool</Heading>
        {(account.isConnected && <RelicDisplay />) || <CustomConnectButton />}
      </VStack>
    </>
  );
};

export default Relic;

const RelicDisplay = () => {
  const toast = useToast();

  const account = useAccount();

  const myAddr = (account?.address || "") as string;
  // const poolId = 2;

  const relicPositions = api.relic.relicPositionsOfOwner.useQuery(
    {
      owner: myAddr,
    },
    { enabled: myAddr !== "" }
  ).data;

  const relicList = api.relic.relicsByAddress.useQuery(
    { address: myAddr },
    { enabled: myAddr !== "" }
  ).data?.list;

  console.log(relicPositions);
  console.log(relicList);

  if (relicPositions?.level.ids.length === 0) {
    return (
      <>
        <Text>
          <FbSmall /> no relics
        </Text>
      </>
    );
  }

  return (
    <>
      <Card m={12} p={6}>
        <HStack>
          {relicPositions?.level.ids.map((rel, index) => {
            return (
              <Box key={index}>
                <Card m={12} p={6} w={300} variant="outline">
                  <Text as='b'>Relic #{rel}</Text>
                  <Divider m={3} />
                  <Text>
                    Level: {relicPositions.level.positions[index]?.level}
                  </Text>
                  <Text>
                    <FbSmall />{" "}
                    {relicPositions.level.positions[index]?.amount.toFixed(2)}
                  </Text>
                  <Text>
                    Entry:{" "}
                    {new Date(
                      (relicPositions.level.positions[index]?.entry || 0) * 1000
                    ).toDateString()}
                  </Text>
                  <Divider m={3} />
                  <HStack>
                    <Button
                      onClick={() =>
                        toast({
                          title: "Split",
                          description: `split relic #${rel}`,
                          status: "success",
                          duration: 5000,
                          isClosable: true,
                          position: "top",
                        })
                      }
                    >
                      Split
                    </Button>
                    <Button
                      onClick={() =>
                        toast({
                          title: "Merge",
                          description: `merge relic #${rel}`,
                          status: "success",
                          duration: 5000,
                          isClosable: true,
                          position: "top",
                        })
                      }
                    >
                      Merge
                    </Button>
                    <Button
                      onClick={() =>
                        toast({
                          title: "Transfer",
                          description: `transfer relic #${rel}`,
                          status: "success",
                          duration: 5000,
                          isClosable: true,
                          position: "top",
                        })
                      }
                    >
                      Transfer
                    </Button>
                  </HStack>
                </Card>
              </Box>
            );
          })}
        </HStack>
      </Card>
    </>
  );
};
