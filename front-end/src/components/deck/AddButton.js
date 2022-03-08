import { useContext, useEffect, useRef, useState } from 'react';
import { FlashcardsContext } from '../../contexts/FlashcardsContext';
import { S3_BUCKET } from "../../constants/urls";

import css from '../../styles/Flashcards.module.css';


const AddButton = () => {
    const { 
        decks,
        showOptions, 
        setShowOptions, 
        setShowAddFlashcard, 
        setShowAddDeck, 
    } = useContext(FlashcardsContext);
    const [noDeckWarging, setNoDeckWarning] = useState(false);

    const optionsRef = useRef(null);
    const noDeckWargingRef = useRef(null);
    
    useEffect(()=> {
        const handleMousedown = e => {
            if (optionsRef.current && !optionsRef.current.contains(e.target) && !noDeckWarging) {
                setShowOptions(false);
            }
        }     
        
        const handleMouseover = e => {
            if (noDeckWargingRef.current && !noDeckWargingRef.current.contains(e.target)) {
                setNoDeckWarning(false);
            } 
        }
        
        window.addEventListener('mousedown', e => handleMousedown(e));
        window.addEventListener("mouseover", e => handleMouseover(e));
        
        return () => {
            window.removeEventListener('mousedown', (e) => handleMousedown(e));
            window.removeEventListener("mouseover", e => handleMouseover(e));
        }
    },[])
    
    const showForm = (option) => {
        switch(option) {
            case 1:
                if (decks.data.length > 0) {
                    setShowAddFlashcard(true);
                }
                break;
            case 2:
                setShowAddDeck(true);
                break;
        }
        setShowOptions(false);
    }

    const handleMouseover = () => {
        if (decks.data.length < 1) {
            setNoDeckWarning(true);
            noDeckWargingRef.current.style.setProperty('cursor', 'not-allowed');
        } else {
            noDeckWargingRef.current.style.setProperty('cursor', 'pointer');
        }
    }

    return (
        <>
            <div ref={optionsRef} className={showOptions ? css.options_container : 'display-none'}>
                <span onClick={() => showForm(2)}>
                    Deck 
                    <img alt='' src={`${S3_BUCKET}icons/note_add_white.svg`} />
                </span>
                <span ref={noDeckWargingRef} onMouseOver={handleMouseover} onClick={() => showForm(1)}>
                    <div className={noDeckWarging ? css.no_deck_message : 'display-none'}>
                        You need to add at least one deck before you can add a flashcard
                    </div>
                    Flashcard 
                    <img alt='' src={`${S3_BUCKET}icons/new_folder_white.svg`} />
                </span>
            </div>
            <div onClick={() => setShowOptions(!showOptions)} className={css.add_btn}>
                <img alt="" src={`${S3_BUCKET}icons/add_white.svg`} />
            </div>
        </>
    )
}

export default AddButton;