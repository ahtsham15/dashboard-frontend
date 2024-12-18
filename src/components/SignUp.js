
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const SignUp = ({ onBack }) => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            toast.error("Please fill out all fields.");
            return;
        }

        try {
            const csrfToken = Cookies.get('csrftoken');
            const baseURL = process.env.REACT_APP_BASE_URL;
            const response = await axios.post(
                `${baseURL}/api/register/`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken,
                    },
                }
            );
            console.log("response: ",response.data)
            if (response.status === 201) {
                const data = response.data;
                // toast.success("Sign-up successful! Welcome, " + data.username);
                onBack(); // Return to Intro component
            } else if (response.status === 400) {
                // Handle email already exists error
                if (response.data.email) {
                    toast.error(response.data.email[0]); // Display "user with this email already exists"
                } else {
                    toast.error("Signup failed. Please try again.");
                }
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong!");
        }
    };

    return (
        <div className="signup-form">
            <h2>Create Your Account</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Name"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="btn btn--dark">
                    Sign Up
                </button>
            </form>
            <button className="btn btn--light" onClick={onBack}>
                Back
            </button>
        </div>
    );
};

export default SignUp;
