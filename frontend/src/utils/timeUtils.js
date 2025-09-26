export const getMsUntilNext7AM = () => {
  const now = new Date();
  const next7AM = new Date();
  next7AM.setHours(7, 0, 0, 0); // today 7 AM

  if (now >= next7AM) {
    // if past 7 AM today, set for tomorrow
    next7AM.setDate(next7AM.getDate() + 1);
  }

  return next7AM - now; // milliseconds until next 7 AM
};
