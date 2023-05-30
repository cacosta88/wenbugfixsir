import { Address } from "./scaffold-eth";
import { useCreatorUnlockedAmount } from "~~/hooks/useCreatorUnlockedAmount";
import { CreatorInfo } from "~~/pages";
import { getTimeAgo } from "~~/utils/getTimeAgo";

// Component for displaying individual creator information
export const CreatorInfoDisplay: React.FC<{ creatorData: CreatorInfo; creatorAddress: string }> = ({
  creatorData,
  creatorAddress,
}) => {
  const { unlockedAmount } = useCreatorUnlockedAmount(creatorAddress);
  const cap = Number(creatorData.cap);
  const last = Number(creatorData.last);
  const percentage = cap > 0 ? (Number(unlockedAmount) / cap) * 100 : 0;

  return (
    <div className="flex items-center lg:justify-between justify-evenly w-full p-4 flex-row lg:space-x-6 space-x-2 space-y-6">
      <div className="pt-4">
        <Address address={creatorAddress} />
      </div>
      <div className="flex flex-col p-2 lg:p-5 overflow-hidden w-fit">
        <div className="flex flex-row">
          <div className="flex items-center">
            <div className="px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-3 h-3 lg:w-5 lg:h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <div className="text-sm tracking-tighter lg:text-lg whitespace-nowrap">Ξ {cap}</div>
          </div>
          <div className="flex flex-row items-center text-left w-full">
            <div className="px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-3 h-3 lg:w-5 lg:h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <div className="text-sm tracking-tighter lg:text-lg">{Number(unlockedAmount).toFixed(4)}</div>
          </div>
        </div>
        <div className="w-full">
          <progress className="progress progress-primary" value={percentage} max="100"></progress>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-row items-center">
            <div className="font-semibold tracking-tighter text-sm lg:text-lg px-3">Last:</div>
            <div className="text-sm tracking-tighter lg:text-lg">{getTimeAgo(last * 1000)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
