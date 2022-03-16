import { createContext, useContext, useState } from "react";
import axiosInstance from "../utils/axios";
import { GlobalContext } from "./GlobalContext";


export const FlashcardsContext = createContext(null);

export const FlashcardsProvider = ({children}) => {
    // Context
    const {setServerError} = useContext(GlobalContext);

    // UI functionality
    const [showOptions, setShowOptions] = useState(false);
    const [showAddFlashcard, setShowAddFlashcard] = useState(false);
    const [showAddDeck, setShowAddDeck] = useState(false);
    const [showDeleteDeck, setShowDeleteDeck] = useState(false);
    const [deleteCurrentDeck, setDeleteCurrentDeck] = useState({});
    const [showUpdateCard, setShowUpdateCard] = useState(false);
    const [showDeleteCard, setShowDeleteCard] = useState(false);

    //Loading
    const [deckdLoading, setDeckdLoading] = useState(false);
    const [flashcardsLoading, setFlashcardsLoading] = useState(false);

    // Data
    const [currentDeck, setCurrentDeck] = useState(null);
    const [currentFlashcard, setCurrentFlashcard] = useState({});
    const [decks, setDecks] = useState({loaded: false, data:[]});
    const [flashcards, setFlashcards] = useState([]);


    const loadDecks = () => {
        setDeckdLoading(true);
        axiosInstance.get('decks/')
            .then(res => {
                if(res.status) {
                    setDecks({
                        loaded: true,
                        data: res.data,
                    });
                } else {
                    setServerError(true);
                }
                setDeckdLoading(false);
            })
            .catch(() => {
                setDeckdLoading(false);
                setDecks({
                    loaded: false,
                    data: [],
                });
                setServerError(true);
            })
    }

    const loadSingleDeck = id => {
        axiosInstance.get(`deck-detail/${id}/`)
            .then(res => {
                if(res.status) {
                    setCurrentDeck(res.data);
                } else {
                    setServerError(true);
                }
            })
            .catch(() => {
                setServerError(true);
            });
    }

    const loadFlashcards = id => {
        setFlashcardsLoading(true);
        axiosInstance.get(`flashcards/${id}/`)
            .then(res => {
                if(res.status) {
                    setFlashcards(res.data);
                } else {
                    setServerError(true);
                }
                setFlashcardsLoading(false);
            })
            .catch(() => {
                setFlashcardsLoading(false);
                setServerError(true);
            });
    }

    const contextData = {
        // Loading
        deckdLoading,
        flashcardsLoading,

        // UI
        showOptions, setShowOptions,
        showAddFlashcard, setShowAddFlashcard,
        showAddDeck, setShowAddDeck,
        showDeleteDeck, setShowDeleteDeck,
        deleteCurrentDeck, setDeleteCurrentDeck,
        showUpdateCard, setShowUpdateCard,
        showDeleteCard, setShowDeleteCard,
    
        // Data
        currentDeck, setCurrentDeck,
        currentFlashcard, setCurrentFlashcard,
        decks, setDecks,
        flashcards, setFlashcards,
    
        // Functions
        loadDecks,
        loadSingleDeck,
        loadFlashcards,
    }

    return (
        <FlashcardsContext.Provider value={contextData}>
            {children}
        </FlashcardsContext.Provider>
    )
}