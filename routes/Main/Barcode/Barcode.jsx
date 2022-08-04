import Barcode from "../../../components/Barcode";
import { useAuth } from "../../../hooks/useAuth";
import useSBHSQuery from "../../../hooks/useSBHSQuery";
import { Skeleton } from "@chakra-ui/react";

export default () => {
  const { loading } = useAuth();
  const { data, error } = useSBHSQuery("details/userinfo.json", !loading);
  if (data || !error) {
    return (
      <Skeleton isLoaded={!!data} rounded={5} minH={10}>
        <Barcode value={data?.["studentId"]} />
      </Skeleton>
    );
  }
};
