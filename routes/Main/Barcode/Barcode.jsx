import Barcode from "../../../components/Barcode";
import { useAuth } from "../../../hooks/useAuth";
import useSBHSQuery from "../../../hooks/useSBHSQuery";
import { Skeleton, Tooltip, Icon, Flex } from "@chakra-ui/react";

export default () => {
  const { loading } = useAuth();
  const { data, error } = useSBHSQuery("details/userinfo.json", !loading);

  if (data || !error) {
    return (
      <Flex direction={"column"} align="center">
        <Tooltip
          label={
            "You can use this barcode to scan in. If you are scanning using your phone, you must use the new scanners, like the ones outside the 600s or the ones outside Main Foyer opposite the Main Office."
          }
          closeOnClick={false}
        >
          <Icon boxSize={7} mb={3} mt={5} />
        </Tooltip>
        <Skeleton isLoaded={!!data} rounded={5} minH={10}>
          <Barcode value={data?.["studentId"]} />
        </Skeleton>
      </Flex>
    );
  }

  return (
    "An error occured: " +
    error.message +
    ". Try logging in and out if the error persists."
  );
};
