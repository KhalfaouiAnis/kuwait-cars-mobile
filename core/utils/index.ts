export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(20).substring(2, 9)}`;
};
