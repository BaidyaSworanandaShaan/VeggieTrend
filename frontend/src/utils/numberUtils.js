export const toNepaliNumber = (num) => {
  const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return num
    .toString()
    .split("")
    .map((d) => nepaliDigits[d] || d);
};
