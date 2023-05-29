import { LockIcon } from "./LockIcon";
import { Price } from "./Price";
import { UnlockIcon } from "./UnlockIcon";
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
    <div className="flex items-center justify-between tracking-widest w-full p-4 rounded-lg bg-base-200 flex-row space-x-6 space-y-6">
      <div className="uppercase">
        <Address address={creatorAddress} />
      </div>
      <div className="flex flex-col w-fit lg:w-[250px]">
        <div className="flex flex-row">
          <div className="flex items-center w-full">
            <div className="px-1">
              <LockIcon />
            </div>
            <div className="flex-grow-2">
              Ξ <Price value={cap} />
            </div>
          </div>
          <div className="flex items-center w-full">
            <div className="px-1">
              <UnlockIcon />
            </div>
            <div className="flex-grow-1">
              <Price value={Number(unlockedAmount)} />
            </div>
          </div>
        </div>
        <div className="w-full">
          <progress className="progress progress-primary" value={percentage} max="100"></progress>
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
