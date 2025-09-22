import type { TaskResponseType } from "./task_response";
import { mapper as questionMapper, type QuestionType } from "./question"; 

export type ExerciseType = { key: number, type: string, title: string, instructions: string, skill: string, exercises: QuestionType[], correction:string | undefined, solved: boolean, readonly: boolean }

export const mapper = (items: any[], minInidex: number = 0) => {
    return items.map((item: TaskResponseType, index: number) => ({
        key: index + minInidex,
        title: `Exercise ${(index + minInidex) + 1}`,
        type: item.type,
        exercises: questionMapper(item.exercises),
        instructions: item.instructions,
        skill: item.skill,
        correction: undefined,
        solved: false,
        readonly: false
    } as ExerciseType))
}
