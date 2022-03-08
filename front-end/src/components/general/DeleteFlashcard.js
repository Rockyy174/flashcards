import { useContext } from "react";
import { FlashcardsContext } from "../../contexts/FlashcardsContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import axiosInstance from "../../utils/axios";
import FormBody from "../forms/FormBody";

import css from "../../styles/Flashcards.module.css";


const DeleteFlashcard = () => {
    const {loadFlashcards, setShowDeleteCard, currentFlashcard} = useContext(FlashcardsContext);
    const {setServerError} = useContext(GlobalContext);

    const deleteCard = e => {
        e.preventDefault();

        axiosInstance.delete(`delete-flashcard/${currentFlashcard.id}/`)
            .then(res => {
                if(res.status === 200) {
                    loadFlashcards(currentFlashcard.deck);
                } else {
                    setServerError(true);
                }
            })
            .catch(() => {
                setServerError(true)
            });

            setShowDeleteCard(false);
    }

    return (
        <FormBody
        setCloseForm={setShowDeleteCard}
        handleSubmit={deleteCard}
        >
            <p className="text-center">Are you sure you want to delete this flashcard?</p>
            
            <div className={css.btn_container}>
                <span onClick={() => setShowDeleteCard(false)} className="btn bg-gray mb-10">Cancel</span>
                <button type="submit" className="btn bg-blue mb-10">Confirm</button>
            </div>

        </FormBody>
    )
}

export default DeleteFlashcard;