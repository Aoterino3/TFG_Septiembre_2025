import type { ExerciseResponseType } from "./exercise_response";

export type QuestionType = { key: number, exercise: string, solution: string, hint: string, answer: string, options: string[] }

export const mapper = (items: ExerciseResponseType[]) => {
    return items.map((q_item: ExerciseResponseType, q_index: number) => ({
        key: q_index,
        exercise: q_item.exercise,
        solution: q_item.solution,
        hint: q_item.hint,
        options: q_item.options || [],
    } as QuestionType))
}