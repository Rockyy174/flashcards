import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FlashcardsContext } from '../contexts/FlashcardsContext';
import { GlobalContext } from '../contexts/GlobalContext';
import css from '../styles/Login.module.css';



const LoginPage = () => {
    const {
        login, 
        logout, 
        wrongCredentials,
        setWrongCredentials,
        setCurrentTab,
    } = useContext(GlobalContext);

    const {setDecks} = useContext(FlashcardsContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // References
    const loginFormRef = useRef();

    useEffect(() => {
        setCurrentTab('login');
        logout(false);
        setDecks({loaded: false, data:[]});

        return () => {
            setPassword('');
            setUsername('');
        }
    }, [])

    const handleInputChange = (e, setValue) => {
        setValue(e.target.value);
        if(wrongCredentials) {
            setWrongCredentials(false);
        }
    }

    const handleLoginSubmit = e => {
        e.preventDefault();

        // Validation
        if (!username || !password) {
            setWrongCredentials(true);
            return;
        }

        const formData = new FormData(loginFormRef?.current);
        const formObjectData = Object.fromEntries(formData)

        login(formObjectData);
    }

    return (
        <div>
            <form 
                ref={loginFormRef}
                className={`${css.form} column`}
                onSubmit={(e) => handleLoginSubmit(e)}
            >
                <h1 className='font-big'>Log in</h1>

                {/* Username */}
                <input 
                    placeholder='Username' 
                    name='username'
                    type="text" 
                    onChange={(e) => handleInputChange(e, setUsername)} 
                    value={username} 
                    className={wrongCredentials ? css.wrong_input : ''}
                />

                {/* Password */}
                <input 
                    placeholder='Password' 
                    name='password'
                    type="password" 
                    onChange={(e) => handleInputChange(e, setPassword)}
                    value={password}
                    className={wrongCredentials ? css.wrong_input : ''}
                />

                {/* Error messages */}
                {wrongCredentials &&
                <div className={css.error_message}>
                    Username or password not correct
                </div>}

                {/* Submit button */}
                <div className='column'>
                    <button className='btn bg-blue' type='submit'>Login</button>
                    <p>or <Link to='/sign-up'>Sign up</Link></p>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;