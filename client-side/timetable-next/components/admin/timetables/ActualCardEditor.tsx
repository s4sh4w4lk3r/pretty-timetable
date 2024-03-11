import Card from "@/components/timetable/Card";
import { getAllActualCardsByGroupAndWeekSchema } from "@/fetching/admin/zodSchemas";
import { Box } from "@chakra-ui/react";
import React from "react";
import { z } from "zod";

type ActualCardType = z.infer<typeof getAllActualCardsByGroupAndWeekSchema.shape.data.shape.actualCards.element>;

export default function ActualCardEditor(card: ActualCardType) {
    return (
        <Box _hover={{ cursor: "pointer" }}>
            <Card
                teacher={card.teacherId.toString()}
                cabinet={card.roomId.toString()}
                changes={{ isCanceled: false, isModified: false, isMoved: false }}
                date={new Date()}
                id={card.id}
                lessonTime={{ number: 1, endsAt: "123", startsAt: "321" }}
                subject={card.id.toString()}
                key={card.id}
            ></Card>
        </Box>
    );
}
// TODO при клике на карточку будет выводиться модальное окно с полями для обновления карточки

// TODO сделать получение всех нужных данных где-нибудь в топ компоненте,
// закешить их и пользоваться кешем в нижележащих компонентах.
