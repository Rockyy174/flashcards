const RealoadDecks = ({realodDecks}) => {

    return (
        <div className="column-center">
            <p className="font-medium mt-2 text-center">It was not possible to load your decks of flashcards.</p>
            <button onClick={realodDecks} className="btn bg-blue">Try again</button>
        </div>
    )
}

export default RealoadDecks;