import { Address } from "./scaffold-eth";
import { getTimeAgo } from "~~/utils/getTimeAgo";
import { useCreatorUnlockedAmount } from "~~/hooks/useCreatorUnlockedAmount";
import { CreatorInfo } from "~~/pages";



// Component for displaying individual creator information
export const CreatorInfoDisplay: React.FC<{ creatorData: CreatorInfo, creatorAddress: string }> = ({ creatorData, creatorAddress }) => {

  const { unlockedAmount } = useCreatorUnlockedAmount(creatorAddress);
  const cap = Number(creatorData.cap);
  const last = Number(creatorData.last);
  // const cycle = creatorData.cycle;
  const percentage = cap > 0 ? (Number(unlockedAmount) / cap) * 100 : 0;

  console.log(percentage);
  
    return (
      <div className="flex items-center justify-between tracking-widest w-full p-4 rounded-lg bg-base-200 flex-row space-x-6 space-y-6">
        <div className="uppercase">
          <Address address={creatorAddress} />
        </div>
        <div className="flex flex-col w-[200px]">
          <div className="flex flex-row">
            <div className="flex items-center w-full">
              <div className="px-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <div className="flex-grow-1">Ξ {cap}</div>
            </div>
            <div className="flex items-center w-full">
              <div className="px-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <div className="flex-grow-1">{Number(unlockedAmount).toFixed(4)}</div>
            </div>          
          </div>
          <div className="w-full">
            <progress className="progress progress-primary" value={90} max="100"></progress>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row items-center">
              <div className="font-semibold px-3">Last:</div>
              <div className="flex-grow-1">{getTimeAgo(last * 1000)}</div>
            </div>
            {/* <div className="flex flex-row items-center">
              <div className="">Cycle:</div>
              <div className="flex-grow-1">{cycle} days</div>
            </div> */}
          </div>
        </div>
      </div>
  );
};