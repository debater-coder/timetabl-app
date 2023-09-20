import { createStandaloneToast } from "@chakra-ui/toast";

// ===========================
// QUERY CLIENT INITIALISATION
// ===========================
export const { ToastContainer, toast } = createStandaloneToast();
export type Toast = typeof toast;
