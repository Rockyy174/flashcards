import { useContext, useState } from 'react';
import axiosInstance from '../../utils/axios';
import { GlobalContext } from '../../contexts/GlobalContext';
import { FlashcardsContext } from '../../contexts/FlashcardsContext';

import FormBody from '../forms/FormBody';
import FormDropdown from '../forms/FormDropdown';

import css from '../../styles/Flashcards.module.css';
import FormInput from '../forms/FormInput';


const AddFlashcards = () => {
    // Context
    const {setServerError} = useContext(GlobalContext);
    const {
        loadDecks, 
        setShowAddFlashcard, showAddFlashcard,
        decks,
    } = useContext(FlashcardsContext);
    
    // Dropdown 
    const [currentDeck, setCurrentDeck] = useState('Select a deck')
    const [deckMissing, setDeckMissing] = useState(false);
    
    // New flashcard info
    const [newCardFront, setNewCardFront] = useState('');
    const [newCardBack, setNewCardBack] = useState('');
    const [newDeck, setNewDeck] = useState();
    const [infoMissing, setInfoMissing] = useState(false);
    
    // Success message
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Add flashcard request
    const addNewFlashcard = event => {
        event.preventDefault();

        // Validation
        if (currentDeck === 'Select a deck') {
            setDeckMissing(true);
            return;
        }

        if (!newCardFront || !newCardBack) {
            setInfoMissing(true);
            return;
        }

        // Request
        axiosInstance.post(`add-flashcard/${newDeck}/`, {
            "front": newCardFront,
            "back": newCardBack,
            "deck": newDeck,        
        })
            .then(res => {
                if(res.status === 201) {
                    setShowSuccessMessage(true);
                    setTimeout(() => {
                        setShowSuccessMessage(false);
                    }, 2000)
                } else {
                    setShowAddFlashcard(false);
                    setServerError(true);
                }
            })
            .catch(() => {
                setShowAddFlashcard(false);
                setServerError(true);
            });
        
            setNewCardFront('');
            setNewCardBack('');
    }

    const handleSelectDeck = deck => {
        setCurrentDeck(deck.name);
        setNewDeck(deck.id)
    }

    if (!showAddFlashcard) return <span />

    return (
            <>
                <FormBody
                    handleSubmit={addNewFlashcard}
                    setCloseForm={setShowAddFlashcard}
                    callback={loadDecks}
                    buttonText='Add flashcard'
                >

                    <FormDropdown 
                        label='Deck'
                        options={decks.data} 
                        isDataObject={true}
                        choice={currentDeck}
                        setChoice={handleSelectDeck}
                        error={deckMissing}
                        setError={setDeckMissing}
                        errorMessage='flashcard needs to have a deck'
                    />

                    {/* Front */}
                    <FormInput 
                        label='Front'
                        value={newCardFront}
                        setValue={setNewCardFront}
                        setErrorOffOnChange={setInfoMissing}
                        errorCondition={infoMissing}
                    />

                    {/* Back */}
                    <FormInput 
                        label='Back'
                        value={newCardBack}
                        setValue={setNewCardBack}
                        errorCondition={infoMissing}
                        setErrorOffOnChange={setInfoMissing}
                        errorMessage='flashcard needs front and back'
                    />
                
                </FormBody>
                
                {/* Success message */}
                <div className={showSuccessMessage ? css.success_message_container_active : css.success_message_container}>
                    <p>Flashcard successfully created!</p>
                </div>
            </>
        )
    }
    
    export default AddFlashcards;