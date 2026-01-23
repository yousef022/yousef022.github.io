export const formatDate = (isoDate: string): string => {
  const d = new Date(`${isoDate}T00:00:00`);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
};
