import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import './Register.css';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import Lodding from '../../Shared/Lodding/Lodding';
import useToken from '../../Hooks/useToken';
// import { async } from '@firebase/util';

const Register = () => {
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [agree, setAgree] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const [token] = useToken(user);

    const navigateLogin = () => {
        navigate('/login');
    }

    const handleRegister = async event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        // const agree = event.target.trems.checked; 
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
    }

    if (token){
        navigate(from, { replace: true });
    }
    if(updating || loading){
        return <Lodding/>
    }

    return (
        <div className='register-form border mt-5 rounded'>
            <h2 className='text-primary mb-4' style={{ textAlign: 'center' }}>Please Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" name="name" placeholder='Your Name' required />
                <input type="email" name="email" placeholder='Email Address' required />
                <input type="password" name="password" placeholder='Password' required />

                <input onClick={() => setAgree(!agree)} className='text-secondary my-3 me-2' type="checkbox" name="trems" id="trems" />
                <label className={agree ? 'text-secondary' : 'text-danger'} htmlFor="trems">Accept Trems And Conditions</label>

                <input disabled={!agree} className='btn btn-primary d-block w-50 mx-auto' type="submit" value="Register" />
            </form>
            <p>Already have an account? <Link to="/login" className=' text-primary pe-auto text-decoration-none' onClick={navigateLogin}>Please Login</Link> </p>
            <SocialLogin />
        </div>
    );
};

export default Register;