import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalContext } from "./contexts/GlobalContext";
import { FlashcardsContext } from "./contexts/FlashcardsContext";

// Pages
import DecksPage from "./pages/DecksPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ReviewPage from "./pages/ReviewPage";

// Components
import ServerError from "./components/general/ServerError";
import DesktopNavbar from "./components/navigation/DesktopNavbar";
import PrivateRoute from "./components/navigation/PrivateRoute";
import AddFlashcards from "./components/general/AddFlashcards";
import AddDecks from "./components/general/AddDecks";
import UpdateFlashcard from "./components/general/UpdateFlashcard";
import DeleteFlashcard from "./components/general/DeleteFlashcard";

// Constants
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants/constants";
import { LOGIN_ROUTE, REVIEW_ROUTE, SIGNUP_ROUTE } from "./constants/routes";



function App() {
  const {setIsAuthenticated, serverError, refreshToken} = useContext(GlobalContext);
  const {showUpdateCard, showDeleteCard} = useContext(FlashcardsContext);

  useEffect(() => {
    const access = ACCESS_TOKEN;
    const refresh = REFRESH_TOKEN;

    if (access && refresh) {
        refreshToken();
    } else {
      setIsAuthenticated(false);
    }
    
  }, [])

  return (
      <>
        <DesktopNavbar />
        <Routes>
          <Route path="/" element={<PrivateRoute><DecksPage /></PrivateRoute>} />
          <Route path={`${REVIEW_ROUTE}/:id/`} element={<PrivateRoute><ReviewPage /></PrivateRoute>} />
          <Route path={LOGIN_ROUTE} element={<LoginPage />} />
          <Route path={SIGNUP_ROUTE} element={<SignupPage />} />
        </Routes>

        {serverError && <ServerError />}
         <AddFlashcards />
        <AddDecks />
        {showUpdateCard && <UpdateFlashcard />}
        {showDeleteCard && <DeleteFlashcard />}
      </>
  );
}

export default App;
