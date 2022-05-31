import '../../assets/css/input.css'

interface InputInterface {
    value: string;
    type?: string;
    label?: string;
    name?: string;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputInterface) => {
    return <div className="input-container">
    <input type={props.type} value={props.value} name={props.name} onChange={props.handleChange} />
    <label className={props.value && 'filled'} htmlFor={props.name}>
      {props.label}
    </label>
  </div>
}

export default Input;