import { type ExerciseResponseType } from './exercise_response';

export type TaskResponseType = { instructions: string, type: string, skill: string, exercises: ExerciseResponseType[] }
