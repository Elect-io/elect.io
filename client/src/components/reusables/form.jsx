import e from 'express';
import React from 'react';

class Form extends React.Component {
    render() {
        return (<form className="form" onSubmit={this.props.onSubmit.bind(this, this.state)}>
            <h3 className="form-title">{this.props.title}</h3>
            <div className="form-inner">
                {this.props.inputs.map(input => {
                    return (<input placeholder={input.name[0].toUpperCase() + '-' + input.name.slice(1, input.name.length)} className="form-inner-input" type={input.type} name={input.name} value={this.state[input.name]} onChange={(e) => this.setState(state => ({ ...state, [e.target.name]: [e.target.value] }))} />)
                })}
            </div>
        </form>)
    }
}

export default Form;