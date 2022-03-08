import { useContext, useState } from 'react';
import { FlashcardsContext } from '../../contexts/FlashcardsContext';
import { GlobalContext } from '../../contexts/GlobalContext';
import axiosInstance from '../../utils/axios';
import FormBody from '../forms/FormBody';
import FormInput from '../forms/FormInput';


const AddDecks = () => {
    // Conntext
    const {setServerError} = useContext(GlobalContext);
    const {setShowAddDeck, showAddDeck, loadDecks} = useContext(FlashcardsContext);
    
    // State
    const [newDeckName, setNewDeckName] = useState('');
    const [nameError, setNameError] = useState(false);



    const addNewDeck = event => {
        event.preventDefault();

        // Validation
        if (!newDeckName) {
            setNameError(true);
            return;
        }

        // Request
        axiosInstance.post('add-deck/', {
            "name": newDeckName,
            "count": 0,
            "is_public": false,
        })
        .then(res => {
            if(res.status === 201) {
                loadDecks();
                setNewDeckName('');
            } else {
                setServerError(true);
            }
        })
        .catch(() => {
            setServerError(true);
        });
        
        setShowAddDeck(false);
    }

    if (!showAddDeck) return <span />;

    return (
        <FormBody
            handleSubmit={addNewDeck}
            setCloseForm={setShowAddDeck}
            buttonText='Add deck'
        >
            <FormInput 
                label='Deck name'
                value={newDeckName}
                setValue={setNewDeckName}
                errorCondition={nameError}
                setErrorOffOnChange={setNameError}
                errorMessage='deck needs a name'
            />
        </FormBody>
    )
}

export default AddDecks;