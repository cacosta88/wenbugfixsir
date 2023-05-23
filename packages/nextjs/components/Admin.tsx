import { BigNumber } from "ethers";
import { useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { EtherInput } from "./scaffold-eth";

const Admin = () => {

  const [modalAction, setModalAction] = useState<string>("add");
  // The follow two states hold args for addCreatorFlow.
  const [creator, setCreator] = useState<string>("");
  const [cap, setCap] = useState<BigNumber | undefined>(undefined);
  // The follow two states hold args for addBatchCreatorFlow.
  const [batchCreators, setBatchCreators] = useState<string[]>([]);
  const [batchCaps, setBatchCaps] = useState<BigNumber[]>([]);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [fundingValue, setFundingValue] = useState<number>(0);



  // Write hook for adding a creator.  
  const { 
    writeAsync: addCreator,
    // isLoading: isAddingCreator
  } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "addCreatorFlow",
    args: [creator, cap],
  });
    
  // Write hook for adding batch creators.  
  const { 
    writeAsync: addBatch,
    // isLoading: isAddingBatchCreators
  } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "addBatch",
    args: [batchCreators, batchCaps],
  });

  // Write hook for adding batch creators.  
  const { writeAsync: updateCreator,
    // isLoading: isUpdatingCreator
  } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "updateCreatorFlowCapCycle",
    args: [creator, cap],
  });
    
  // Write hook for removing a creator.  
  const {
    writeAsync: removeCreator,
    // isLoading: isRemovingCreator
  } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "removeCreatorFlow",
    args: [creator],
  });

  // Write hook for funding contract.
  const {
    writeAsync: fundContract,
    // isLoading: isFundingContract
  } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "fundContract",
    value: fundingValue.toString(),
  });


   
  const handleModalAction = async () => {
    try {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");
      
      if (modalAction === "add") {
        if (!creator || !cap) {
          setErrorMessage("Please enter all the required fields.");
          return;
        }
      
        await addCreator();
      
        setSuccessMessage("Creator added successfully.");
        setCreator("");
        setCap(undefined);
        setCycle(undefined);
      } else if (modalAction === "fund") {

        if (!fundingValue) {
          setErrorMessage("The amount is not valid.");
          return;
        }

        try {
        
          await fundContract();
        
          setSuccessMessage("Contract funded successfully.");
          setFundingValue(0);
        } catch (error) {
          setErrorMessage("Failed to fund contract. Please try again.");
          console.error(error);
        }

      } else if (modalAction === "remove") {
        if (!creator) {
          setErrorMessage("Please enter the creator address.");
          return;
        }
      
        await removeCreator();
      
        setSuccessMessage("Creator removed successfully.");
        setCreator("");
      } else if (modalAction === "batchAdd") {
        if (
          batchCreators.length === 0 ||
          batchCreators.length !== batchCaps?.length 
        ) {
          setErrorMessage("Please enter valid batch data.");
          return;
        }
      
        await addBatch();
      
        setSuccessMessage("Creators added successfully.");
        setBatchCreators([]);
        setBatchCaps([]);
      } else if (modalAction === "update") {
        if (!creator) {
          setErrorMessage("Please enter at least one creator address.");
          return;
        }
      
        await updateCreator();
      
        setSuccessMessage("Creators updated successfully.");
        setCreator("");
      }
      
      // setModalAction("");
    } catch (error) {
      setErrorMessage("Failed to perform the action. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
      
    
  const handleAddInput = () => {
    setBatchCreators((prev) => [...prev, ""]);
    setBatchCaps((prev) => [...prev, BigNumber.from(0)]);
  };
    
  const handleInputChange = (index: number, value: string, setState: any) => {
    setState((prevState: any) => {
      const updatedState = [...prevState];
      updatedState[index] = value;
      return updatedState;
    });
  };

  
  const handleModalActionSelect = (action: string) => {
    setModalAction(action);
  };

  console.log(successMessage, errorMessage, loading);
      
  return (
    <div className="flex justify-center items-center">
      <label htmlFor="my-modal" className="btn rounded-lg">
        Manage
      </label>
      
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div>
            <div className="flex justify-center items-center">
              {/* Add action selection UI */}
              <div>
                <select
                  name="modalAction"
                  value={modalAction}
                  onChange={(e) => handleModalActionSelect(e.target.value)}
                  className="select select-accent w-full max-w-xs"
                >
                  <option value="add">Add Creator</option>
                  <option value="batchAdd">Batch Add Creators</option>
                  <option value="update">Update Creator</option>
                  <option value="remove">Remove Creator</option>
                  <option value="fund">Fund Contract</option>
                </select>
              </div>

              <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
                ✕
              </label>
            </div>
          </div>
          <h3 className="font-bold text-center uppercase py-2 text-lg">
            {modalAction === "add" && "Add Creator"}
            {modalAction === "batchAdd" && "Batch Add Creators"}
            {modalAction === "update" && "Update Creator"}
            {modalAction === "remove" && "Remove Creator"}
            {modalAction === "fund" && "Fund Contract"}
          </h3>
          {modalAction === "update" && (
            <div>
              <label htmlFor="creator" className="block mt-4">
                Creator Address:
              </label>
              <input
                type="text"
                id="creator"
                className="input w-full"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
              />
              <label htmlFor="cap" className="block mt-4">
                Cap:
              </label>
              <input
                type="text"
                id="cap"
                className="input w-full"
                value={cap?.toString()}
                onChange={(e) => setCap(BigNumber.from(e.target.value))}
              />
            </div>
          )}
          {modalAction === "batchAdd" && (
            <div>
              {batchCreators.map((creator, index) => (
                <div key={index}>
                  <label htmlFor={`batch-creators-${index}`} className="block mt-4">
                    Creator Address {index + 1}:
                  </label>
                  <input
                    type="text"
                    id={`batch-creators-${index}`}
                    className="input w-full"
                    // value={creator}
                    onChange={(e) => handleInputChange(index, e.target.value, setBatchCreators)}
                  />

                  <label htmlFor={`batch-caps-${index}`} className="block mt-4">
                    Cap {index + 1}:
                  </label>
                  <input
                    type="text w-full"
                    id={`batch-caps-${index}`}
                    className="input"
                    // value={Number(batchCaps[index])}
                    onChange={(e) => handleInputChange(index, e.target.value, setBatchCaps)}
                  />

                </div>
              ))}

              <button className="flex w-full items-center flex-row justify-end" onClick={handleAddInput}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add
              </button>
            </div>
          )}
          {modalAction === "fund" && (
            <div>
              <label htmlFor="creator" className="block mt-4">
                Funding amount:
              </label>
              <EtherInput
                value={fundingValue.toString()}
                onChange={(e) => setFundingValue(Number(e))}
              />
            </div>
          )}
          {modalAction !== "update" && modalAction !== "batchAdd" && modalAction !== "fund" && (
            <div>
              <label htmlFor="creator" className="block mt-4">
                Creator Address:
              </label>
              <input
                type="text"
                id="creator"
                className="input w-full"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
              />
              {modalAction === "add" && (
                <>
                  <label htmlFor="cap" className="block mt-4">
                    Cap:
                  </label>
                  <input
                    type="text"
                    id="cap"
                    className="input w-full"
                    // value={cap}
                    onChange={(e) => setCap(BigNumber.from(e.target.value.toString()))}
                  />
                </>
              )}
            </div>
          )}
          <div className="flex justify-between mt-8">
            {modalAction &&
              <button className="btn btn-primary" onClick={handleModalAction}>
                {modalAction === "add" && "Add"}
                {modalAction === "batchAdd" && "Add Batch"}
                {modalAction === "update" && "Update"}
                {modalAction === "remove" && "Remove"}
                {modalAction === "fund" && "Fund"}
              </button>
            }
            <button className="btn" onClick={() => setModalAction("")}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
      
    
export default Admin;