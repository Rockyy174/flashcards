import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { S3_BUCKET } from "../../constants/urls";

import css from "../../styles/Flashcards.module.css";


const ServerError = () => {
    // Contexts
    const {setServerError} = useContext(GlobalContext);

    // References
    const containerRef = useRef(null);

    // Event listener to hide form
    useEffect(() => {
        const handleMousedown = e => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setServerError(false);
            }
        }

        const handleKeydown = e => {
            if (e.key === "Escape") {
                setServerError(false);
            }
        }

        window.addEventListener('mousedown', e => handleMousedown(e));
        window.addEventListener('keydown', e => handleKeydown(e))
        
        return () => {
            window.removeEventListener('mousedown', e => handleMousedown(e))
            window.removeEventListener('keydown', e => handleKeydown(e))
        };
    }, []);

    return (
        <div className="transparent-bg flex-center">
            <div ref={containerRef} className='server-error-container'>
                <div className={css.close_form_btn} onClick={() => setServerError(false)}>
                    <img src={`${S3_BUCKET}icons/close_white.svg`} alt='x'/>
                </div>
                <p>There was an error. Please, try again later.</p>
            </div>
        </div>
    )
}

export default ServerError;