import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FlashcardsContext } from "../contexts/FlashcardsContext";

// CSS
import css from "../styles/Revision.module.css";
import axiosInstance from "../utils/axios";
import ReviewHeader from "../components/review/ReviewHeader";
import ReviewButtons from "../components/review/ReviewButtons";
import useWindowSize from "../utils/useWindowSize";
import { GlobalContext } from "../contexts/GlobalContext";


const initialState = {
    showAnswer: false,
    flashcardsLeft: 0,
    totalFlashcards: 0,
    currentFlashcard: 0,
}

const revisionReducer = (state, action) => {
    switch (action.type) {
        case 'updateInfo':
            return {
                ...state,
                showAnswer: false,
                flashcardsLeft: action.payload,
            };
        case 'showAnswer':
            return {
                ...state,
                showAnswer: true,
            };
    }
}


const ReviewPage = () => {
    const width = useWindowSize();
    const params = useParams();
    // Context
    const {setServerError} = useContext(GlobalContext);
    const {
        loadSingleDeck, 
        loadFlashcards, 
        flashcards, 
        setFlashcards, 
        setCurrentFlashcard,
        currentDeck, 
        setCurrentDeck, 
        showAddFlashcard,
        setShowAddFlashcard, 
        loadDecks,
    } = useContext(FlashcardsContext);

    // useReducer
    const [state, dispatch] = useReducer(revisionReducer, initialState);
    const {flashcardsLeft, currentFlashcard, showAnswer} = state;

    // State
    const [timeAmount, setTimeAmount] = useState({easy: 2, normal: 1, hard: 1})

    // References
    const frontTextRef = useRef();
    const backTextRef = useRef();

    // On flashcard change
    useEffect(() => {
        if (flashcards) {
            const days_accumulated = flashcards[currentFlashcard]?.days_accumulated;
            const card_difficulty = flashcards[currentFlashcard]?.difficulty;
    
            // Hard
            let hardDifficulty = days_accumulated <= 2 ? 1.0 : card_difficulty * 0.8;
            hardDifficulty = hardDifficulty < 0.8 ? hardDifficulty = 0.5 : hardDifficulty;
            const hardDays = days_accumulated <= 2 ? days_accumulated + 1 : days_accumulated - 1;
            hardDifficulty = days_accumulated > 3 ? hardDifficulty = 0.5 : hardDifficulty;
    
            // Normal
            let normalDifficulty = card_difficulty * 1.2;
            const normalDays = days_accumulated == 0 ? days_accumulated + 2 : days_accumulated + 1;
            normalDifficulty = days_accumulated > 2 ? normalDifficulty = 1.0 : normalDifficulty;
    
            // Easy
            const easyDifficulty = card_difficulty * 1.3;
            const easyDays = easyDifficulty < 1.4 ? (easyDifficulty < 1.31 ? days_accumulated + 3 : days_accumulated + 2) : days_accumulated + 1;
    
            setTimeAmount({
                easy: parseInt(easyDifficulty * easyDays),
                easyDays: easyDays,
                easyDifficulty: easyDifficulty,

                normal: parseInt(normalDifficulty * normalDays),
                normalDays: normalDays,
                normalDifficulty: normalDifficulty,

                hard: parseInt(hardDifficulty * hardDays),
                hardDays: hardDays,
                hardDifficulty: hardDifficulty,

            })

            setCurrentFlashcard(flashcards[currentFlashcard]);
        }

        dispatch({type: 'updateInfo', payload: flashcards.length});
        loadSingleDeck(params.id);
    }, [flashcards])
    
    // Load flashcards if needed and decks
    useEffect(() => {
        loadDecks();
        
        if (!currentDeck) {
            loadFlashcards(params.id);
        }
        
    },[])

    // Reload deck after new flashcard is added
    useEffect(() => {
        if (!showAddFlashcard) {
            loadFlashcards(params.id);
        }
    }, [showAddFlashcard])
    
    // Clean up
    useEffect(() => {
        return () => {
            setCurrentDeck(null);
        }
    }, [])

    // Change font-size
    useEffect(() => {
        const front = flashcards[currentFlashcard]?.front.length;
        const back = flashcards[currentFlashcard]?.back.length;

        if (front && back) {
            if (front > 140 || back > 140) {
                if (width > 500) {
                    frontTextRef?.current?.style.setProperty('font-size', '1.8rem')
                    backTextRef?.current?.style.setProperty('font-size', '1.8rem')
                } else if (width > 320) {
                    frontTextRef?.current?.style.setProperty('font-size', '1.4rem')
                    frontTextRef?.current?.style.setProperty('margin-top', '1rem')
                    backTextRef?.current?.style.setProperty('font-size', '1.4rem')
                    backTextRef?.current?.style.setProperty('margin-top', '1rem')
                } else if (width > 280) {
                    frontTextRef?.current?.style.setProperty('font-size', '1.2rem')
                    frontTextRef?.current?.style.setProperty('margin-top', '2rem')
                    backTextRef?.current?.style.setProperty('font-size', '1.2rem')
                    backTextRef?.current?.style.setProperty('margin-top', '2rem')
                } else {
                    frontTextRef?.current?.style.setProperty('font-size', '1rem')
                    frontTextRef?.current?.style.setProperty('margin-top', '2rem')
                    backTextRef?.current?.style.setProperty('font-size', '1rem')
                    backTextRef?.current?.style.setProperty('margin-top', '2rem')
                }
                
            }
            else if (front > 70 || back > 70) {

                if (width > 500) {
                    frontTextRef?.current?.style.setProperty('font-size', '2.2rem')
                    backTextRef?.current?.style.setProperty('font-size', '2.2rem')
                } else if (width > 320) {
                    frontTextRef?.current?.style.setProperty('font-size', '1.4rem')
                    backTextRef?.current?.style.setProperty('font-size', '1.4rem')
                } else if (width > 280) {
                    frontTextRef?.current?.style.setProperty('font-size', '1.2rem')
                    backTextRef?.current?.style.setProperty('font-size', '1.2rem')
                } else {
                    frontTextRef?.current?.style.setProperty('font-size', '1rem')
                    backTextRef?.current?.style.setProperty('font-size', '1rem')
                }
    
            }
            else if (front > 40 || back > 40) {
                if (width > 500) {
                    frontTextRef?.current?.style.setProperty('font-size', '3rem')
                    backTextRef?.current?.style.setProperty('font-size', '3rem')
                } else if (width > 320) {
                    frontTextRef?.current?.style.setProperty('font-size', '2rem')
                    backTextRef?.current?.style.setProperty('font-size', '2rem')
                } else if (width > 280) {
                    frontTextRef?.current?.style.setProperty('font-size', '1.6rem')
                    backTextRef?.current?.style.setProperty('font-size', '1.6rem')
                } else {
                    frontTextRef?.current?.style.setProperty('font-size', '1.2rem')
                    backTextRef?.current?.style.setProperty('font-size', '1.2rem')
                }
            } 
            else if (front > 20 || back > 20) {
                if (width > 500) {
                    frontTextRef?.current?.style.setProperty('font-size', '3.4rem')
                    backTextRef?.current?.style.setProperty('font-size', '3.4rem')
                } else if (width > 320) {
                    frontTextRef?.current?.style.setProperty('font-size', '2.4rem')
                    backTextRef?.current?.style.setProperty('font-size', '2.4rem')
                } else if (width > 280) {
                    frontTextRef?.current?.style.setProperty('font-size', '2rem')
                    backTextRef?.current?.style.setProperty('font-size', '2rem')
                } else {
                    frontTextRef?.current?.style.setProperty('font-size', '1.6rem')
                    backTextRef?.current?.style.setProperty('font-size', '1.6rem')
                }
            } 
            else {
                if (width > 500) {
                    frontTextRef?.current?.style.setProperty('font-size', '4rem')
                    backTextRef?.current?.style.setProperty('font-size', '4rem')
                } else if (width > 320) {
                    frontTextRef?.current?.style.setProperty('font-size', '3rem')
                    backTextRef?.current?.style.setProperty('font-size', '3rem')
                } else if (width > 280) {
                    frontTextRef?.current?.style.setProperty('font-size', '2.5rem')
                    backTextRef?.current?.style.setProperty('font-size', '2.5rem')
                } else {
                    frontTextRef?.current?.style.setProperty('font-size', '2rem')
                    backTextRef?.current?.style.setProperty('font-size', '2rem')
                }
            }
        } 
    }, [flashcards, width, showAnswer])

    const updateCard = (days, difficulty, total, again) => {
        const date = new Date();
        date.setDate(date.getDate() + total);
        const d = date.getDate();
        const m = date.getMonth() + 1;
        const y = date.getFullYear();
        const dateStr = `${y}-${m}-${d}`;

        axiosInstance.put(`update-flashcard/`, {
            ...flashcards[currentFlashcard],
            "difficulty": difficulty,
            "days_accumulated": days,
            "next_review": dateStr,
        })
            .then(res => {
                if (res.status === 200) {
                    if (!again) {
                        const cards = [...flashcards];
                        cards.shift();
                        setFlashcards(cards);
                    } else {
                        const card = flashcards[currentFlashcard];
                        card.days_accumulated = 0;
                        card.difficulty = 1.0;

                        const cards = [...flashcards];
                        cards.shift();
                        cards.push(card);
                        setFlashcards(cards);
                    }
                } else {
                    setServerError(true);
                }
            })
            .catch(() => setServerError(true));
    }    
    

    if (!currentDeck || !flashcards) return <span />

    return (
        <div className='page-container position-relative review-page-container mt-half'>
            <ReviewHeader flashcardsLeft={flashcardsLeft} />

            
            
            {/* If cards left, show them */}
            {flashcardsLeft > 0 ? <>
                <div className={css.front_back_container}>
                    <p ref={frontTextRef}>{flashcards[currentFlashcard]?.front}</p>
                </div>

                <div className={css.border} />

                {showAnswer &&
                <div className={css.front_back_container}>
                    <p ref={backTextRef}>{flashcards[currentFlashcard]?.back}</p>
                </div>}
            </>:
            // Else show message
            <div className={`column-center ${width < 500 && "mt-1"}`}>
                <p className="flex-center text-center font-medium mt-2">
                    {currentDeck && currentDeck.count > 0 ? 
                    'You have reviewed all the flashcards in this deck. Congratulations!' : 
                    'There are no flashcards in this deck yet.'}
                </p>
                <button onClick={() => setShowAddFlashcard(true)} className="btn bg-blue">
                    {currentDeck && currentDeck.count > 0 ? 
                    'Add more flashcards' : 
                    'Add flashcards'}
                </button>
            </div>}
            
            <ReviewButtons 
                dispatch={dispatch} 
                updateCard={updateCard} 
                flashcardsLeft={flashcardsLeft} 
                timeAmount={timeAmount} 
                showAnswer={showAnswer}
            />
        </div>
    )
}

export default ReviewPage;