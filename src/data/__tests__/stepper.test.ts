import STEPPER, { IStepper } from "../stepper";


// Mock the 'require' function for image loading
jest.mock("../../../assets/welcome/iris_claire.png", () => {
  return 1; // Replace with any value you want to return for the mocked image path
});
jest.mock("../../../assets/welcome/love.png", () => {
  return 2; // Replace with any value you want to return for the mocked image path
});
jest.mock("../../../assets/welcome/work.png", () => {
  return 3; // Replace with any value you want to return for the mocked image path
});
jest.mock("../../../assets/welcome/all_know_eye.png", () => {
  return 4; // Replace with any value you want to return for the mocked image path
});

describe("STEPPER data", () => {
  it("has the correct structure", () => {
    STEPPER.forEach((item: IStepper) => {
      expect(item).toHaveProperty("key");
      expect(item).toHaveProperty("title");
      expect(item).toHaveProperty("description");
      expect(item).toHaveProperty("image");
    });
  });

  it("contains valid image paths", () => {
    STEPPER.forEach((item: IStepper) => {
      // Check if the mocked image paths are valid and can be used without errors
      expect(item.image).not.toBeUndefined();
    });
  });
});

