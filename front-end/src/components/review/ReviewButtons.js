import useWindowSize from '../../utils/useWindowSize';

import css from '../../styles/Revision.module.css';


const ReviewButtons = ({dispatch, updateCard, flashcardsLeft, timeAmount, showAnswer}) => {
    const width = useWindowSize();
    
    const nextCard = (level) => {
        switch (level) {
            case 'again': 
                updateCard(0, 1.0, 0, true);
                break;

            case 'hard':
                updateCard(timeAmount.hardDays, timeAmount.hardDifficulty, timeAmount.hard, false);
                break;
                
            case 'normal':
            updateCard(timeAmount.normalDays, timeAmount.normalDifficulty, timeAmount.normal, false);
            break;
            
            case 'easy':
            updateCard(timeAmount.easyDays, timeAmount.easyDifficulty, timeAmount.easy, false);
            break;
        }
        
    }

    if (flashcardsLeft < 1) return <span />
    
    return (
        <>
            {!showAnswer ?
                // Show answer button
                <div className={`${css.show_answer_btn} flex-center`}>
                    <button onClick={() => dispatch({type: 'showAnswer'})} className="btn bg-blue">SHOW ANSWER</button>
                </div>
            :
                // Difficulty buttons
                <div className={`${css.show_answer_btn} flex-center ${width < 320 && 'little-gap'}`}>
                    <button onClick={() => nextCard('again')} className="btn column-center no-gap btn-small-font">
                        <span className="font-small">end of deck</span>
                        VERY HARD
                    </button>
                    <button onClick={() => nextCard('hard')} className="btn bg-red column-center no-gap btn-small-font">
                        <span className="font-small white-color">{timeAmount.hard > 1 ? `${timeAmount.hard} days` : `${timeAmount.hard} day`}</span>
                        HARD
                    </button>
                    <button onClick={() => nextCard('normal')} className="btn bg-blue column-center no-gap btn-small-font">
                        <span className="font-small white-color">{timeAmount.normal > 1 ? `${timeAmount.normal} days` : `${timeAmount.normal} day`}</span>
                        NORMAL
                    </button>
                    <button onClick={() => nextCard('easy')} className="btn bg-green column-center no-gap btn-small-font">
                        <span className="font-small white-color">{timeAmount.easy > 1 ? `${timeAmount.easy} days` : `${timeAmount.easy} day`}</span>
                        EASY
                    </button>
                </div>    
            }
        </>
    )
}

export default ReviewButtons;