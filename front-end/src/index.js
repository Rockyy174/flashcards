import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import './styles/globals.css';
import App from './App';
import { GlobalProvider } from "./contexts/GlobalContext";
import { FlashcardsProvider } from "./contexts/FlashcardsContext";


ReactDOM.render(
    <BrowserRouter>
        <GlobalProvider>
            <FlashcardsProvider>
                <App />
            </FlashcardsProvider>
        </GlobalProvider>
    </BrowserRouter>, 
    document.getElementById('root')
);