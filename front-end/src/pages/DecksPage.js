import { useContext, useEffect } from 'react';
import { FlashcardsContext } from '../contexts/FlashcardsContext';

// Components
import AddButton from '../components/deck/AddButton';
import DeleteDeck from '../components/general/DeleteDeck';
import DeckList from '../components/deck/DeckList';
import NoDeckYet from '../components/deck/NoDeckYet';
import RealoadDecks from '../components/deck/ReloadDecks';


const DecksPage = () => {
    // Context
    const {deckdLoading, decks, loadDecks, showDeleteDeck} = useContext(FlashcardsContext);

    useEffect(() => {
        loadDecks();
    }, [])

    
    return (
        <div className='page-container'>
            {(!deckdLoading || decks.loaded) && <>
                {decks.loaded && decks.data.length < 1 && <NoDeckYet />}
                {!decks.loaded && <RealoadDecks realodDecks={loadDecks} />}
                {decks.data.length > 0 && <DeckList />}
                <AddButton />
                {showDeleteDeck && <DeleteDeck />}
            </>}
        </div>
    )
}

export default DecksPage;