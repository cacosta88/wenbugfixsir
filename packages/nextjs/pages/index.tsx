// import { useAccount } from "wagmi";
import { useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { CreatorInfoDisplay } from "~~/components/CreatorInfoDisplay";
import ContractEvents from "~~/components/contractEvents";
// import { useAccountBalance } from "~~/hooks/scaffold-eth";
import { Address, Balance } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { useFetchCreators } from "~~/hooks/useFetchCreators";
import { useSetCreator } from "~~/hooks/useSetCreator";

export type CreatorInfo = {
  cap: string;
  last: string;
};
export type CreatorData = {
  [address: string]: CreatorInfo;
};

const Home: NextPage = () => {
  // All creator data.
  const [creatorsData, setCreatorsData] = useState<CreatorData>({});

  const streamContract = useDeployedContractInfo("YourContract");

  const {
    creators,
    // isLoadingCreators,
    // errorReadingCreators,
  } = useFetchCreators();

  // Get all creator data.
  const { data: allCreatorsData } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "allCreatorsData",
    args: [creators],
  });

  useSetCreator({ allCreatorsData, creators, setCreatorsData });

  return (
    <>
      <Head>
        <title>Squad</title>
        <meta name="description" content="Created with 🏗 scaffold-eth-2" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="max-w-[40rem] m-auto w-[90%] mb-10">
          <p className="w-full pt-20">
            We&apos;re running an experiment to retroactively fund open-source work by providing a monthly UBI to
            open-source developers, handpicked by Jessy and Jessy&apos;s Hacker House, and rewarding them for their
            ongoing contributions to the ecosystem.
          </p>
          <p>
            Chosen developers can submit their monthly projects, automatically claim grant streams, and showcase their
            work to the public.
          </p>
          <p>This initiative is made possible by BuidlGuidl!</p>
        </div>
        <div className="container mx-auto">
          <div className="w-full items-center space-y-5  pt-7 flex flex-col justify-center">
            <p className="font-bold mb-2 tracking-widest uppercase text-primary-content">Squad&apos;s Fund</p>
            <Address address={streamContract.data?.address} />
            <Balance className="text-3xl" address={streamContract.data?.address} />
          </div>
          <div className="flex flex-col p-5 text-center items-center justify-center">
            <div className="w-[40%] mx-auto">
              <h1 className="text-center font-bold tracking-widest uppercase">Streaming Creators</h1>
              {Object.entries(creatorsData).map(([creatorAddress, creatorData]) => (
                <CreatorInfoDisplay key={creatorAddress} creatorData={creatorData} creatorAddress={creatorAddress} />
              ))}
            </div>
          </div>
          <div className="w-full pt-40">
            <ContractEvents />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
