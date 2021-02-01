const Button = ({ color, text, onClick, type }) => {
    return <button style={{backgroundColor: color}} className='btn' onClick={onClick} type={type}>{text}</button>
}

export default Button
