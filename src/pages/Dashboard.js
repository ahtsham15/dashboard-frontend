import React, { StrictMode } from "react";
import { fetchData } from "../helpers";
import { Link, useLoaderData } from "react-router-dom";
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import { PlusIcon } from "@heroicons/react/24/solid";
import AddIncomeForm from "../components/AddIncomeForm";
import { createIncome } from "../helpers";
import AddExpenseForm from "../components/AddExpenseForm";
import { createExpense } from "../helpers";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";


export function dashboardLoader() {
  const userName = fetchData("userName");
  const income = fetchData("income")
  const expenses = fetchData("expenses")
  return { userName,income, expenses };
}

export async function dashboardAction({request}){
    const data = await request.formData();
    const {_action,...values} = Object.fromEntries(data);
    console.log(_action)
    if(_action === "newUser"){
        // const userName = data.get("userName");
        try {
            // const formData = Object.fromEntries(data);
            if (!values.userName || values.userName.charAt(0) !== values.userName.charAt(0).toUpperCase()) {
                return toast.error("The first character of the username must be uppercase.");
            }
            localStorage.setItem("userName", JSON.stringify(values.userName));
            return toast.success(`Welcome, ${values.userName}`);   
        } catch (error) {
            return toast.error("User creation failed");
        }
    }
    if(_action === "newIncome"){
        try {
            createIncome({
                name : values.newIncome,
                amount : values.newIncomeAmount,
                description : values.description,
                source : values.source
            })
            return toast.success("Budget created successfully")
        } catch (error) {
            return toast.error("Budget creation Field")
        }
    }

    if(_action === "createExpense"){
        try {
            createExpense({
                name : values.newExpense,
                amount : values.newExpenseAmount,
                description : values.newExpenseDescription,
                budgetId : values.newExpenseBudget
            })
            return toast.success(`Expense ${values.newExpense} created successfully`)
        } catch (error) {
            return toast.error("Expense creation Field")
        }
    }
}

const Dashboard = () => {
  const { userName,income, expenses } = useLoaderData();
  return (
    <div>
      {userName ? (<div className="dashboard">
        <h1>Welcome, <span className="accent">{userName}</span></h1>
        <p>This is your personal dashboard. You can manage your account and your transactions here.</p>
        <div className="grid-sm">
            {
                income && income.length > 0 ? (<div className="grid-lg">
                    <div className="flex-lg">
                        <AddIncomeForm/>
                        <AddExpenseForm income={income}/>
                    </div>
                    <h2>Existing Budget</h2>
                    <div className='budgets'>
                        {
                            income.map((inc)=>(
                                <BudgetItem key={inc.ic} budget={inc} />
                            ))
                        }
                    </div>
                    {
                        expenses && expenses.length > 0 && (
                            <div className="grid-md">
                                <h2>Recent Expenses</h2>
                                <Table expenses={expenses.sort((a,b) => b.createdAt - a.createdAt).slice(0,8)}/>
                                    {
                                        expenses.length > 8 && (
                                            <Link to="expenses" className="btn btn--dark">
                                                View all expenses
                                            </Link>
                                        )
                                    }
                            </div>
                        )
                    }
                </div>) : (
                    <div className="grid-sm">
                        <p>Perosnal Income is the secret to financial freedom.</p>
                        <p>Add your first income to get started.</p>
                        <AddIncomeForm/>
                    </div>
                )
            }
        </div>
      </div>):<Intro/>}
    </div>
  );
};

export default Dashboard;
