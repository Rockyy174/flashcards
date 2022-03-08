import { useContext } from "react";
import axiosInstance from "../../utils/axios";
import { FlashcardsContext } from "../../contexts/FlashcardsContext";
import { GlobalContext } from "../../contexts/GlobalContext";

import FormBody from "../forms/FormBody";

import css from '../../styles/Flashcards.module.css';


const DeleteDeck = () => {
    const {setServerError} = useContext(GlobalContext);
    const {
        setShowDeleteDeck,
        deleteCurrentDeck, setDeleteCurrentDeck, 
        loadDecks
    } = useContext(FlashcardsContext);

    
    
    const deleteDeck = e => {
        e.preventDefault();

        setShowDeleteDeck(false);
        axiosInstance.delete(`delete-deck/${deleteCurrentDeck.id}/`)
        .then(res => {
            if (res.status === 200) {
                loadDecks();
            } else {
                setServerError(true);
            }
        })
        .catch(() => setServerError(true))
    }

    const handleCloseForm = () => {
        setDeleteCurrentDeck({});
    }
    
    return (
        <FormBody
        setCloseForm={setShowDeleteDeck}
        handleSubmit={deleteDeck}
        callback={handleCloseForm}
        >
            <p className="text-center">Are you sure you want to delete the deck: <b>{deleteCurrentDeck.name}</b></p>
            
            <div className={css.btn_container}>
                <span onClick={() => setShowDeleteDeck(false)} className="btn bg-gray mb-10">Cancel</span>
                <button type="submit" className="btn bg-blue mb-10">Confirm</button>
            </div>

        </FormBody>
    )
}

export default DeleteDeck;