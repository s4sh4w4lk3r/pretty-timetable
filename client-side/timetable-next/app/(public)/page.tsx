import { Box, Button, Center, Container, Divider, Flex, HStack, StackDivider, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import ttImg from "@/public/timetableExample.png";
import Link from "next/link";

export default function Home() {
    return (
        <Center
            mt={24}
            mx={5}
        >
            <Flex
                direction={["column", "column", "column", "row", "row"]}
                gap={5}
            >
                <Box maxW={"md"}>
                    <VStack>
                        <Text fontSize={42}>Когда расписание стало удобнее</Text>
                        <Text fontSize={20}>
                            {`Pretty Timetable поможет студентам ориентироваться в расписании, 
                    избавит от необходимости вычислять четную/нечетную неделю и будет
                    сразу показывать изменения в расписании.`}
                        </Text>

                        <Flex
                            wrap={"wrap"}
                            gap={5}
                            w={"100%"}
                            justifyContent={"center"}
                            mt={7}
                            direction={["column", "column", "column", "row", "row"]}
                        >
                            <Link href={"/timetables"}>
                                <Button
                                    w={"100%"}
                                    bgColor={"purple.500"}
                                    color={"white"}
                                >
                                    Расписание занятий
                                </Button>
                            </Link>

                            <Link href={"/lessontimes"}>
                                <Button
                                    w={"100%"}
                                    bgColor={"purple.500"}
                                    color={"white"}
                                >
                                    Расписание звонков
                                </Button>
                            </Link>
                        </Flex>
                    </VStack>
                </Box>

                <Box>
                    <Image
                        priority={false}
                        src={ttImg}
                        alt="Timetable Example"
                        height={450}
                        style={{ borderRadius: "7px" }}
                    ></Image>
                </Box>
            </Flex>
        </Center>
    );
}
