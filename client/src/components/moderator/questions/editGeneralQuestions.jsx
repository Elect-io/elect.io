import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const EachQuestion = (props) => {
    let [state, setState] = React.useState(props);
    return (<div className='edit-questions-create'>
        <textarea placeholder='question' onChange={(e) => setState(state => ({ ...state, question: e.target.value }))} value={state.question}></textarea>
        <input placeholder='x-coefficient' onChange={(e) => setState(state => ({ ...state, xCoefficient: Number(e.target.value) }))} value={state.xCoefficient}></input>
        <input placeholder='y-coefficient' onChange={(e) => setState(state => ({ ...state, yCoefficient: Number(e.target.value) }))} value={state.yCoefficient}></input>
        <input placeholder='hook' onChange={(e) => setState(state => ({ ...state, hook: e.target.value }))} value={state.hook}></input>
        <button onClick={async () => {

        }}>Save</button>
        <button onClick={async () => {
            try {
                const request = await axios.delete(`/api/general-question/${state._id}`);
                props.delete()
            }
            catch (err) {
                console.log(err)
            }
        }}>Delete</button>
    </div>)
}

const EditGeneralQuestions = (props) => {
    let [state, setState] = React.useState({
        ...props, newQuestion: {
            question: '', xCoefficient: '', yCoefficient: '', hook: ''
        }
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
                    let question = await axios.post('/api/general-question', state.newQuestion);
                    setState(state => ({ ...state, questions: [...state.questions, question.data.questionInstance], newQuestion: { question: '', xCoefficient: '', yCoefficient: '', hook: '' } }))
                }
                catch (err) {
                    console.log(err);
                }
            }}>
                <div className='edit-questions-create'>
                    <textarea value={state.newQuestion.question} onChange={(e) => setState(state => ({ ...state, newQuestion: { ...state.newQuestion, question: e.target.value } }))} placeholder='Question'></textarea>
                    <input value={state.newQuestion.xCoefficient} onChange={(e) => setState(state => ({ ...state, newQuestion: { ...state.newQuestion, xCoefficient: Number(e.target.value) } }))} type="number" placeholder='x-coefficient'></input>
                    <input value={state.newQuestion.yCoefficient} onChange={(e) => setState(state => ({ ...state, newQuestion: { ...state.newQuestion, yCoefficient: Number(e.target.value) } }))} type="number" placeholder='y-coefficient'></input>
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

const mapStateToProps = (state) => {
    return {
        questions: state.poll.questions
    }
}
export default connect(mapStateToProps)(EditGeneralQuestions);
