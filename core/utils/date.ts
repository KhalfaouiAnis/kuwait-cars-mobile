export const generateYears = (
  startYear: number = 1980,
  endYear: number = new Date().getFullYear()
) => {
  const years = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push(year.toString());
  }
  return years;
};
