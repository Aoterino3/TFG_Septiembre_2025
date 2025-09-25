import React from 'react';
import '../../pages/css/home.css';
import { Layout, theme, Skeleton, List } from 'antd';
import InputRedaction from "../controllers/InputRedactionController"
import Exercices from "../controllers/ExercisesController";
import Correction from '../controllers/CorrectionController'
import * as constants from '../../domain/util/constants';
import Evaluation from '../controllers/EvaluationController';
import type { HomeViewModel } from '../models/HomeModel';

const { Content } = Layout;
interface HomeViewProps { model: HomeViewModel }

const HomeView: React.FC<HomeViewProps> = ({ model }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (

        <>
            <Layout style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }} >
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <Skeleton active loading={!model.showIntroduction}>
                        <List size="large" dataSource={model.introduction} renderItem={(item: string) => <List.Item>{item}</List.Item>} />
                    </Skeleton>
                    <InputRedaction type={constants.input_types.input_redaction} showInputRedaction={model.showIntroduction} showCorrection={model.showCorrection} evaluateText={model.evaluateText} />
                    {(model.showCorrection) && <>
                        <Skeleton active loading={!model.isCorrectionLoading}>
                            <Correction showCorrection={model.showCorrection} correction={model.correction} />
                        </Skeleton>
                        {(model.showExercises) && <>
                            <Skeleton active loading={!model.isExercisesLoading}>
                                <Exercices items={model.items} setItems={model.setItems} originalText={model.originalText} correctedText={model.correctedText} setFinalEvaluation={model.setFinalEvaluation} />
                            </Skeleton>
                        </>}
                    </>}
                    {(model.showFinalEvaluation) && <>
                        <div>{model.exercisesCorrection?.feedback_summary}</div>
                        <InputRedaction type={constants.input_types.input_final_redaction} showInputRedaction={model.showFinalEvaluation} showCorrection={model.showFinalCorrection} evaluateText={model.evaluateText} />
                        {(model.showEvaluation) && <>
                            <Skeleton active loading={!model.isEvaluationLoading}>
                                <Evaluation showEvaluation={model.showEvaluation} evaluation={model.evaluation}></Evaluation>
                            </Skeleton>
                        </>}
                    </>}
                </Content>
            </Layout>
        </>
    )
}

export default HomeView