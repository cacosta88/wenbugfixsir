import { useState, useEffect } from "react";
import {
  useScaffoldEventHistory,
} from "~~/hooks/scaffold-eth";

export const useFetchCreators = () => {
  const [creators, setCreators] = useState<string[]>([]);

  // Read the creatorAdded events to get added creators.
  const {
    data: creatorAdded,
    isLoading: isLoadingCreators,
    error: errorReadingCreators,
  } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "CreatorAdded",
    fromBlock: Number(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) || 0,
    blockData: true,
  });

  useEffect(() => {
    if (creatorAdded) {
      setCreators((prev) => [
        ...prev,
        ...creatorAdded.map((creator) => creator.args[0]),
      ]);
    }
  }, [creatorAdded]);

  return {
    creators,
    isLoadingCreators,
    errorReadingCreators,
  };
};
