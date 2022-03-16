import { useContext } from "react";
import { Link } from "react-router-dom";
import useWindowSize from "../../utils/useWindowSize";

import { FlashcardsContext } from "../../contexts/FlashcardsContext";
import { GlobalContext } from "../../contexts/GlobalContext";

import { LOGIN_ROUTE, SIGNUP_ROUTE } from "../../constants/routes";

//Styles
import css from '../../styles/navigation/Navbar.module.css';
import NavIcon from "./NavIcon";


const DesktopNavbar = () => {
	const {logout, isAuthenticated, currentTab} = useContext(GlobalContext);
	const {decks, setShowAddFlashcard, setShowAddDeck} = useContext(FlashcardsContext);

	const width = useWindowSize();

	const showFlashcardsForm = () => {
		setShowAddFlashcard(true);
	}

	const addOptions = decks.data.length > 0 ? [
		{text: 'Add Flashcard', action: showFlashcardsForm}, 
		{text: 'Add Deck', action: () => setShowAddDeck(true)},
	] : [
		{text: 'Add Deck', action: () => setShowAddDeck(true)},
	];

	return (
		<nav className={css.navbar}>
			<div className={css.nav_container}>
				<Link to={isAuthenticated ? '/' : '/login'} className={css.nav_logo}>
					Flashcards
				</Link>
				<div className={css.links_container}>
					{isAuthenticated ? <>
						{width > 350 && <NavIcon iconSize="22px" icon="add_black.svg" options={addOptions} />}
						<NavIcon iconSize="32px" icon="arrow_drop_down_black.svg" options={[{text: 'Log Out', action: logout}]} />
					</> : <>
						{currentTab !== 'login' && <Link className={css.nav_link} to={LOGIN_ROUTE}>Log in</Link>}
						{currentTab !== 'register' && <Link className={css.nav_link} to={SIGNUP_ROUTE}>Sign up</Link>}
					</>}
				</div>
			</div>
		</nav>
	)
}

export default DesktopNavbar;