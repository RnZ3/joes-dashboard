import {
  Card,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  Image,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { api } from "~/utils/api";
import { CustomConnectButton } from "~/components/CustomConnectButton";

import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

const Read: NextPage = () => {
  const poolId = 2; // freshBeets pool id = 2
  const account = useAccount();

  console.log(account.address, account.isConnected);

  const [myAddr, setMyAddr] = useState((account.address || "") as string);
  useEffect(() => {
    setMyAddr((account.address || "") as string);
  }, [account]);

  const pendingRewards = api.relic.pendingRewardsOfOwner.useQuery(
    {
      address: myAddr,
    },
    { enabled: myAddr !== "" }
  ).data?.rewards;

  const myBalance = api.relic.balanceOf.useQuery(
    { address: myAddr },
    { enabled: myAddr !== "" }
  ).data?.balance;

  const emissionCurveContract = api.relic.emissionCurve
    .useQuery()
    .data?.address.toString();

  const levelInfo = api.relic.getLevelInfo.useQuery({ poolId }).data?.levelInfo;

  const relicPositions = api.relic.relicPositionsOfOwner.useQuery(
    { owner: myAddr },
    { enabled: myAddr !== "" }
  ).data;

  const relicList = api.relic.relicsByAddress.useQuery(
    { address: myAddr },
    { enabled: myAddr !== "" }
  ).data?.list;

  if (account.isConnected && account.address) {
    return (
      <>
        <Card m={12} p={6}>
          <Text>for Address {myAddr} found:</Text>
          <Text>{myBalance} Relics</Text>
        </Card>
        <Card m={12} p={6}>
          <Text>Emission Curve Contract Address:</Text>
          <Text>{emissionCurveContract}</Text>
        </Card>
        <Card m={12} p={6}>
          <Text>pendingRewardsOfOwner {myAddr}:</Text>
          <Table size="sm" variant="striped" colorScheme="blue" maxW={100}>
            <Thead>
              <Tr>
                <Th isNumeric>Relic ID</Th>
                <Th isNumeric>Pool ID</Th>
                <Th isNumeric>pending Reward</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pendingRewards &&
                pendingRewards.map((rew, index) => {
                  return (
                    <Tr key={index}>
                      <Td isNumeric>{rew.relicId}</Td>
                      <Td isNumeric>{rew.poolId}</Td>
                      <Td isNumeric>
                        {rew.pendingReward.toLocaleString(undefined, {
                          maximumFractionDigits: 3,
                        })}
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Td></Td>
                <Td></Td>
                <Td isNumeric>
                  {pendingRewards &&
                    pendingRewards
                      .reduce((sum, cur) => sum + cur.pendingReward, 0)
                      .toLocaleString(undefined, { maximumFractionDigits: 3 })}
                </Td>
              </Tr>
            </Tfoot>
          </Table>
        </Card>
        <Card m={12} p={6}>
          <Text>relic Infos for Address {myAddr}:</Text>
          <Table size="sm" variant="striped" colorScheme="blue">
            <Thead>
              <Tr>
                <Th isNumeric>Relic ID</Th>
                <Th isNumeric>Level</Th>
                <Th isNumeric>Next Level</Th>
                <Th isNumeric>is upgradeable?</Th>
                <Th isNumeric>amount fBEETS</Th>
                <Th isNumeric>pending Reward</Th>
                <Th isNumeric>payed Reward</Th>
                <Th isNumeric>maBEETS voting power</Th>
                <Th isNumeric>image URL</Th>
              </Tr>
            </Thead>
            <Tbody>
              {relicList &&
                relicList.map((rel, index) => {
                  return (
                    <Tr key={index}>
                      <Td isNumeric>{rel.relicId}</Td>
                      <Td isNumeric>{rel.level}</Td>
                      <Td isNumeric>{rel.nextLevel}</Td>
                      <Td isNumeric>{rel.isUpgradeable ? "yes" : "no"}</Td>
                      <Td isNumeric>
                        {rel.amountFbeets.toLocaleString(undefined, {
                          maximumFractionDigits: 3,
                        })}
                      </Td>
                      <Td isNumeric>
                        {rel.rewardPending.toLocaleString(undefined, {
                          maximumFractionDigits: 3,
                        })}
                      </Td>
                      <Td isNumeric>
                        {rel.rewardPayed.toLocaleString(undefined, {
                          maximumFractionDigits: 3,
                        })}
                      </Td>
                      <Td isNumeric>
                        {rel.maBeetsVP.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </Td>
                      <Td isNumeric>
                        <Image
                          src={rel.imageUrl as string}
                          alt="level image"
                          boxSize="56px"
                        />
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </Card>
      </>
    );
  }
  return (
    <Card m={12} p={6}>
      <CustomConnectButton />
    </Card>
  );
};

export default Read;
