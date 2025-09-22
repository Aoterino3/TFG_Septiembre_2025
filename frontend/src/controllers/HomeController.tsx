import { mapper as exerciseMapper, type ExerciseType } from '../types/exercise';
import { type CorrectionResponseType } from "../types/correction_response";
import { type ExercisesResponseType } from "../types/exercises_response";
import { type IntroductionResponseType } from "../types/introduction_response";
import { type EvaluationType } from '../types/evaluation';
import { type EvaluationResponseType } from '../types/evaluation_response';
import { useState } from 'react';
import { fetchData } from '../services/connection';
import * as constants from '../util/constants';
import type { ExerciseCorrectionResponseType } from '../types/exercise_correction';
import HomeView from '../views/HomeView';
import type { HomeViewModel } from '../models/HomeModel';

const Home = () => {
    const [showIntroduction, setShowIntroduction] = useState(false);
    const [showCorrection, setShowCorrection] = useState(false);
    const [showFinalCorrection, setShowFinalCorrection] = useState(false);
    const [showExercises, setShowExercises] = useState(false);
    const [isCorrectionLoading, setIsCorrectionLoading] = useState(false);
    const [isExercisesLoading, setIsExercisesLoading] = useState(false);
    const [isEvaluationLoading, setIsEvaluationLoading] = useState(false);
    const [showFinalEvaluation, setShowFinalEvaluation] = useState(false);
    const [showEvaluation, setShowEvaluation] = useState(false);

    const [introduction, setIntroduction] = useState<string[]>([]);
    const [correction, setCorrection] = useState<CorrectionResponseType>();
    const [evaluation, setEvaluation] = useState<EvaluationResponseType>();
    const [exercisesCorrection, setExercisesCorrection] = useState<ExerciseCorrectionResponseType>();

    const [originalText, setOriginalText] = useState("");
    const [correctedText, setCorrectedText] = useState("");
    const [previousEvaluation, setPreviousEvaluation] = useState<string | undefined>("");
    const [exerciseEvaluation, setExerciseEvaluation] = useState<string | undefined>("");

    const [items, setItems] = useState<ExerciseType[]>([]);
    const setExercises = (data: CorrectionResponseType) => {
        setOriginalText(data?.original_text);
        setCorrectedText(data?.corrected_text);
        fetchData(constants.urlExercises, JSON.stringify({ original_text: originalText, corrected_text: correctedText })).then((response) => {
            const exercises_response: ExercisesResponseType = response.data;
            const exercises: ExerciseType[] = exerciseMapper(exercises_response.tasks);
            setItems(exercises);
            setIsExercisesLoading(true);
        })
    }
    //Evalua el texto de la redacción. Se distingue entre texto inicial y final.
    const evaluateText = (content: string, finalVersion: boolean = false) => {

        if (!finalVersion) {
            setShowCorrection(true);
            fetchData(constants.urlCorrection, content).then((response) => {
                const correctionResponse: CorrectionResponseType = response.data;
                setCorrection(correctionResponse);
                //Establecemos el valor de la evaluación inicial para la posterior evaluación final
                setPreviousEvaluation(correction?.evaluation);
                setIsCorrectionLoading(true);
                setShowExercises(true);
                setExercises(response.data);
            });
        } else {
            setShowFinalCorrection(true);
            //Generar json para enviar:
            setShowEvaluation(true);
            const eval_content: EvaluationType = {
                redaction: content,
                previous_evaluation: previousEvaluation, //Añadir previous evaluation para mejorar la evaluación
                exercises_evaluation: exerciseEvaluation //Añádir resumen de ejercicios para mejorar la evaluación
            } as EvaluationType;
            fetchData(constants.urlEvaluation, JSON.stringify(eval_content)).then((response) => {
                const evaluationResponse: EvaluationResponseType = response.data;
                setEvaluation(evaluationResponse);
                setIsEvaluationLoading(true);
            });
        }
    }
    const setFinalEvaluation = (exercises_correction: ExerciseCorrectionResponseType | undefined) => {
        setExercisesCorrection(exercises_correction);
        setExerciseEvaluation(exercises_correction?.evaluation);
        setShowFinalEvaluation(true);
    }
    if (introduction != undefined && introduction.length === 0) {
        fetchData(constants.urlIntroduction, '').then((response) => {
            if (response.status === constants.connection_status.OK) {
                const introductionResponse: IntroductionResponseType = response.data;
                setIntroduction([introductionResponse.introduction, introductionResponse.redaction_request]);
                setShowIntroduction(true);
            }
        })
    }
    const model: HomeViewModel = {
        showIntroduction,
        showCorrection,
        showFinalCorrection,
        showExercises,
        isCorrectionLoading,
        isExercisesLoading,
        isEvaluationLoading,
        showFinalEvaluation,
        showEvaluation,
        introduction,
        correction,
        evaluation,
        exercisesCorrection,
        items,
        correctedText,
        originalText,
        setItems,
        evaluateText,
        setFinalEvaluation
    }
    return <HomeView model={model} />
}

export default Home;