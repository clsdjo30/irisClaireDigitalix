import { GlobalStore } from "react-native-global-state-hooks";
import { renderHook, act } from "@testing-library/react-hooks";
import { useUserStore } from "../useUserStore";

const initialState = {
  firstname: "",
  birthday: "",
  genre: "",
  lastname: "",
  email: "",
  isagree: false,
  zodiacname: "",
  stone: "",
  symbol: "",
  element: "",
  password: "",
};

describe("useUserStore", () => {
  it("should return initial state", () => {
    const { result } = renderHook(() => useUserStore());

    expect(result.current[0]).toEqual(initialState);
  });

  it("should update the state", () => {
    const newData = {
      firstname: "John",
      birthday: "2000-01-01",
      genre: "Male",
      lastname: "Doe",
      email: "johndoe@gmail.com",
      isagree: true,
      zodiacname: "Capricorn",
      stone: "Ruby",
      symbol: "Goat",
      element: "Earth",
      password: "123456",
    };

    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current[1](newData);
    });

    expect(result.current[0]).toEqual(newData);
  });
});
