import { formatEther, formatUnits } from "ethers/lib/utils.js";
import { CreatorData } from "~~/pages";

type Props = {
    allCreatorsData: any;
    creators: string[];
    setCreatorsData: any;
}

export function useSetCreator({allCreatorsData, creators, setCreatorsData}: Props) {
    

  if (Array.isArray(allCreatorsData)) {
    
    const newData: CreatorData = {};
  
    allCreatorsData.forEach((creatorData: any, index: number) => {
      const creatorAddress = creators[index];
  
      const { last, cap, cycle } = creatorData;
      // Convert cap to ether
      const capValue = parseFloat(formatEther(cap));
      // Calculate the unlocked amount based on the last, cap, and cycle values
      const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
      const lastInSeconds = Number(last); // Convert last timestamp to seconds
      // Cycle is in days (30 days = 86400 seconds * 30) added to the last update.
      const cycleDurationInSeconds = lastInSeconds + (Number(formatUnits(cycle, 0)) * 86400); 
  
      let unlocked = 0;
  
  
      if (lastInSeconds >= cycleDurationInSeconds) {
        // If the last is greater or equal to cycle, unlocked remains at the cap value
        unlocked = capValue;
      } else {
        const timeSinceLast = currentTimeInSeconds - lastInSeconds; // Calculate time elapsed since last update
  
        if (timeSinceLast < cycleDurationInSeconds) {
          const availableAmount = (timeSinceLast * capValue) / cycleDurationInSeconds;
          unlocked = availableAmount;
        }
      }
  
      // Associate the creator address with the calculated data
      newData[creatorAddress] = {
        cap: capValue.toString(),
        last: last.toString(),
        cycle: cycle.toString(),
        unlocked: unlocked.toString(),
      };
    });
  
    setCreatorsData(newData);
  }
      
}
