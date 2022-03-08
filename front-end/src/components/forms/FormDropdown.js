import { useEffect, useRef, useState } from "react";
import { S3_BUCKET } from "../../constants/urls";

import css from '../../styles/Flashcards.module.css';


const FormDropdown = ({label, options, isDataObject, choice, setChoice, error, setError, errorMessage}) => {
    const [active, setActive] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleMousedown = e => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setActive(false);
            }
        }

        window.addEventListener('mousedown', e => handleMousedown(e));

        return () => window.removeEventListener('mousedown', e => handleMousedown(e));
    }, []);

    const handleChoice = item => {
        setChoice(item);
        if (error) {
            setError(false);
        } 
    }

    return (
        <>
            {label ? <label htmlFor='options'>{label}</label> : <span className="pt-1" />}
            <div 
                id='options' 
                ref={dropdownRef} 
                className={error ? `${css.wrong_input} ${css.deck_options}` : css.deck_options} 
                onClick={() => setActive(!active)}
            >
                {choice} <img className={css.arrow_dropdown} alt='' src={`${S3_BUCKET}icons/arrow_drop_down_gray.svg`} />
                
                <div className={active ? css.dropdown_options : 'display-none'}>
                    {isDataObject ?
                        options.filter(item => item.name !== choice).map((item, idx) => {
                            return <p onClick={() => handleChoice(item)} key={idx}>{item.name}</p>
                        })
                        :
                        options.filter(item => item !== choice).map((item, idx) => {
                            return <p onClick={() => handleChoice(item)} key={idx}>{item}</p>
                        })
                    }
                </div>
            </div>
            {/* Error message */}
            {error && errorMessage && <div className={css.error_message}>{errorMessage}</div>}
        </>
    )
}

export default FormDropdown;