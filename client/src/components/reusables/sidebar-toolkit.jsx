import {Link} from 'react-router-dom'
const SideBarToolkit = (props) => {
    return (<div className="sidebar-each-toolkit">
        {props.options.map(option=>{
            return(<Link className="sidebar-each-toolkit-each" to={option.link}>{<option.title/>}</Link>)
        })}
        
    </div>)
}

export default SideBarToolkit;