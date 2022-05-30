import axios from "axios";
import {
    LOAD_GENERAL_POLL,
    UPDATE_GENERAL_POLL,
    REMOVE_GENERAL_POLL
} from "../definitions/generalPoll";
import {
    v4 as uuid
} from 'uuid';
export const getAllQuestions = async (dispatch) => {
    try {
        const questions = await axios.get('/api/answer-general-question/');
        console.log(questions.data);
        dispatch({
            type: LOAD_GENERAL_POLL,
            payload: questions.data
        })
    } catch (err) {
        console.log(err);
    }
}

export const setAnswer = async (dispatch, question, answer, previousAnswer) => {
    try {
        console.log(question, answer);
        if (previousAnswer) {
            dispatch({
                type: UPDATE_GENERAL_POLL,
                payload: {
                    ...previousAnswer,
                    answer
                }
            });
        } else {
            dispatch({
                type: UPDATE_GENERAL_POLL,
                payload: {
                    new: true,
                    answer,
                    question
                }
            });
        }
        try {
            const response = await axios.post(`/api/answer-general-question/${question}/${answer}`);
            if (!previousAnswer) {
                dispatch({
                    type: UPDATE_GENERAL_POLL,
                    payload: response.data.answer
                })
            }
        } catch (err) {
            console.log(err);
            if (previousAnswer) {
                dispatch({
                    type: UPDATE_GENERAL_POLL,
                    payload: previousAnswer
                })
            }
        }

    } catch (err) {
        console.log(err);
    }
}