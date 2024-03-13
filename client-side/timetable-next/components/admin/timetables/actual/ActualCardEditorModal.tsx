import { putActualCard } from "@/server-actions/actualCardActions";
import { HStack, FormLabel, Switch, Button, UseDisclosureReturn, VStack, Input, Select, Text } from "@chakra-ui/react";
import EditorModal from "../../EditorModal";
import ReadonlyEditorInputs from "../../ReadonlyEditorInputs";
import { z } from "zod";
import { getActualTimetableIdsOnlySchema } from "@/fetching/zodSchemas";

type CardType = z.infer<typeof getActualTimetableIdsOnlySchema.shape.data.shape.actualTimetables.element.shape.cards.element>;
type Props = {
    selectedCard: CardType;
    disclosure: UseDisclosureReturn;
    options: { lessonTimeOptions: JSX.Element[]; roomOptions: JSX.Element[]; subjectOptions: JSX.Element[]; teacherOptions: JSX.Element[] };
    groupId: number;
};

export default function ActualCardEditorModal({ selectedCard, disclosure, options, groupId }: Props) {
    const { lessonTimeOptions, roomOptions, subjectOptions, teacherOptions } = options;
    return (
        <EditorModal
            {...disclosure}
            size={"xl"}
        >
            <form
                onSubmit={async e => {
                    e.preventDefault();
                    await putActualCard({ formData: new FormData(e.currentTarget), groupId: groupId });
                }}
            >
                <VStack gap={3}>
                    <ReadonlyEditorInputs
                        id={selectedCard.id}
                        modifiedAt={selectedCard.modifiedAt}
                    />

                    <Input
                        name="relatedTimetableId"
                        defaultValue={selectedCard.relatedTimetableId}
                        hidden
                    ></Input>

                    <HStack w={"full"}>
                        <Text>Предмет</Text>
                        <Select
                            name="subjectId"
                            defaultValue={selectedCard.subjectId}
                        >
                            {subjectOptions}
                        </Select>
                    </HStack>

                    <HStack w={"full"}>
                        <Text>Препод</Text>
                        <Select
                            name="teacherId"
                            defaultValue={selectedCard.teacherId}
                        >
                            {teacherOptions}
                        </Select>
                    </HStack>

                    <HStack w={"full"}>
                        <Text>Кабинет</Text>
                        <Select
                            name="roomId"
                            defaultValue={selectedCard.roomId}
                        >
                            {roomOptions}
                        </Select>
                    </HStack>

                    <HStack w={"full"}>
                        <Text>Пара</Text>
                        <Select
                            name="lessonTimeId"
                            defaultValue={selectedCard.lessonTimeId}
                        >
                            {lessonTimeOptions}
                        </Select>

                        <Text>Подгруппа</Text>
                        <Select
                            name="subgroup"
                            defaultValue={selectedCard.subGroup}
                        >
                            <option value="0">Все</option>
                            <option value="1">Первая подгруппа</option>
                            <option value="2">Вторая подгруппа</option>
                        </Select>
                    </HStack>

                    <HStack w={"full"}>
                        <Text>Дата занятия</Text>
                        <Input
                            readOnly
                            defaultValue={selectedCard.date}
                            name="date"
                        ></Input>
                    </HStack>

                    <StatusSwitchers selectedCard={selectedCard} />
                    <FormButtons />
                </VStack>
            </form>
        </EditorModal>
    );
}

function StatusSwitchers({ selectedCard }: { selectedCard: CardType }) {
    return (
        <HStack
            w={"full"}
            justifyContent={"space-evenly"}
            h={"40px"}
        >
            <FormLabel htmlFor="isModified">Заменен:</FormLabel>
            <Switch
                name="isModified"
                colorScheme="yellow"
                defaultChecked={selectedCard.isModified}
            />

            <FormLabel htmlFor="isMoved">Перенесен:</FormLabel>
            <Switch
                name="isMoved"
                colorScheme="orange"
                defaultChecked={selectedCard.isMoved}
            />

            <FormLabel htmlFor="isCanceled">Отменен:</FormLabel>
            <Switch
                name="isCanceled"
                colorScheme="red"
                defaultChecked={selectedCard.isCanceled}
            />
        </HStack>
    );
}

function FormButtons() {
    return (
        <HStack
            w={"full"}
            justifyContent={"space-around"}
        >
            <Button colorScheme="red">Удалить</Button>
            <Button
                type="submit"
                colorScheme="blue"
            >
                Сохранить
            </Button>
        </HStack>
    );
}
