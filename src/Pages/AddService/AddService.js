import React from 'react';
import { useForm } from 'react-hook-form';

const AddService = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log(data)
        const url = 'http://localhost:5000/service';
       fetch(url,{
           method:'POST',
           headers:{
               'content-type':'application/json'
           },
           body:JSON.stringify(data)
       })
       .then(res => res.json())
       .then(regult=>{
           console.log(regult);
       })
    };

    return (
        <div className='w-50 mx-auto'>
            <h1>Add a new service</h1>
            <form className=' d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                <input className='py-2 mb-2' placeholder='Name' {...register("name", { required: true, maxLength: 20 })}  />
                <textarea className='py-2 mb-2' placeholder='Description' {...register("description")}  />
                <input className='py-2 mb-2' placeholder='price' type="number" {...register("price")}  />
                <input className='py-2 mb-2' placeholder='Potho Url' {...register("img")}  />
                <input type="submit" value='Add user' />
            </form>
        </div>
    );
};

export default AddService;