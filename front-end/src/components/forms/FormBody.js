import { useEffect, useRef } from 'react';
import { S3_BUCKET } from '../../constants/urls';

import css from '../../styles/Flashcards.module.css';



const FormBody = ({children, buttonText, handleSubmit, setCloseForm, callback}) => {

    const formRef = useRef(null);
    const backgroundRef = useRef(null);

     // Event listener to close form
     useEffect(() => {
        backgroundRef?.current?.style.setProperty('height', `${document.body.clientHeight + 30}px`);

        const handleMousedown = e => {
            if (formRef.current && !formRef.current.contains(e.target)) {
                setCloseForm(false);
                if (callback) {
                    callback();
                }
            }
        }

        const handleKeydown = e => {
            if (e.key === "Escape") {
                setCloseForm(false);
                if (callback) {
                    callback();
                }
            }
        }

        window.addEventListener('mousedown', e => handleMousedown(e));
        window.addEventListener('keydown', e => handleKeydown(e))

        return () => {
            window.removeEventListener('mousedown', (e) => handleMousedown(e));
            window.addEventListener('keydown', e => handleKeydown(e))
        }
    }, []);

    return (
        <div ref={backgroundRef} className='transparent-bg flex-center'>
            <form onSubmit={e => handleSubmit(e)} ref={formRef} className={`${css.form}`}>
                {/* Close form button */}
                <div className={css.close_form_btn} onClick={() => setCloseForm(false)}>
                    <img src={`${S3_BUCKET}icons/close_white.svg`} alt='x'/>
                </div>

               {children}

                {/* Submit button */}
                {buttonText &&
                <div className={css.btn_container}>
                    <button className="btn bg-blue mb-10" type="submit">{buttonText}</button>
                </div>}
            </form>
        </div>
    )
}

export default FormBody;