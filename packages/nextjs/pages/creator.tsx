import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils.js";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { EtherInput } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useCreatorUnlockedAmount } from "~~/hooks/useCreatorUnlockedAmount";
import { useFetchCreators } from "~~/hooks/useFetchCreators";

const Creator = () => {
  const { address, isConnected } = useAccount();
  // State to hold flow withdrawal args.
  const [amount, setAmount] = useState<BigNumber | undefined>(undefined);
  const [reason, setReason] = useState<string>("");
  const [unlocked, setUnlocked] = useState<BigNumber | undefined>(undefined);

  // Get creator list.
  const { creators, isLoadingCreators, errorReadingCreators } = useFetchCreators();

  // Get creator unlocked amount.
  const { data: creatorAmt, isLoading: isLoadingCreatorAmt } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "availableCreatorAmount",
    args: [address],
  });

    
  useEffect(() => {
    if (creatorAmt) {
      setUnlocked(creatorAmt);
    }
  }, [creatorAmt]);

  // Flow withdrawal.
  const { writeAsync: withdraw, isLoading: isWithdrawing } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "flowWithdraw",
    args: [amount, reason],
  });

  const handleWithdraw = () => {
    // Check if the amount is not greater than the unlocked amount
    if (amount && unlocked && amount.lte(unlocked)) {
      // handle the withdraw action
      withdraw();
    } else {
      alert("Withdrawal amount cannot be greater than the unlocked amount.");
    }
  };


  const handleAmountChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const parsedAmount = e.target.value !== "" ? parseUnits(e.target.value, 18) : undefined;
    setAmount(parsedAmount);
  };


  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };

  if (!isConnected) {
    return <div className="text-center m-auto">Connect to continue.</div>;
  }

  if (address && !creators.includes(address)) {
    return <div className="text-center m-auto">You are not worthy to view this page.</div>;
  }

  return (
    <div className="w-full flex justify-center p-6 ">
      {/* The button to open modal */}
      <label htmlFor="my-modal" className="btn btn-primary rounded-lg">
        Withdraw
      </label>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative space-y-4">
          <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">Withdraw</h3>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input className="w-full py-2 input" onChange={handleAmountChange} />
          </div>
          <div>
            <label htmlFor="reason py-2">Reason:</label>
            <input type="text" id="reason" className="w-full py-2 input" value={reason} onChange={handleReasonChange} />
          </div>
          <div className="modal-action">
            <button onClick={handleWithdraw} className="btn rounded-lg" disabled={isWithdrawing}>
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;
