import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import css from '../styles/Login.module.css';


const SignupPage = () => {
    const {
        logout, 
        signup, 
        setCurrentTab,

        usernameTaken, setUsernameTaken,
        emailTaken, setEmailTaken,
    } = useContext(GlobalContext);

    // Credentials
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    });
    
    // Errors
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [registerNameMissing, setRegisterNameMissing] = useState(false);
    const [registerEmailMissing, setRegisterEmailMissing] = useState(false);
    const [registerPasswordMissing, setRegisterPasswordMissing] = useState(false);

    // References
    const formRef = useRef(null);

    useEffect(() => {
        setCurrentTab('register')
        logout(false);

        return () => {
            setCredentials({
                username: '',
                email: '',
                password1: '',
                password2: '',
            });}
    }, [])

    const handleInputChange = (e, field) => {
        e.preventDefault();

        if (!isPasswordValid) setIsPasswordValid(true);

        if (registerNameMissing) setRegisterNameMissing(false);

        if (registerEmailMissing) setRegisterEmailMissing(false);

        if (registerPasswordMissing) setRegisterPasswordMissing(false);

        if (usernameTaken) setUsernameTaken(false);
        
        if (emailTaken) setEmailTaken(false);

        switch (field) {
            case 'username':
                setCredentials({
                    ...credentials,
                    username: e.target.value,
                })
                break;
            case 'email':
                setCredentials({
                    ...credentials,
                    email: e.target.value,
                })
                break;
            case 'password1':
                setCredentials({
                    ...credentials,
                    password1: e.target.value,
                })
                break;
            case 'password2':
                setCredentials({
                    ...credentials,
                    password2: e.target.value,
                })
                break;
        }
    }

    const handleSignupSubmit = e => {
        e.preventDefault()

        // Validation
        if (!credentials.username) {
            setRegisterNameMissing(true);
            return;
        }
        if (!credentials.email) {
            setRegisterEmailMissing(true);
            return;
        }
        if (credentials.password1 !== credentials.password2) {
            setIsPasswordValid(false);
            return;
        }
        if (!credentials.password1 || !credentials.password2) {
            setRegisterPasswordMissing(true);
            return;
        }

        const formData = new FormData(formRef?.current);
        const formObjectData = Object.fromEntries(formData);

        signup(formObjectData);
    }

    return (
        <div>
            <form 
                className={`${css.form} column`}
                onSubmit={(e) => handleSignupSubmit(e)}
                ref={formRef}
            >
                <h1 className='font-big'>Sign up</h1>
                {/* Username */}
                <input 
                    className={registerNameMissing || usernameTaken ? css.wrong_input : ''}
                    name='username'
                    placeholder='Username' 
                    type="text" 
                    onChange={(e) => handleInputChange(e, 'username')} 
                    value={credentials.username}
                />
                {/* Email  */}
                <input 
                    className={registerEmailMissing || emailTaken ? css.wrong_input : ''}
                    name='email'
                    placeholder='Email' 
                    type="email" 
                    onChange={(e) => handleInputChange(e, 'email')} 
                    value={credentials.email}
                />
                {/* Password 1 */}
                <input 
                    className={!isPasswordValid || registerPasswordMissing ? css.wrong_input : ''}
                    name='password'
                    placeholder='Password' 
                    type="password"
                    onChange={(e) => handleInputChange(e, 'password1')} 
                    value={credentials.password1}
                    />
                {/* Password 2 */}
                <input 
                    className={!isPasswordValid || registerPasswordMissing ? css.wrong_input : ''}
                    placeholder='Confirm password' 
                    type="password"
                    onChange={(e) => handleInputChange(e, 'password2')} 
                    value={credentials.password2}
                />
                
                {/* Error messages */}
                {!isPasswordValid &&
                <div className={css.error_message}>
                    Passwords must be the same
                </div>}

                {registerNameMissing && 
                <div className={css.error_message}>
                    Username is missing
                </div>}
                
                {registerEmailMissing && 
                <div className={css.error_message}>
                    Email is missing
                </div>}
                
                {registerPasswordMissing && 
                <div className={css.error_message}>
                    Password is missing
                </div>}

                {usernameTaken && 
                <div className={css.error_message}>
                    This username is already taken
                </div>}

                {emailTaken && 
                <div className={css.error_message}>
                    This email is already taken
                </div>}
                
                {/* Submit button */}
                <div className='column'>
                    <button className='btn bg-blue' type='submit'>Sign up</button>
                    <p>or <Link to='/login'>Log in</Link></p>
                </div>
            </form>
        </div>
    )
}

export default SignupPage;