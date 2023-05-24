// import { useState } from "react";
// import { useAccount } from "wagmi";
// import { EtherInput } from "~~/components/scaffold-eth";
// import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
// import { useFetchCreators } from "~~/hooks/useFetchCreators";

// const creator = () => {
//     const { address, isConnected } = useAccount();
//     // State to hold flow withrawal args.
//     const [amount, setAmount] = useState();
//     const [reason, setReason] = useState<string>("");
    

//     // Geet creator list.
//     const {
//         creators,
//         // isLoadingCreators,
//         // errorReadingCreators,
//       } = useFetchCreators();

//     // Get creator unlocked amount.
//     // const { data: creatorAmt, isLoading: isLoadingCreatorAmt } = useScaffoldContractRead({
//     //     contractName: "YourContract",
//     //     functionName: "availableCreatorAmount",
//     //     args: ["0xe7b3Ab189820DC80316AE331Bd2E4093686CfE97"],
//     // });

//     // Flow withdrawal.
//     const { data: withdraw, isLoading: isWithdrawing } = useScaffoldContractWrite({
//         contractName: "YourContract",
//         functionName: "flowWithdraw",
//         args: [amount, reason],
//     });


//     if (!isConnected) {
//         return (
//             <div className="text-center m-auto">Connect to continue.</div>
//         )
//     }

//     if (address && !creators.includes(address)) {
//         return (
//             <div className="text-center m-auto">You are not worthy to view this page.</div>
//         )
//     }

    
   
//   return (
//     <div>
//         {/* The button to open modal */}
//         <label htmlFor="my-modal" className="btn">open modal</label>

//         {/* Put this part before </body> tag */}
//         <input type="checkbox" id="my-modal" className="modal-toggle" />
//         <div className="modal">
//             <div className="modal-box relative">
//                 <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
//                 <h3 className="text-lg font-bold">Withdraw</h3>
//                 <EtherInput value={""} onChange={function (newValue: string): void {
//                       throw new Error("Function not implemented.");
//                   } } />
//                 <div className="modal-action">
//                     <label htmlFor="my-modal" className="btn">Withdraw</label>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default creator;