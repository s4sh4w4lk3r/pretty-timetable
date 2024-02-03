import { Card } from "@chakra-ui/react";
import React, { ReactNode } from "react";
type Props = {
    dayOfWeek: string;
    doesHighlight: boolean;
    children: ReactNode[];
};
export default function CardBox(props: Props) {
    const { children, dayOfWeek, doesHighlight } = props;
    return <Card>{children}</Card>;
}
