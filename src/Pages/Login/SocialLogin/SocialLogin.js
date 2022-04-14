import React from 'react';
import feacebook from '../../../images/googleLogo/Facebook-logo.png'
import github from '../../../images/googleLogo/github.png'
import google from '../../../images/google-logo.png'
import auth from '../../../firebase.init';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import Lodding from '../../Shared/Lodding/Lodding';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
    const navegait = useNavigate();

    if(loading || loading1){
        return <Lodding/>
    }

    let errorElement;
    if (error || error1) {
        <p className='text-danger text-center'>Error: {error?.message}{error1?.message}</p>
    }

    if (user || user1) {
        navegait("/home")
    }
    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: '1px' }} className='bg-info w-50'></div>
                <p className='mt-2 px-2'>or</p>
                <div style={{ height: '1px' }} className='bg-info w-50'></div>
            </div>
            {errorElement}

            <button onClick={() => signInWithGoogle()} className=' btn btn-info w-100 d-block mx-auto'>
                <img style={{ width: "26px", marginRight: "10px" }} src={google} alt="imaige" />
                <span>Google Signin</span>
            </button>
            <button className=' btn btn-info w-100 d-block mx-auto my-3'>
                <img style={{ width: "30px", marginRight: "10px" }} src={feacebook} alt="imaige" />
                <span>Feacebook Signin</span>
            </button>
            <button onClick={() => signInWithGithub()} className=' btn btn-info w-100 d-block mx-auto'>
                <img style={{ width: "26px", marginRight: "10px" }} src={github} alt="imaige" />
                <span>Github Signin</span>
            </button>
        </div>
    );
};

export default SocialLogin;