import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import './Shipment.css';
import { UserContext } from '../../App';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => console.log(data);

    console.log(watch("example"));

    return (

        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue={loggedInUser.name}  {...register("name",{ required: true })} placeholder="Your name" />
            {errors.name && <span className="error">Name is required</span>}

            <input defaultValue={loggedInUser.email} {...register("email",{ required: true })} placeholder="Your email" />
            {errors.email && <span className="error">Email is required</span>}

            <input  {...register("address",{ required: true })} placeholder="Your address" />
            {errors.address && <span className="error">address is required</span>}

            <input  {...register("phone",{ required: true })} placeholder="Your Phone" />
            {errors.phone && <span className="error">phone is required</span>}
            <input type="submit" />
        </form>
    );
};

export default Shipment;