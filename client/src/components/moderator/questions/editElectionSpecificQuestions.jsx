import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';

const EachQuestion = (props) => {
    let [state, setState] = React.useState(props);
    return (<div className='edit-questions-create'>
        <textarea placeholder='question' onChange={(e) => setState(state => ({ ...state, question: e.target.value }))} value={state.question}></textarea><span /><span />
        <input placeholder='hook' onChange={(e) => setState(state => ({ ...state, hook: e.target.value }))} value={state.hook}></input>
        <button onClick={async () => {
            try {
                const request = await axios.put(`/api/election-specific-question/${state._id}`, state);
            }

            catch (err) {
                console.log(err)
            }
        }}>Save</button>
        <button onClick={async () => {
            try {
                const request = await axios.delete(`/api/election-specific-question/${state._id}`);
                props.delete()
            }
            catch (err) {
                console.log(err)
            }
        }}>Delete</button>
    </div>)
}

const EditElectionQuestions = (props) => {
    const { id } = useParams();
    useEffect(() => {
        (async () => {
            let questions = await axios.get(`/api/election-specific-question/${id}`);
            setState(state => ({ ...state, questions: questions.data.questions }))
        })()
    }, [])
    let [state, setState] = React.useState({
        newQuestion: {
            question: '', xCoefficient: '', yCoefficient: '', hook: ''
        }, questions: []
    });
    return (<div className='edit-questions'>
        <div className='edit-questions-container'>
            <h2>
                <h2>Create Question</h2>
            </h2>
            <form onSubmit={async (e) => {
                e.preventDefault();
                console.log(state.newQuestion)
                try {
                    let question = await axios.post(`/api/election-specific-question/${id}`, state.newQuestion);
                    setState(state => ({ ...state, questions: [...state.questions, question.data.questionInstance], newQuestion: { question: '', xCoefficient: '', yCoefficient: '', hook: '' } }))
                }
                catch (err) {
                    console.log(err);
                }
            }}>
                <div className='edit-questions-create'>
                    <textarea value={state.newQuestion.question} onChange={(e) => setState(state => ({ ...state, newQuestion: { ...state.newQuestion, question: e.target.value } }))} placeholder='Question'></textarea>
                    <span />  <span />
                    <span />
                    <span />
                    <input value={state.newQuestion.hook} onChange={(e) => setState(state => ({ ...state, newQuestion: { ...state.newQuestion, hook: e.target.value } }))} placeholder='hook'></input>

                </div>
                <button>Create</button>
            </form>
        </div>
        <div className='edit-questions-container'>
            <h2>Edit Questions</h2>
            {state.questions.map((question, index) => {
                return (<EachQuestion key={index} {...question} delete={() => {
                    setState(state => ({ ...state, questions: state.questions.filter((q, i) => i !== index) }))
                }} />)
            })}

        </div>
    </div>)
}


export default EditElectionQuestions
