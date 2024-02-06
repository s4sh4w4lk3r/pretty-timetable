"use client";
import { SubGroup } from "@/types/graphql";
import useGroup from "@/hooks/useGroup";
import { Button, Card, HStack, Menu, MenuButton, MenuItem, MenuList, Text, UseToastOptions, useToast } from "@chakra-ui/react";

type Props = {
    id: number;
    name: string;
};

const toastOptions: UseToastOptions = {
    title: "Настройки группы сохранены.",
    description: "Теперь вы можете просмотреть расписание.",
    status: "success",
    duration: 5000,
    isClosable: true,
};

export default function Group(props: Props) {
    const { name, id } = props;
    const { setGroup } = useGroup();
    const toast = useToast();

    return (
        <Card
            h={"50px"}
            bgColor={"purple.400"}
            justifyContent={"center"}
            p={"20px"}
            minW={"350px"}
        >
            <HStack justifyContent={"space-between"}>
                <Text> {name}</Text>
                <Menu>
                    <MenuButton as={Button}>Выбрать</MenuButton>
                    <MenuList>
                        <MenuItem
                            onClick={() => {
                                setGroup({ groupId: id, subgroup: SubGroup.FirstGroup });
                                toast(toastOptions);
                            }}
                            value={1}
                        >
                            1-ая подгруппа
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                setGroup({ groupId: id, subgroup: SubGroup.SecondGroup });
                                toast(toastOptions);
                            }}
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
