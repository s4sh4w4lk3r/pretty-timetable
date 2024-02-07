import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

const alertNoData = (
    <Alert status="error">
        <AlertIcon />
        <AlertTitle>Похоже, по вашему запросу нет данных.</AlertTitle>
    </Alert>
);
export default alertNoData;
