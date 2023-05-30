import { useEffect, useState } from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export function useFetchConnectedCreator() {
  const { address, isConnected } = useAccount();
  const [connectedCreator, setConnectedCreator] = useState<any>(null);
  const [isLoadingConnectedCreator, setIsLoadingConnectedCreator] = useState<boolean>(false);
  const [errorFetchingConnectedCreator, setErrorFetchingConnectedCreator] = useState<string>("");

  const { data: connectedCreatorData, isLoading: isLoadingConnectedCreatorData, error: errorFetchingConnectedCreatorData } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "allCreatorData",
    args: [address],
  });

  useEffect(() => {
    if (isConnected && address && connectedCreatorData) {
      setIsLoadingConnectedCreatorData(true);
      setConnectedCreator(connectedCreatorData);
    } else {
      setIsLoadingConnectedCreatorData(false);
      setErrorFetchingConnectedCreator("Error fetching connected creator data.");
    }
  }, [isConnected, address, connectedCreatorData]);

  return {
    connectedCreator,
    isLoadingConnectedCreator,
    errorFetchingConnectedCreator,
  };
}
