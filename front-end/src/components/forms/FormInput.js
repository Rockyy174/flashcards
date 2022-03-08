import css from '../../styles/Flashcards.module.css';


const FormInput = ({label, value, setValue, errorCondition, setErrorOffOnChange, errorMessage}) => {
    const handleChange = e => {
        setValue(e.target.value);
        if (setErrorOffOnChange && errorCondition) {
            setErrorOffOnChange(false);
        }
    }
    
    return (
        <>
            <div>
                {label && <label htmlFor="front">{label}</label>}
                <input 
                    className={errorCondition ? css.wrong_input : ''}
                    onChange={e => handleChange(e)} 
                    value={value} 
                    type='text' 
                    autoComplete="off" 
                    id="front"/>
            </div>
            {errorCondition && errorMessage && <div className={css.error_message}>{errorMessage}</div>}
        </>
    )
}

export default FormInput;