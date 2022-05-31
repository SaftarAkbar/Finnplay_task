import '../../assets/css/button.css'
import spinner_icon from '../../assets/icons/spinner_icon.svg'

interface ButtonInterface {
    title: string;
    startIcon?: string;
    endIcon?: string;
    onClick?: VoidFunction;
    loading?: boolean;
    titleStyle?: object;
    btnStyle?: object;
    className?: string
}

const Button = (props: ButtonInterface) => {
    // btn-no-color -> transparent no color button
    return <button style={props.btnStyle} onClick={props.onClick} className={`btn ${props.className}`}>
        {
            !props.loading ?
                <>
                    {props.startIcon && <div className="btn-startIcon">
                        <img src={props.startIcon} alt="icon" />
                    </div>}
                    <div className="btn-text" style={props.titleStyle}>{props.title}</div>
                </>
                : <img src={spinner_icon} alt="spinner_icon" />
        }
    </button>
}

export default Button;