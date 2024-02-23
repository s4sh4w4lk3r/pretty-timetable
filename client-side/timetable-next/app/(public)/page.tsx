"use client";
import { Box, Button, Center, Flex, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import timetableExampleImageDark from "@/public/timetableExamples/exampleDarkMode.png";
import timetableExampleImageLight from "@/public/timetableExamples/exampleLightMode.png";

export default function Home() {
    const buttonColorOnHover = useColorModeValue("purple.400", "purple.400");
    const exampleImage = useColorModeValue(timetableExampleImageLight, timetableExampleImageDark);

    return (
        <Center
            mt={24}
            mb={16}
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
                                    _hover={{
                                        background: buttonColorOnHover,
                                    }}
                                >
                                    Расписание занятий
                                </Button>
                            </Link>

                            <Link href={"/lessontimes"}>
                                <Button
                                    w={"100%"}
                                    bgColor={"purple.500"}
                                    color={"white"}
                                    _hover={{
                                        background: buttonColorOnHover,
                                    }}
                                >
                                    Расписание звонков
                                </Button>
                            </Link>
                        </Flex>
                    </VStack>
                </Box>

                <Box
                    borderWidth={2}
                    borderRadius={"7px"}
                >
                    <Image
                        priority={true}
                        src={exampleImage}
                        alt="Timetable Example"
                        height={520}
                        quality={80}
                        style={{ borderRadius: "7px" }}
                        placeholder="blur"
                    ></Image>
                </Box>
            </Flex>
        </Center>
    );
}
