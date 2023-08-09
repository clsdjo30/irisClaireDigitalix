export const resetAtMidnight = (callback: () => void) => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const timeUntilMidnight = midnight.getTime() - now.getTime();

  const timer = setTimeout(() => {
    callback();
  }, timeUntilMidnight);


  return timer; // retournez le timer pour pouvoir le nettoyer plus tard
};
