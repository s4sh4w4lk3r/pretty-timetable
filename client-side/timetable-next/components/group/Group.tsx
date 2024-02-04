"use client";
import { SubGroup } from "@/fetching/graphql/__generated__/graphql";
import useGroup from "@/hooks/useGroup";
import { Button, Card, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";

type Props = {
    id: number;
    name: string;
};
export default function Group(props: Props) {
    const { name, id } = props;
    const { setGroup } = useGroup();
    return (
        <Card
            h={"50px"}
            bgColor={"purple.400"}
            justifyContent={"center"}
            p={"15px"}
        >
            <HStack justifyContent={"space-between"}>
                <Text> {name}</Text>
                <Menu>
                    <MenuButton as={Button}>Выбрать</MenuButton>
                    <MenuList>
                        <MenuItem
                            onClick={() => {
                                setGroup({ groupId: id, subgroup: SubGroup.FirstGroup });
                            }}
                            value={1}
                        >
                            1-ая подгруппа
                        </MenuItem>
                        <MenuItem
                            onClick={() => setGroup({ groupId: id, subgroup: SubGroup.SecondGroup })}
                            value={2}
                        >
                            2-ая подгруппа
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Card>
    );
}
