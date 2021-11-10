const Button = ({ color, text, className, onClick, type, disabled, title }) => {
    return <button 
                style={{backgroundColor: color}} 
                className={`btn ${className}`}
                onClick={onClick} 
                type={type} 
                disabled={disabled} 
                title={title}>
                    {text}
                </button>
}

export default Button
