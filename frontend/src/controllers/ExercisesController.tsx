import React, { useState } from "react";
import { fetchData } from "../services/connection";
import * as constants from "../util/constants";
import { mapper as exerciseMapper, type ExerciseType } from "../types/exercise";
import type { QuestionGroupType } from "../types/question_group";
import type { ExerciseCorrectionResponseType, ExerciseCorrectionRequestType } from "../types/exercise_correction";
import type { CorrectionExerciseResponseType } from "../types/correction_exercise"
import type { ExercisesResponseType } from "../types/exercises_response";
import ExercisesView from "../views/ExercisesView";
import type { ExercisesModel } from "../models/ExercisesModel";
interface ExercisesProps {
    items: ExerciseType[];
    originalText: string;
    correctedText: string;
    setItems: (items: ExerciseType[]) => void;
    setFinalEvaluation: (content: ExerciseCorrectionResponseType | undefined) => void;
}
const Exercises: React.FC<ExercisesProps> = ({ items, originalText, correctedText, setItems, setFinalEvaluation }) => {
    const [localItems, setLocalItems] = useState<ExerciseType[]>([items[0]]);
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [showExerciseCorrection, setShowExerciseCorrection] = useState(false);
    const [showContinueButton, setShowContinueButton] = useState(true);
    const [showEvaluationButton, setShowEvaluationButton] = useState(false);
    const [showCorrectionButton, setShowCorrectionButton] = useState(false);
    const [isExercisesLoading, setIsExercisesLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [corrections, setCorrections] = useState<CorrectionExerciseResponseType[]>([]);
    const [exercisesCorrection, setExercisesCorrection] = useState<ExerciseCorrectionResponseType>();
    const setSolved = (answers: QuestionGroupType) => {
        const newLocal = items.find(f => f.key === answers.key);
        if (newLocal != undefined)
            newLocal.solved = true;
    }
    const exercisesLimitReached = () => {
        return (localItems.length >= constants.max_exercises);
    }
    const getExercises = () => {
        fetchData(constants.urlExercises, JSON.stringify({ original_text: originalText, corrected_text: correctedText })).then((response) => {
            const exercises_response: ExercisesResponseType = response.data;
            const exercises: ExerciseType[] = exerciseMapper(exercises_response.tasks, items.length);
            setItems([...items, ...exercises]);
            items = [...items, ...exercises];
            setIsExercisesLoading(false);
            nextExercise();
        });
    }

    const nextExercise = () => {
        //setIsExercisesLoading(false);
        setDisableSubmit(true);
        items[localItems.length - 1].solved = true;
        setShowCorrectionButton(localItems.length == items.length - 1);//Mostramos los botones para finalizar la evaluación o continuar
        if (localItems.length < items.length) {
            const nextItem = items[localItems.length];
            setLocalItems([...localItems, nextItem]);
            setDisableSubmit(false);
        }
        else {
            setShowEvaluationButton(true);
            setIsExercisesLoading(true);
            setIsLoading(true);
            getExercises();

        }
    }

    const getExercisesToEvaluate = (): ExerciseCorrectionRequestType[] => {
        let exercisesToEvaluate: ExerciseCorrectionRequestType[] = [];
        items.filter(f => f.solved).map((item) => {
            const newItems = item.exercises.map((e) => ({
                original_statment: e.exercise,
                student_answer: e.answer || "",
                correct_answer: e.solution || ""
            } as ExerciseCorrectionRequestType));
            exercisesToEvaluate = exercisesToEvaluate.concat(newItems);
        });
        return exercisesToEvaluate;
    }

    const correctExercises = () => {
        setDisableSubmit(true);
        setIsExercisesLoading(true);
        setIsLoading(true);
        const exercisesToEvaluate: ExerciseCorrectionRequestType[] = getExercisesToEvaluate();
        fetchData(constants.urlExerciseCorrection, JSON.stringify(exercisesToEvaluate)).then((response) => {
            if (response.status == constants.connection_status.OK) {
                const exerciseResponse: ExerciseCorrectionResponseType = response.data;
                setCorrections(exerciseResponse.corrections);
                setExercisesCorrection(exerciseResponse);
                //setShowExerciseCorrection(true);
                setShowEvaluationButton(true);
                if (!exerciseResponse.continue_practice || exercisesLimitReached()) {
                    setShowContinueButton(false);   
                    setShowExerciseCorrection(true);
                    setIsExercisesLoading(false);
                    setIsLoading(false);
                    setDisableSubmit(false);
                    setFinalEvaluation(exerciseResponse);
                } else {
                    nextExercise();
                }
            }
        })
    }
    const evaluate = () => {
        setFinalEvaluation(exercisesCorrection);
    }
    const model: ExercisesModel = {
        localItems,
        isExercisesLoading,
        isLoading,
        corrections,
        showExerciseCorrection,
        showContinueButton,
        showEvaluationButton,
        showCorrectionButton,
        disableSubmit,
        setSolved,
        correctExercises,
        nextExercise,
        evaluate
    };
    return <ExercisesView model={model} />;
}
export default Exercises;
