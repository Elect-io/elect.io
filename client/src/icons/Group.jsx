const Group = (props) => {
    return (<svg onClick={props.onClick} className={`sidebar-icon ${props.active? 'sidebar-icon-active':''}`}  width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 3.24854H5C2.79086 3.24854 1 5.0394 1 7.24854V17.2485C1 19.4577 2.79086 21.2485 5 21.2485H17C19.2091 21.2485 21 19.4577 21 17.2485V7.24854C21 5.0394 19.2091 3.24854 17 3.24854Z" stroke="#AEAEAE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M1 9.24854H21M7 1.24854V5.24854V1.24854ZM15 1.24854V5.24854V1.24854Z" stroke="#AEAEAE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    )
}
export default Group;
