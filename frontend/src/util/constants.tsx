
export const baseUrl = 'http://localhost';
export const port = 5000;
export const apiUrl = '/api/';
export const default_correction = 'correction';
export const exercises = 'exercises';
export const exerciseCorrection = 'exercise_correction';

export const introduction = 'introduction';
export const correction = 'correction';
export const content = 'content';
export const solution = 'solution';
export const exerciseSolution = 'exerciseSolution';
export const evaluation = 'evaluation';

export const urlIntroduction = `${baseUrl}:${port}${apiUrl}${introduction}`;
export const urlCorrection = `${baseUrl}:${port}${apiUrl}${correction}`;
export const urlContent = `${baseUrl}:${port}${apiUrl}${content}`;
export const urlSolution = `${baseUrl}:${port}${apiUrl}${solution}`;
export const urlExercises = `${baseUrl}:${port}${apiUrl}${exercises}`;
export const urlExerciseSolution = `${baseUrl}:${port}${apiUrl}${exerciseSolution}`;    
export const urlEvaluation = `${baseUrl}:${port}${apiUrl}${evaluation}`;
export const urlExerciseCorrection = `${baseUrl}:${port}${apiUrl}${exerciseCorrection}`;

export class connection_status {
    static OK = 'OK';
    static KO = 'KO';
}
export class exercise_types {
    static fillBlank = "fillBlank";
    static multiple = "multiple";
    static textFree = "textFree" ;
}
export class correction_status {
    static correct = "correct";
    static incorrect = "incorrect";
}

export class input_types {
    static input_redaction = "inputRedaction";
    static input_final_redaction = "inputFinalRedaction";
}