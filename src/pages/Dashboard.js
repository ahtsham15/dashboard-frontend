import React from "react";
import { fetchData } from "../helpers";
import { useLoaderData } from "react-router-dom";
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import { PlusIcon } from "@heroicons/react/24/solid";
import AddIncomeForm from "../components/AddIncomeForm";


export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budget")
  return { userName };
}

export async function dashboardAction({request}){
    const data = await request.formData();
    // const userName = data.get("userName");
    try {
        const formData = Object.fromEntries(data);
        if (!formData.userName || formData.userName.charAt(0) !== formData.userName.charAt(0).toUpperCase()) {
            return toast.error("The first character of the username must be uppercase.");
        }
        localStorage.setItem("userName", JSON.stringify(formData.userName));
        return toast.success(`Welcome, ${formData.userName}`);   
    } catch (error) {
        return toast.error("User creation failed");
    }
    // return redirect("/");
}

const Dashboard = () => {
  const { userName,budgets } = useLoaderData();
  return (
    <div>
        {/* <h1>{userName}</h1> */}
      {/* <h1>Dashboard</h1> */}
      {userName ? (<div className="dashboard">
        <h1>Welcome, <span className="accent">{userName}</span></h1>
        <p>This is your personal dashboard. You can manage your account and your transactions here.</p>
        <div className="grid-sm">
            {/* {budgets ? ():()} */}
            <div className="grid-lg">
                <div className="flex-lg">
                    <AddIncomeForm/>
                </div>
            </div>
        </div>
        {/* <div className="flex-md">
            <button className="btn btn--dark">
                <span>Add Transaction</span>
                <PlusIcon width={20}/>
            </button>
        </div> */}
      </div>):<Intro/>}
    </div>
  );
};

export default Dashboard;
