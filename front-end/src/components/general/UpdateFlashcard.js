import { useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { FlashcardsContext } from "../../contexts/FlashcardsContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import FormBody from "../forms/FormBody";
import FormInput from "../forms/FormInput";


const UpdateFlashcard = () => {
    const {setServerError} = useContext(GlobalContext);
    const {
        setShowUpdateCard, 
        currentFlashcard, 
        loadFlashcards,
    } = useContext(FlashcardsContext);

    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [infoMissing, setInfoMissing] = useState(false);

    useEffect(() => {
        if(currentFlashcard) {
            setFront(currentFlashcard.front);
            setBack(currentFlashcard.back);
        }
    }, [currentFlashcard])

    const updateCard = (e) => {
        e.preventDefault();

        if (!front || !back) {
            setInfoMissing(true);
            return;
        }

        axiosInstance.put(`edit-flashcard/`, {
            ...currentFlashcard,
            'front': front, 
            'back': back, 
        })
            .then(res => {
                if (res.status === 200) {
                    loadFlashcards(currentFlashcard.deck);
                } else {
                    setServerError(true);
                }
            })
            .catch(() => setServerError(true));
            
            setShowUpdateCard(false);
    }

    return (
        <FormBody
            buttonText='Update flashcard'
            handleSubmit={updateCard}
            setCloseForm={setShowUpdateCard}
        >
            <FormInput 
                label='Front'
                value={front}
                setValue={setFront}
                errorCondition={infoMissing}
            />
           <FormInput 
                label='Back'
                value={back}
                setValue={setBack}
                errorCondition={infoMissing}
                errorMessage='flashcard needs front and back'
           />
        </FormBody>
    )
}

export default UpdateFlashcard;