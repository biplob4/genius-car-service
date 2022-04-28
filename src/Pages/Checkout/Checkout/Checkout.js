import React from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetale from '../../Hooks/useServiceDetale';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const { serviceId } = useParams();
    const [services] = useServiceDetale(serviceId);
    const [user] = useAuthState(auth)

    // const [user, setUser] = useState({
    //     name: 'Akbar The Great',
    //     email: 'akbar@momo.taj',
    //     address: 'Tajmohol Road Md.pur',
    //     phone: '01711111111'
    // });

    // const handleAddressChange = event =>{
    //     console.log(event.target.value);
    //     const {address, ...rest} = user;
    //     const newAddress = event.target.value;
    //     const newUser = {address: newAddress, ...rest};
    //     console.log(newUser);
    //     setUser(newUser);
    // }

    const handelSubmit = (e) => {
        e.preventDefault();
        const order = {
            email: user.email,
            service: services.name,
            serviceId: serviceId,
            address: e.target.address.value,
            phone: e.target.phone.value
        }
        axios.post('https://guarded-mesa-83047.herokuapp.com/order', order)
            .then(res => {
                const { data } = res;
                if (data.insertedId) {
                    toast('Your Order Is Booked !!!');
                    e.target.reset();
                }
            })
    }

    return (
        <div className='w-50 mx-auto'>
            <h2 className='text-primary text-center'>Please Order :{services.name}</h2>
            <form onSubmit={handelSubmit}>
                <input className='w-100 mb-2 p-2' type="text" name='name' value={user?.displayName} placeholder='name' required readOnly /><br />
                <input className='w-100 mb-2 p-2' type="email" name='email' value={user?.email} placeholder='email' required disabled /><br />
                <input className='w-100 mb-2 p-2' type="text" value={services.name} name='service' placeholder='service' required readOnly /><br />
                <input className='w-100 mb-2 p-2' type="text" name='address' placeholder='address' required /><br />
                <input className='w-100 mb-2 p-2' type="text" name='phone' placeholder='phone' required /><br />
                <input className='btn btn-info' type="submit" value="Place Order" />
            </form>
        </div>
    );
};

export default Checkout;