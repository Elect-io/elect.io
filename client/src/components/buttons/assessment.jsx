import { Link } from "react-router-dom"
import RightArrow from '../../icons/arrowRight';


const Button = () => {
    return <Link class="button button-large"><p className="button-text">Take the assessment</p> <RightArrow className="button-icon" /></Link>
}

export default Button;