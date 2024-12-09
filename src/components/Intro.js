import React, { useState } from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import illustration from "../assets/illustration.jpg";
import { Form } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Intro = () => {
    return <div className="intro">
        <div>
            <h1>
                Take control of <span className="accent">Your Money</span>
            </h1>
            <p>
                Personal Budget is the best way to manage your personal finances.
            </p>
            <Form method="post">
                <input type="text" name="userName" required placeholder="Your Name" autoComplete="given-name"/>
                <button type="submit" className="btn btn--dark"><span>Create Account</span><UserPlusIcon width={20} /></button>
            </Form>
        </div>
        <img src={illustration} alt="illustration" className="abstract-wave"  width={600}/>
        <ToastContainer/>
    </div>;
};

export default Intro;

// action="/dashboard"