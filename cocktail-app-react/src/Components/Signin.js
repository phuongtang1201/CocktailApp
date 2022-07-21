import { signin } from '../Services/CocktailService';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

import '../Styles/SignUpSignIn.css'


const Signin = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [pwd, email])

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent reload the page(default action after submit a form)
        let obj = {
            email: email,
            userPassword: pwd
        }

        signin(obj)
            .then(response => {
                if (response?.accessToken) {
                    const accessToken = response?.accessToken;
                    setAuth({ email, pwd, accessToken });
                    setEmail('');
                    setPwd('');

                    navigate(from, { replace: true });

                }
                else {
                    if (response?.status === 400) {
                        setErrMsg('Missing Username or password');
                    } else if (response?.status === 401) {
                        setErrMsg('Unauthorized');
                    } else {
                        setErrMsg('Login Failed')
                    }
                    errRef.current.focus();
                }
            })

    }
    return (
        <div className='form-container'>
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h2 className="title">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='useremail'>
                        Email
                    </label>
                    <input
                        type="text"
                        id="useremail"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <label htmlFor='userpassword'>
                        Password
                    </label>
                    <input
                        type="password"
                        id="userpassword"
                        autoComplete="off"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />

                    <button className='general-button'>
                        Sign In
                    </button>

                </form>
                <p>
                    Need an Account?<br />
                    <span className="line">
                        <Link to={`/sign-up`}>
                            Sign Up
                        </Link>
                    </span>
                </p>

            </section>
        </div>

    );
}

export default Signin;