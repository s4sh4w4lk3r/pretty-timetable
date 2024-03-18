import { getActualTimetableIdsOnlySchema } from "@/fetching/zodSchemas";
import { HStack, FormLabel, Switch } from "@chakra-ui/react";
import { z } from "zod";

type CardType = z.infer<typeof getActualTimetableIdsOnlySchema.shape.data.shape.actualTimetables.element.shape.cards.element>;
export default function StatusSwitchers({ selectedCard }: { selectedCard: CardType }) {
    return (
        <HStack
            w={"full"}
            justifyContent={"space-evenly"}
            h={"40px"}
        >
            <FormLabel htmlFor="isModified">Заменен:</FormLabel>
            <Switch
                name="isModified"
                id="isModified"
                colorScheme="yellow"
                defaultChecked={selectedCard.isModified}
            />

            <FormLabel htmlFor="isMoved">Перенесен:</FormLabel>
            <Switch
                name="isMoved"
                id="isMoved"
                colorScheme="orange"
                defaultChecked={selectedCard.isMoved}
            />

            <FormLabel htmlFor="isCanceled">Отменен:</FormLabel>
            <Switch
                name="isCanceled"
                id="isCanceled"
                colorScheme="red"
                defaultChecked={selectedCard.isCanceled}
            />
        </HStack>
    );
}
