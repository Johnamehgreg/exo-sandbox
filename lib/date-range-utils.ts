export const getLast7Days = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 6);
  return formatDateRange(startDate, endDate);
};

export const getLast14Days = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 13);
  return formatDateRange(startDate, endDate);
};

export const getLast30Days = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 29);
  return formatDateRange(startDate, endDate);
};

export const getThisMonth = () => {
  const endDate = new Date();
  const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
  return formatDateRange(startDate, endDate);
};

export const getLastMonth = () => {
  const endDate = new Date();
  endDate.setDate(0);
  const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
  return formatDateRange(startDate, endDate);
};

// Helper function to format date in 'YYYY-MM-DD'
export const formatDate = (date: Date) => date.toISOString().split('T')[0];

export const formatDateRange = (startDate: Date, endDate: Date) => ({
  startDate: formatDate(startDate),
  endDate: formatDate(endDate),
});
