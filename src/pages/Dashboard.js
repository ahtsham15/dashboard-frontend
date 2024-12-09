import React from "react";
import { fetchData } from "../helpers";
import { useLoaderData } from "react-router-dom";
import Intro from "../components/Intro";
import { toast } from "react-toastify";
export function dashboardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

export async function dashboardAction({request}){
    const data = await request.formData();
    // const userName = data.get("userName");
    try {
        const formData = Object.fromEntries(data);
        localStorage.setItem("userName", JSON.stringify(formData.userName));
        return toast.success(`Welcome, ${formData.userName}`);   
    } catch (error) {
        return toast.error("User creation failed");
    }
    // return redirect("/");
}

const Dashboard = () => {
  const { userName } = useLoaderData();
  return (
    <div>
        {/* <h1>{userName}</h1> */}
      {/* <h1>Dashboard</h1> */}
      {userName ? (<p>{userName}</p>):<Intro/>}
    </div>
  );
};

export default Dashboard;
