import React, { useEffect, useState } from 'react';

const Manag = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('https://guarded-mesa-83047.herokuapp.com/service')
            .then(res => res.json())
            .then(data => setServices(data));
    }, [])

    const deleteHandeler = id => {
        const url = `https://guarded-mesa-83047.herokuapp.com/service/${id}`
        const agrre = window.confirm('are you sure');
        if (agrre) {
            fetch(url, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    const remainning = services.filter(service => service._id !== id);
                    setServices(remainning);
                })
        }
    }

    return (
        <div className='w-50 mx-auto text-center text-primary'>
            <h1 className='text-secondary'>manag user</h1>
            {
                services.map(service => <div key={service._id}>
                    <h4>{service.name} <button onClick={() => deleteHandeler(service._id)}>X</button> </h4>
                </div>)
            }
        </div>
    );
};

export default Manag;