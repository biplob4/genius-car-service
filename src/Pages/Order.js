import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';

const Order = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const nevigate = useNavigate();

    useEffect(() => {
        const getOrders = async () => {
            const email = user?.email;
            const url = `http://localhost:5000/order?email=${email}`;
            try {
                const { data } = await axios.get(url, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setOrders(data)
            }
            catch (error) {
                console.log(error);
                if(error.respons.status === 401 || error.respons.status === 403){
                    signOut(auth)
                    nevigate('/login');
                }
            }
        }
        getOrders();
    }, [user])
    
    return (
        <div>
            <h1>your orders: {orders.length}</h1>
        </div>
    );
};

export default Order;