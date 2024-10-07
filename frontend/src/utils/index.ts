export const daysLeft = (deadline: number): number => {
  const currentDate = new Date();
  let deadlineDate: Date;

  // Check if deadline is in seconds (Unix timestamp) or milliseconds
  if (deadline.toString().length === 10) {
    // Deadline is in seconds, convert to milliseconds
    deadlineDate = new Date(deadline * 1000);
  } else {
    // Deadline is already in milliseconds
    deadlineDate = new Date(deadline);
  }
  // deadlineDate = new Date(deadline * 1000);
  
  const difference = deadlineDate.getTime() - currentDate.getTime();
  const remainingDays = difference / (1000 * 3600 * 24);

  return Math.max(0, Math.ceil(remainingDays));
};
  export const calculateBarPercentage = (goal: number, raisedAmount: number) => {
    const percentage = Math.round((raisedAmount * 100) / goal);
  
    return percentage;
  };
  type CheckIfImageCallback = (exists: boolean) => void;
  export const checkIfImage = (url: string, callback: CheckIfImageCallback) => {
    const img = new Image();
    img.src = url;
  
    if (img.complete) callback(true);
  
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  };
  