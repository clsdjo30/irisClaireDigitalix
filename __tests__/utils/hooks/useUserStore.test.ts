import { renderHook, act } from "@testing-library/react-hooks";
import { useUserStore } from "../../../src/utils/hooks/useUserStore"; 



describe("useUserStore", () => {
  it("should update the store values correctly", () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current[1]({
        firstname: "John",
        birthday: "2000-01-01",
        genre: "Male",
        lastname: "Doe",
        email: "john.doe@example.com",
        isagree: true,
        zodiacname: "Aquarius",
        stone: "Amethyst",
        symbol: "Water-Bearer",
        element: "Air",
        password: "password123",
      });
    });

    expect(result.current[0]).toEqual({
      firstname: "John",
      birthday: "2000-01-01",
      genre: "Male",
      lastname: "Doe",
      email: "john.doe@example.com",
      isagree: true,
      zodiacname: "Aquarius",
      stone: "Amethyst",
      symbol: "Water-Bearer",
      element: "Air",
      password: "password123",
    });
  });
});
