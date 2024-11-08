export const formatDate = (dateString) => {
  if (!dateString) return null;

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, 
    timeZone: "Asia/Ho_Chi_Minh" 
  };

  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat("vi-VN", options).format(date);
  
  return formattedDate;
};
