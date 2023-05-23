import Head from "next/head";
import type { NextPage } from "next";
import {
  useDeployedContractInfo,
  useScaffoldContractRead,
} from "~~/hooks/scaffold-eth";
// import { useAccount } from "wagmi";
import {  useState } from "react";
import { CreatorInfoDisplay } from "~~/components/CreatorInfoDisplay";
import { useSetCreator } from "~~/hooks/useSetCreator";
import { useFetchCreators } from "~~/hooks/useFetchCreators";
// import { useAccountBalance } from "~~/hooks/scaffold-eth";
import { Balance } from "~~/components/scaffold-eth";



export type CreatorInfo = {
  cap: string;
  last: string;
  cycle: string;
  unlocked: string;
}
export type CreatorData = {
  [address: string]: CreatorInfo; 
}

const Home: NextPage = () => {
  // All creator data.
  const [creatorsData, setCreatorsData] = useState<CreatorData>({});

  const streamContract = useDeployedContractInfo("YourContract");

  // const streamContractBalance = useAccountBalance(streamContract.data?.address);


  const {
    creators,
    // isLoadingCreators,
    // errorReadingCreators,
  } = useFetchCreators();

  

  // Get all creator data.
  const {
    data: allCreatorsData,
    // isLoading: isLoadingAllCreatorData 
  } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "allCreatorsData",
    args: [creators],
  });
 

    useSetCreator({allCreatorsData, creators, setCreatorsData});
    




  return (
    <>
      <Head>
        <title>Scaffold-ETH 2 App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth-2" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="max-w-[40rem] m-auto w-[90%] mb-10">
          <p>
            We&apos;re running an experiment to retroactively fund open-source work by providing a monthly UBI to open-source
            developers and rewarding them for their ongoing contributions
            to the ecosystem.
          </p>
          <p>
            Chosen developers can submit their monthly projects, automatically claim grant streams, and showcase their
            work to the public.
          </p>
          <p>This initiative is made possible by BuidlGuidl!</p>
        </div>
        <div className="w-full items-end pt-7 flex justify-center">
          <Balance className="font-bold" address={streamContract.data?.address} />
        </div>
        <div className="flex flex-col p-5 text-center items-center max-w-full rounded-3xl">
          {Object.entries(creatorsData).map(([creatorAddress, creatorData]) => (
            <CreatorInfoDisplay key={creatorAddress} creatorData={creatorData} creatorAddress={creatorAddress} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
