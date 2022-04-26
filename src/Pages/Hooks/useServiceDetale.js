import { useEffect, useState } from 'react';

const useServiceDetale = (serviceId) => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/service/${serviceId}`)
            .then(res => res.json())
            .then(data => setServices(data));
    }, [])
    return [services];
};

export default useServiceDetale;