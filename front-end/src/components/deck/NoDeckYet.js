import { useContext } from "react";
import { FlashcardsContext } from "../../contexts/FlashcardsContext";



const NoDeckYet = () => {
    const {setShowAddDeck} = useContext(FlashcardsContext);


    return (
        <div className="column-center">
            <p className="font-medium mt-2 text-center">You don't have any deck of flashcards yet!</p>
            <button onClick={() => setShowAddDeck(true)} className="btn bg-blue">Add deck</button>
        </div>
    )
}

export default NoDeckYet;