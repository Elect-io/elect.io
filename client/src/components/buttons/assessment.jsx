import { Link } from "react-router-dom"
import RightArrow from '../../icons/arrowRight';


const Button = (props) => {
    return <Link to={props.id ? `/assessment/${props.id}` : '/assessment/general'} class="button-assessment"><p className="button-text">Take the assessment</p> <RightArrow className="button-icon" /></Link>
}

export default Button;