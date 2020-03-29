export const formatVotes = num => {
  if (num > 999 || num < -999) {
    num = (num / 1000).toFixed(1).toString() + "k";
  }
  return num;
};
