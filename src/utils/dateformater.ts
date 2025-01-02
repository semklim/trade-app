export function formatTimestamp(isoTimestamp:string) {
  const dateObj = new Date(isoTimestamp);

  // Extract date components
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = String(dateObj.getFullYear()).slice(-2);

  // Extract time components
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');

  return {
      date: `${day}.${month}.${year}`,
      time: `${hours}:${minutes}:${seconds}`,
  };
}
