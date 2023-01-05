import { Auth } from "./Auth";
import { queryClient } from "./createQueryClient";

export const auth = new Auth(queryClient);
