import { useContext } from 'react';
import { Link } from 'react-router-dom';
import useWindowSize from '../../utils/useWindowSize';
import { S3_BUCKET } from '../../constants/urls';
import { FlashcardsContext } from '../../contexts/FlashcardsContext';

import css from '../../styles/Revision.module.css';


const ReviewHeader = ({flashcardsLeft}) => {
    const {
        currentDeck, 
        setShowUpdateCard, 
        setShowDeleteCard
    } = useContext(FlashcardsContext);

    const width = useWindowSize();

    return (
        <div className={css.deck_title_container}>
            <span className="flex-center">
                <Link to="/" className={css.back_arrow}>
                    <img src={`${S3_BUCKET}icons/arrow_long_left_black.svg`} alt=""/>
                </Link>
                <p className={`${css.deck_title} font-big`} >{currentDeck.name}</p> 
            </span>

            <span className={width > 500 ? "flex-center" : css.cards_amound}>
                <p className={`font-medium ${css.vertical_line}`}>Cards left: {flashcardsLeft}</p>
                <p className="font-medium">Total: {currentDeck.count}</p>
            </span>

            {flashcardsLeft > 0 && 
                <div className={css.update_delete_container}>
                    <img 
                        onClick={() => setShowUpdateCard(true)} 
                        src={`${S3_BUCKET}icons/pen_dark_gray.svg`} 
                        alt=""
                    />
                    <img 
                        onClick={() => setShowDeleteCard(true)} 
                        src={`${S3_BUCKET}icons/delete_bin_dark_gray.svg`} 
                        alt=""
                    />
                </div>
            }
        </div>
    )
}

export default ReviewHeader