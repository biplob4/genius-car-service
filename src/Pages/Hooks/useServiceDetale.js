import { useEffect, useState } from 'react';

const useServiceDetale = (serviceId) => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch(`https://guarded-mesa-83047.herokuapp.com/service/${serviceId}`)
            .then(res => res.json())
            .then(data => setServices(data));
    }, [])
    return [services];
};

export default useServiceDetale;