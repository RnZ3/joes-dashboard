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
import { api } from "~/utils/api";

const Read: NextPage = () => {
  const poolId = 2; // freshBeets pool id = 2
  const levelInfo = api.relic.getLevelInfo.useQuery({ poolId }).data?.levelInfo;

  if (levelInfo) {
    return (
      <>
        <Card m={12} p={6}>
          <Heading mb={4} alignSelf="center">
            maBEETS voting power
          </Heading>
          <Table size="sm" variant="striped" colorScheme="blue">
            <Thead>
              <Tr>
                <Th isNumeric>Level</Th>
                <Th isNumeric>Weight</Th>
                <Th isNumeric>min age [days]</Th>
                <Th isNumeric>total fBEETS</Th>
                <Th isNumeric>total voting power</Th>
              </Tr>
            </Thead>
            <Tbody>
              {levelInfo &&
                levelInfo.multipliers.map((mul, index) => {
                  return (
                    <Tr key={index}>
                      <Td isNumeric>{index}</Td>
                      <Td isNumeric>{mul}</Td>
                      <Td isNumeric>
                        {(levelInfo.requiredMaturities[index] || 0) / 86400}
                      </Td>
                      <Td isNumeric>
                        {Math.round(
                          levelInfo.balance[index] || 0
                        ).toLocaleString()}
                      </Td>
                      <Td isNumeric>
                        {Math.round(
                          ((levelInfo.balance[index] || 0) * mul) / 100
                        ).toLocaleString()}
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td isNumeric>
                  {levelInfo &&
                    Math.round(
                      levelInfo.balance.reduce((sum, cur) => sum + cur, 0)
                    ).toLocaleString()}
                </Td>
                <Td isNumeric>
                  {levelInfo &&
                    Math.round(
                      levelInfo.balance.reduce(
                        (sum, cur, index) =>
                          sum +
                          (cur * (levelInfo.multipliers[index] || 0)) / 100,
                        0
                      )
                    ).toLocaleString()}
                </Td>
              </Tr>
            </Tfoot>
          </Table>
          <Text as="b" alignSelf="flex-end" m={6}>
            Quorum suggestion: 5% of total Voting Power:{" "}
            {levelInfo &&
              Math.round(
                levelInfo.balance.reduce(
                  (sum, cur, index) =>
                    sum + (cur * (levelInfo.multipliers[index] || 0)) / 100,
                  0
                ) * 0.05
              ).toLocaleString()}
          </Text>
        </Card>
      </>
    );
  }
};
export default Read;
