import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../Services/CocktailService";
import validator from 'validator';

import {FcOk, FcInfo} from 'react-icons/fc';
import {FaTimesCircle } from 'react-icons/fa'
import '../Styles/SignUpSignIn.css'


const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const[emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const[pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const[matchFocus, setMatchFocus] = useState(false);

    const [fname, setFname] = useState('');
    const [validFname, setValidFname] = useState(false)
    const[fnameFocus, setFnameFocus] = useState(false);

    const [lname, setLname] = useState('');
    const [validLname, setValidLname] = useState(false)
    const[lnameFocus, setLnameFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const[success, setSuccess] = useState(false);

    useEffect(()=>{
        userRef.current.focus();
    },[])

    //check if user name is valid
    useEffect(()=>{
        const result = validator.isEmail(email);
        setValidEmail(result);
    },[email])

    //check if first name is not empty
    useEffect(() =>{
        const result = fname.length > 0;
        setValidFname(result);
    }, [fname])

    //check if last name is not empty
    useEffect(() =>{
        const result = lname.length > 0 ;
        setValidLname(result);
    }, [lname])

    //check valid pwd and valid match pwd together
    useEffect(()=>{
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = (pwd === matchPwd) && pwd !== ''
        setValidMatch(match);

    },[pwd, matchPwd])

    //clear the error message everytime the pwd, or username or match pwd is changed 
    useEffect(()=>{
        setErrMsg('')
    },[pwd, email, matchPwd])

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const v1 = validator.isEmail(email)
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2){
            setErrMsg("Invalid Entry");
            return;
        }
            let userObj = {
                userPassword: pwd,
                fname: fname,
                lname: lname,
                email: email
            }
            createUser(userObj)
                .then(response =>{
                    if (response === 200){
                        console.log(response)
                        setSuccess(true)
                        setEmail('');
                        setPwd('');
                        setMatchPwd('');
                        setFname('');
                        setLname('');
                    }
                    else{
                        if(response.message){
                            setErrMsg(response.message)
                        }
                        else{
                            setErrMsg("Signup failed.")
                        }  
                    }
                  
                    
                })
       
        
    }

    return ( 
        <div>
            {success ? (
                <div className="form-container">
                    <section>
                        <h1>Success</h1>
                        <p>
                            <Link to = {`/sign-in`}>Sign in</Link>
                        </p>
                    </section>
                </div>
            ): (
                <div className="form-container">
                <section>
                    <p ref= {errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live = "assertive">{errMsg}</p>
                    <h1 className="title">Register</h1>
                    
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="useremail">
                            User email:
                            <span className={validEmail ? "valid" : "hide"}>
                                <FcOk/>
                            </span>
                            <span className={validEmail || !email ? "hide": "invalid"}>
                                    <FaTimesCircle/>
                            </span>
                        </label>
                        <input
                            type="text"
                            id = "useremail"
                            ref = {userRef}
                            autoComplete = "off"
                            onChange= {(e) => setEmail(e.target.value)}
                            required
                            aria-invalid = {validEmail ? "false" : "true"} //check if valid email
                            aria-describedby = "emailnote" //uidnote: id of requiremnt obj(requiremnt for email field)
                            onFocus = {() => setEmailFocus(true)} //if email is focused
                            onBlur = {() => setEmailFocus(false)} //if email is leaved
                        />
                        <p id = "emailnote"
                            className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FcInfo/>
                            Must have valid email.
                        </p>

                        <label htmlFor="password">
                            Password:
                            <span className={validPwd ? "valid" : "hide"}>
                                <FcOk/>
                            </span>
                            <span className={validPwd || !pwd ? "hide": "invalid"}>
                                <FaTimesCircle/>
                            </span>
                        </label>
                        <input
                            type="password"
                            id = "password"
                            onChange= {(e) => setPwd(e.target.value)}
                            required
                            aria-invalid = {validPwd ? "false" : "true"} //check if valid pwd
                            aria-describedby = "pwdnote"
                            onFocus = {() => setPwdFocus(true)} //if password is focused
                            onBlur = {() => setPwdFocus(false)} //if password is leaved
                        />
                        <p id = "pwdnote"
                            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FcInfo/>
                            8 to 24 characters.<br/>
                            Must include uppsrcase and lowercase letter, a number and a special character.<br/>
                            Allowed special characters: ! @ # $ %
                        </p>

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <span className={validMatch ? "valid" : "hide"}>
                                <FcOk/>
                            </span>
                            <span className={validMatch || !matchPwd ? "hide": "invalid"}>
                                <FaTimesCircle/>
                            </span>
                        </label>
                        <input
                            type="password"
                            id = "confirm_password"
                            onChange= {(e) => setMatchPwd(e.target.value)}
                            required
                            aria-invalid = {validMatch ? "false" : "true"} //check if confirm pwd is same with pwd
                            aria-describedby = "matchnote"
                            onFocus = {() => setMatchFocus(true)} 
                            onBlur = {() => setMatchFocus(false)} 
                        />
                        <p id = "matchnote"
                            className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FcInfo/>
                            Must match the first password field.
                        </p>

                        <label htmlFor="firstname">
                            First Name:
                            <span className={validFname ? "valid" : "hide"}>
                                <FcOk/>
                            </span>
                            <span className={validFname || !fname ? "hide": "invalid"}>
                                <FaTimesCircle/>
                            </span>
                        </label>
                        <input
                            type="text"
                            id = "firstname"
                            onChange= {(e) => setFname(e.target.value)}
                            required
                            aria-invalid = {validFname ? "false" : "true"}
                            aria-describedby = "fnamenote"
                            onFocus = {() => setFnameFocus(true)} 
                            onBlur = {() => setFnameFocus(false)} 
                        />
                        <p id = "fnamenote"
                            className={fnameFocus && !validFname ? "instructions" : "offscreen"}>
                            <FcInfo/>
                            Must have first name.
                        </p>

                        <label htmlFor="lastname">
                            Last Name:
                            <span className={validLname ? "valid" : "hide"}>
                                <FcOk/>
                            </span>
                            <span className={validLname || !lname ? "hide": "invalid"}>
                                <FaTimesCircle/>
                            </span>
                        </label>
                        <input
                            type="text"
                            id = "lastname"
                            onChange= {(e) => setLname(e.target.value)}
                            required
                            aria-invalid = {validLname ? "false" : "true"}
                            aria-describedby = "lnamenote"
                            onFocus = {() => setLnameFocus(true)} 
                            onBlur = {() => setLnameFocus(false)} 
                        />
                        <p id = "lnamenote"
                            className={lnameFocus && !validLname? "instructions" : "offscreen"}>
                            <FcInfo/>
                            Must have last name.
                        </p>

                        
                        <button disabled={!validEmail || !validPwd || !validMatch || !validFname || !validLname ? true : false}
                                className="general-button">
                            Sign Up
                        </button>

                    </form>

                    <p>
                        Already registered?<br/>
                        <span className="line">
                            <Link to={`/sign-in`}>
                                Sign in
                            </Link>
                        </span>
                    </p>
                </section> 
                </div>
            )}
        </div>
    );
}
 
export default Register;