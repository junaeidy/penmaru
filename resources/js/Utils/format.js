export const formatDateTime = (dateTimeString) => {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  return new Date(dateTimeString).toLocaleDateString('id-ID', options);
};