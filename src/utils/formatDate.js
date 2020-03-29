const lookup = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export const formatDate = dateString => {
  const year = new Date(dateString).getFullYear();
  const month = new Date(dateString).getMonth();
  const day = new Date(dateString).getDate();
  const hour = new Date(dateString).getHours();
  const minute = new Date(dateString).getMinutes().toString();
  const formattedDate = `${lookup[month]} ${day} ${hour}:${
    minute.length === 1 ? 0 + minute : minute
  } (${year})`;

  return formattedDate;
};
