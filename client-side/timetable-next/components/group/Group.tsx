import React from "react";

type Props = {
    id: number;
    name: string;
};
export default function Group(props: Props) {
    const { id, name } = props;
    return <div>Group</div>;
}
