
const Button = (props)=> (
    <button disabled = {props.disabled} onClick={props.action}>
        {props.text}
    </button>
);

export default Button;