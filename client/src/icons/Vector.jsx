const Vector = (props) => {
    return (<svg className={`sidebar-icon ${props.active? 'sidebar-icon-active':''}`} onClick={props.onClick} width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 19.2487V11.4227C21.0001 10.8782 20.889 10.3395 20.6735 9.83942C20.458 9.33939 20.1428 8.8886 19.747 8.51468L12.374 1.54669C12.0027 1.19561 11.511 1 11 1C10.489 1 9.99734 1.19561 9.626 1.54669L2.253 8.51468C1.85722 8.8886 1.54195 9.33939 1.3265 9.83942C1.11104 10.3395 0.999942 10.8782 1 11.4227V19.2487C1 19.7791 1.21071 20.2878 1.58579 20.6629C1.96086 21.038 2.46957 21.2487 3 21.2487H19C19.5304 21.2487 20.0391 21.038 20.4142 20.6629C20.7893 20.2878 21 19.7791 21 19.2487Z" stroke="#AEAEAE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>)
}
export default Vector;
