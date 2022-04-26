import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lodding from '../../Shared/Lodding/Lodding';
import axios from 'axios';

const Login = () => {
    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    if (user) {
        // navigate(from, { replace: true });
    }

    if (loading || sending) {
        return <Lodding />
    }

    let errorElement;
    if (error) {
        errorElement = <p className='text-danger text-center'>Error: {error?.message}</p>
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        await signInWithEmailAndPassword(email, password);

        // jwt post data use axios
        const { data } = await axios.post('http://localhost:5000/login', { email });
        localStorage.setItem('accessToken', data.accessToken);
        navigate(from, { replace: true });

    }

    const forgetPasswordHandeler = async () => {
        const email = emailRef.current.value;
        await sendPasswordResetEmail(email);
        if (email) {
            toast('Sent email');
        }
        else {
            toast("Please Type Your Email")
        }
    }

    const navigateRegister = event => {
        navigate('/register');
    }

    return (
        <div className='container register-form mx-auto  mt-5 border rounded'>
            <h2 className='text-primary text-center mt-4'>Please Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>
                {errorElement}

                <Button className='w-50 d-block mx-auto mb-2' variant="primary" type="submit">Login</Button>
            </Form>

            <p>New to Genius Car? <Link to="/register" className='text-primary pe-auto text-decoration-none' onClick={navigateRegister}>Please Register</Link> </p>
            <p>Forget Password ?<button className='btn btn-link text-primary pe-auto text-decoration-none' onClick={forgetPasswordHandeler}>Reset Password</button> </p>

            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;