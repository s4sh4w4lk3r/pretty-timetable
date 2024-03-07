import { TableContainer, Table, Thead, Tr, Tbody } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function EditorTable({ children, tableHeaders }: { tableHeaders: ReactNode; children: ReactNode | ReactNode[] }) {
    return (
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>{tableHeaders}</Tr>
                </Thead>

                <Tbody>{children}</Tbody>
            </Table>
        </TableContainer>
    );
}
