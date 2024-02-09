"use client";
import { Button, Card, HStack, Menu, MenuButton, MenuItem, MenuList, Text, UseToastOptions, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

type Props = {
    id: number;
    name: string;
};

const toastOptions: UseToastOptions = {
    title: "Расписание выбрано.",
    description: "Сохраните страницу в закладки для удобства.",
    status: "success",
    duration: 5000,
    isClosable: true,
};

export default function Group(props: Props) {
    const { name, id } = props;
    const router = useRouter();
    const toast = useToast();

    return (
        <Card
            h={"50px"}
            bgColor={"purple.400"}
            justifyContent={"center"}
            p={5}
            minW={"350px"}
        >
            <HStack justifyContent={"space-between"}>
                <Text> {name}</Text>
                <Menu>
                    <MenuButton as={Button}>Выбрать</MenuButton>
                    <MenuList>
                        <MenuItem
                            onClick={() => {
                                toast(toastOptions);
                                router.push(`/${id}/first`);
                            }}
                            value={1}
                        >
                            1-ая подгруппа
                        </MenuItem>

                        <MenuItem
                            onClick={() => {
                                toast(toastOptions);
                                router.push(`/${id}/second`);
                            }}
                            value={2}
                        >
                            2-ая подгруппа
                        </MenuItem>

                        <MenuItem
                            onClick={() => {
                                toast(toastOptions);
                                router.push(`/${id}/`);
                            }}
                            value={0}
                        >
                            Общее
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </Card>
    );
}
