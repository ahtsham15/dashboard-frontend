import { fetchData } from "../helpers";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Intro from "../components/Intro/Intro";
import { createIncome } from "../helpers";
import AddIncomeForm from "../components/Incomes/AddIncomeForm";
import AddExpenseForm from "../components/Expenses/AddExpenseForm";
import IncomeList from "../components/IncomeList/IncomeList";
import ExpenseList from "../components/Expenses/ExpenseList"; // Import the ExpenseList component
import './Dashboard.css'; // Import the CSS file for styling

export function dashboardLoader() {
  const userName = fetchData("userName");
  const income = fetchData("income");
  const expenses = fetchData("expenses");
  return { userName, income, expenses };
}

export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
}

const Dashboard = () => {
  const { userName, expenses, income } = useLoaderData();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    setIsLoggedIn(!!accessToken);
  }, []);

  if (!isLoggedIn) {
    return <Intro />;
  }

  const userId = "3"; // Replace with dynamic user ID if needed

  const handleIncomeCreation = () => {
    setRefreshFlag(prev => !prev); // Trigger re-fetch of IncomeList
  };

  return (
    <div>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome, <span className="accent">{userName}</span>
          </h1>
          <p>
            This is your personal dashboard. You can manage your account and your transactions here.
          </p>
          <div className="grid-sm">
            {/* Grid for forms */}
            <div className="form-row">
              <AddIncomeForm onIncomeCreate={handleIncomeCreation} />
              <AddExpenseForm income={income} />
            </div>

            {/* Show Income List and Expense List in a row */}
            <div className="list-container">
              <div className="list-item">
                <IncomeList userId={userId} refreshFlag={refreshFlag} />
              </div>
              <div className="list-item">
                <ExpenseList userId={userId} refreshFlag={refreshFlag} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </div>
  );
};

export default Dashboard;


