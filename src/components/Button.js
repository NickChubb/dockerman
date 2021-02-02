const Button = ({ color, text, onClick, type, disabled }) => {
    return <button style={{backgroundColor: color}} className='btn' onClick={onClick} type={type} disabled={disabled}>{text}</button>
}

export default Button
