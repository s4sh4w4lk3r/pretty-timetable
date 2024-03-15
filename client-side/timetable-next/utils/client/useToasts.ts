import "client-only";
import { useToast } from "@chakra-ui/react";

export default function useToasts() {
    const toast = useToast({ duration: 5000, isClosable: true });
    const successfulToast = (message: string) => toast({ status: "success", title: "Данные сохранены", description: message });
    const failedToast = (message: string) => toast({ status: "error", title: "Не удалось выполнить операцию", description: message });
    const loadingToast = (title: string) => toast({ status: "loading", title: title });
    return { toast, successfulToast, failedToast, loadingToast };
}
