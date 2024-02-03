import React from "react";
type Props = {
    id: number;
    number: number;
    startsAt: string;
    endsAt: string;
};
export default function LessonTime(props: Props) {
    const { id, number, startsAt, endsAt } = props;
    return <div>LessonTime</div>;
}
