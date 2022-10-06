import { Link } from 'react-router-dom';
const party = (props) => {
    return (<Link style={{ textDecoration: 'none' }} to={"/party/" + props._id}>
        <div className="party-snippet">
            <img src={props.symbol} alt={props.name} />
            <div>
                <h3>{props.commonName}</h3>
                <h3>{props.country}</h3>
            </div>
        </div>
    </Link>)
}

export default party;