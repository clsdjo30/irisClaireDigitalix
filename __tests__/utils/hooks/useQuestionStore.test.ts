import { renderHook, act } from "@testing-library/react-hooks";
import { useQuestionStore } from "../../../src/utils/hooks/useQuestionStore";

describe("useQuestionStore", () => {
    it("should update the store values correctly", () => {
        const { result } = renderHook(() => useQuestionStore());
    
        act(() => {
        result.current[1]({
            question: "What is your question?",
            domain: "Amour",
            answer: "What is your answer?",
            isanswered: true,
            choosecard: "What is your choosecard?",
            choosecardname: "What is your choosecardname?",
            choosecardpseudo: "What is your choosecardpseudo?",
            choosecardnumber: 0,
        });
        });
    
        expect(result.current[0]).toEqual({
        question: "What is your question?",
        domain: "Amour",
        answer: "What is your answer?",
        isanswered: true,
        choosecard: "What is your choosecard?",
        choosecardname: "What is your choosecardname?",
        choosecardpseudo: "What is your choosecardpseudo?",
        choosecardnumber: 0,
        });
    });
}
);

