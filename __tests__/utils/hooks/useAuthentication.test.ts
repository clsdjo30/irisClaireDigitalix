import { renderHook, act } from "@testing-library/react-hooks";
import { useAuthentication } from "../../../src/hooks/useAuthentication";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

describe("useAuthentication", () => {
  it("should set user when user is signed in", () => {
    const user = { uid: "123", email: "test@example.com" } as User;
    (getAuth as jest.Mock).mockReturnValue({});
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(user);
      return jest.fn();
    });

    const { result } = renderHook(() => useAuthentication());

    expect(result.current.user).toEqual(user);
  });

  it("should set user to undefined when user is signed out", () => {
    (getAuth as jest.Mock).mockReturnValue({});
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(undefined);
      return jest.fn();
    });

    const { result } = renderHook(() => useAuthentication());

    expect(result.current.user).toBeUndefined();
  });
});
