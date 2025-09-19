import { Layout } from "antd"
import type { QuestionType } from "../models/question"

import ExerciseTextbox from "../components/exercise/textbox"
import ExerciseSelect from "../components/exercise/select"
import * as constants from "../util/constants"
import type { ExerciseModel } from "../models/ExerciseModel"
interface ExerciseViewProps {
    model: ExerciseModel;
}
const ExerciseView: React.FC<ExerciseViewProps> = ({ model }) => {
    return (
        <>
            <div></div>
            <Layout style={{ fontWeight: 'bold' }}>{model.data.title}: {model.data.skill}</Layout>
            <div>{model.data.instructions}</div>
            {model.data.type !== constants.exercise_types.multiple && model.data.exercises.map((q: QuestionType, index: number) => {
                console.log(q.solution)
                return (
                    <ExerciseTextbox index={index} key={model.data.title + '_' + (index)} exercise={q.exercise}
                        showCorrection={model.showCorrection} small={model.data.type === constants.exercise_types.fillBlank} onAnswer={model.setAnswer} />
                )
            })}
            {model.data.type === constants.exercise_types.multiple && model.data.exercises.map((q: QuestionType, index: number) => {
                console.log(q.solution)
                return (
                    <ExerciseSelect index={index} key={model.data.title + '_' + (index)} exercise={q.exercise}
                        showCorrection={model.showCorrection} onAnswer={model.setAnswer} items={q.options} />
                )
            })}
        </>
    )

}
export default ExerciseView