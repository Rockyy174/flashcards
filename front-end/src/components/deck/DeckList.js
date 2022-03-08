import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlashcardsContext } from '../../contexts/FlashcardsContext';
import { S3_BUCKET } from '../../constants/urls';
import { REVIEW_ROUTE } from '../../constants/routes';

import css from '../../styles/Flashcards.module.css';
import useWindowSize from '../../utils/useWindowSize';


const DeckList = () => {
    const {decks, setShowDeleteDeck, setDeleteCurrentDeck, setCurrentDeck, loadFlashcards} = useContext(FlashcardsContext);
    const navigate = useNavigate();

    const width = useWindowSize();

    const handleClick = (e, deck) => {
        if (e.target.id.search("delete-icon") !== 0) {
            setCurrentDeck(deck);
            loadFlashcards(deck.id);
            navigate(`${REVIEW_ROUTE}/${deck.id}/`);
        }
    }

    const handleShowDelete = item => {
        setShowDeleteDeck(true);
        setDeleteCurrentDeck(item);
    }

    return (
        <>
            <h1 className={`font-big pt-1 ${width > 500 ? 'pl-2' : 'pl-half'}`} >Decks</h1>
            <ul>
                {decks.data.map((item, idx) => (
                    <li
                        onClick={e => handleClick(e, item)} 
                        className={css.deck_item} 
                        key={idx}
                    >
                        <span>{item.name}</span>
                        <span className='flex-center'>
                            {item.to_be_reviewed}
                            <img 
                                id={`delete-icon-${idx}`}
                                onClick={() => handleShowDelete(item)} 
                                className='cursor-pointer' 
                                src={`${S3_BUCKET}icons/delete_bin_dark_gray.svg`} 
                                alt='delete'
                            />
                        </span>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default DeckList;