import { resetAtMidnight } from "../resetAtMidnight"; 

jest.useFakeTimers(); // Utilisez des timers fictifs pour contrôler le passage du temps

describe("resetAtMidnight", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("should set the callback to be called at midnight", () => {
    const callback = jest.fn();
    resetAtMidnight(callback);

    // Calculez le temps restant jusqu'à minuit
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight.getTime() - now.getTime();

    // Avancez le temps jusqu'à minuit
    jest.advanceTimersByTime(timeUntilMidnight);

    expect(callback).toHaveBeenCalled();
  });

  it("should return the timer", () => {
    const callback = jest.fn();
    const timer = resetAtMidnight(callback);

    expect(timer).toBeDefined();
    
  });
});

