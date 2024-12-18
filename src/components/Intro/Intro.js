
// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import illustration from "../../assets/illustration.jpg";
// import { useNavigate } from "react-router-dom";
// import SignUp from "../SignUp"; // Import the SignUp component

// const Intro = () => {
//     const [showSignUp, setShowSignUp] = useState(false); // State to toggle SignUp form
//     const [loginData, setLoginData] = useState({
//         email: "",
//         password: "",
//     });
//     const navigate = useNavigate(); // Hook to navigate to another page

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setLoginData({
//             ...loginData,
//             [name]: value,
//         });
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         if (!loginData.email || !loginData.password) {
//             toast.error("Please fill in all fields!");
//             return;
//         }

//         try {
//             const baseURL = process.env.REACT_APP_BASE_URL;
//             const response = await axios.post(
//                 `${baseURL}/api/login/`,
//                 loginData,
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );

//             if (response.status === 200) {
//                 const access_token = response.data.data.access;
//                 const username = response.data.data.user.username
//                 let income=0
//                 let expenses=0
//                 console.log("access_token is: ", access_token);
//                 localStorage.setItem("userName",JSON.stringify(username))
//                 localStorage.setItem("income",income)
//                 localStorage.setItem("expenses",expenses)
//                 localStorage.setItem("access_token", access_token);
//                 toast.success(`Welcome back, ${username}`)
//                 axios.defaults.headers['Authorization'] = `Bearer ${access_token}`;
//                 // Navigate to dashboard after successful login
//                 navigate("/dashboard");
//             } else {
//                 toast.error("Invalid email or password");
//             }
//         } catch (error) {
//             toast.error("Invalid email or password");
//             console.error(error); // Log error for debugging
//         }
//     };

//     return (
//         <div className="intro">
//             {!showSignUp ? (
//                 <div>
//                     <h1>
//                         Take control of <span className="accent">Your Money</span>
//                     </h1>
//                     <p>
//                         Personal Budget is the best way to manage your personal finances.
//                     </p>

//                     {/* Login Form */}
//                     <form onSubmit={handleLogin}>
//                         <input
//                             type="email"
//                             name="email"
//                             value={loginData.email}
//                             onChange={handleChange}
//                             required
//                             placeholder="Email Address"
//                             autoComplete="email"
//                         />
//                         <input
//                             type="password"
//                             name="password"
//                             value={loginData.password}
//                             onChange={handleChange}
//                             required
//                             placeholder="Password"
//                             autoComplete="current-password"
//                         />
//                         <button type="submit" className="btn btn--dark">
//                             <span>Login</span>
//                         </button>
//                     </form>

//                     {/* Sign Up Button */}
//                     <button
//                         className="btn btn--light"
//                         onClick={() => setShowSignUp(true)} // Toggle SignUp form
//                     >
//                         Sign Up
//                     </button>
//                 </div>
                
//             ) : (
//                 // Show the SignUp form
//                 <SignUp onBack={() => setShowSignUp(false)} />
//             )}
//             <img src={illustration} alt="illustration" className="abstract-wave"  width={600}/>
//             <ToastContainer />
//         </div>
//     );
// };

// export default Intro;






import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
// import "./Intro.css"; // Import the CSS file
import illustration from "../../assets/illustration.jpg";
import { useNavigate } from "react-router-dom";
import SignUp from "../SignUp"; // Import SignUp component from parent components directory

const Intro = () => {
    const [showSignUp, setShowSignUp] = useState(false); // State to toggle SignUp form
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate(); // Hook to navigate to another page

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!loginData.email || !loginData.password) {
            toast.error("Please fill in all fields!");
            return;
        }

        try {
            const baseURL = process.env.REACT_APP_BASE_URL;
            const response = await axios.post(
                `${baseURL}/api/login/`,
                loginData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                const access_token = response.data.data.access;
                const username = response.data.data.user.username
                let income=0
                let expenses=0
                console.log("access_token is: ", access_token);
                localStorage.setItem("userName",JSON.stringify(username))
                localStorage.setItem("income",income)
                localStorage.setItem("expenses",expenses)
                localStorage.setItem("access_token", access_token);
                toast.success(`Welcome back, ${username}`)
                axios.defaults.headers['Authorization'] = `Bearer ${access_token}`;
                // Navigate to dashboard after successful login
                navigate("/dashboard");
            } else {
                toast.error("Invalid email or password");
            }
        } catch (error) {
            toast.error("Invalid email or password");
            console.error(error); // Log error for debugging
        }
    };

    return (
        <div className="intro">
            {!showSignUp ? (
                <div>
                    <h1>
                        Take control of <span className="accent">Your Money</span>
                    </h1>
                    <p>
                        Personal Budget is the best way to manage your personal finances.
                    </p>

                    {/* Login Form and SignUp Button Row */}
                    <div className="form-row">
                        <form onSubmit={handleLogin} className="login-form">
                            <input
                                type="email"
                                name="email"
                                value={loginData.email}
                                onChange={handleChange}
                                required
                                placeholder="Email Address"
                                autoComplete="email"
                            />
                            <input
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                                required
                                placeholder="Password"
                                autoComplete="current-password"
                            />
                            <button type="submit" className="btn btn--dark">
                                <span>Login</span>
                            </button>
                        </form>

                        {/* Sign Up Button */}
                        <button
                            className="btn btn--light sign-up-btn"
                            onClick={() => setShowSignUp(true)} // Toggle SignUp form
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            ) : (
                // Show the SignUp form
                <SignUp onBack={() => setShowSignUp(false)} />
            )}
            <img src={illustration} alt="illustration" className="abstract-wave" width={600} />
            <ToastContainer />
        </div>
    );
};

export default Intro;

