import { Link } from 'react-router-dom';

const Snippet = (props) => {

    const months = ['January', 'February', "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let timeRemaining = (new Date(props.date) - new Date(props.date))
    return (
        <Link className="election-snippet-each" to={"/election/" + props._id}>
            <div className="election-snippet-each-inner">
                <div>
                    <div>
                        <h3>{props.for}</h3>
                        <p>{props.location.city ? props.location.city + "," : null} {props.location.state ? props.location.state + "," : null} {props.location.country ? props.location.country : null}</p>
                        <p>{(months[(new Date(props.date)).getMonth()]) + " " + new Date(props.date).getDate() + 'th' + ', ' + new Date(props.date).getFullYear()}</p>
                    </div>
                 
                </div>
                <iframe className='election-snippet-map' width="600" height="500" src={`https://maps.google.com/maps?q=${props.location.city ? props.location.city + ', ' : ''}${props.location.state ? props.location.state + ', ' : ''}${props.location.country}&iwloc=&output=embed`} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
         
            </div>

        </Link>
    )
}

export default Snippet;