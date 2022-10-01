import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const EachQuestion = (props) => {
    let [state, setState] = React.useState(props);
    return (<div className='edit-questions-each'>
        <input placeholder='question' value={state.question}></input>
        <input placeholder='x-coefficient' value={state.xCoefficient}></input>
        <input placeholder='y-coefficient' value={state.yCoefficient}></input>
        <input placeholder='hook' value={state.hook}></input>
        <button>Save</button>
        <button>Delete</button>
    </div>)
}

const EditGeneralQuestions = (props) => {
    return (<div className='edit-questions'>
        <div className='edit-questions-container'>
            <h2>
                <h2>Create Question</h2>
            </h2>
            <div>
                <input placeholder='question'></input>
                <input placeholder='x-coefficient'></input>
                <input placeholder='y-coefficient'></input>
                <input placeholder='hook'></input>
                <button>Create</button>
            </div>
        </div>
        <div className='edit-questions-container'>
            <h2>Edit Questions</h2>
            {props.questions.map((question, index) => {
                return (<EachQuestion key={index} {...question} />)
            })}

        </div>
    </div>)
}

const mapStateToProps = (state) => {
    return {
        questions: state.poll.questions
    }
}
export default EditGeneralQuestions;
