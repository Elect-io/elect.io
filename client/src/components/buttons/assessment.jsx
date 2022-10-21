import { Link } from "react-router-dom"
import RightArrow from '../../icons/arrowRight';


const Button = (props) => {
    return <Link style={{color:'white'}} to={props.candidate? `/assessment/general/${props.candidate}`: props.id ? `/assessment/${props.id}` : '/assessment/general'} class="button-assessment"><p className="button-text" style={{color:'#fff', textAlign:'left'}}>Take the assessment</p> <RightArrow className="button-icon" /></Link>
}

export default Button;