import { useLoaderData, useParams } from "react-router-dom";
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/Expenses/AddExpenseForm";
import Table from "../components/Table";
import { toast } from "react-toastify";
import axios from "axios";  // Import axios

// Function to load the budget and expenses data
export async function budgetLoader({ params }) {
    const budget = await getAllMatchingItems({
        category: "income",
        key: "id",
        value: params.id
    })[0];

    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id
    });

    if (!budget) {
        throw new Error("Budget not found");
    }

    // Fetch income data using axios
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/incomes/3`);
        console.log("response Data:",response)
        const incomeData = response.data; // Extract income data from the response
        return { budget, expenses, incomeData }; // Pass income data to the page component
    } catch (error) {
        console.error("Error fetching income data:", error);
        return { budget, expenses, incomeData: null }; // Return null if there is an error
    }
}

// Function to handle actions like creating and deleting expenses
export async function budgetAction({ request }) {
    const formData = await request.formData();
    const { _action, ...values } = Object.fromEntries(formData);

    if (_action === "createExpense") {
        try {
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                description: values.newExpenseDescription,
                budgetId: values.newExpenseBudget
            });
            return toast.success(`Expense ${values.newExpense} created successfully`);
        } catch (error) {
            return toast.error("Expense creation failed");
        }
    }

    if (_action === "deleteExpense") {
        try {
            deleteItem({
                key: "expenses",
                id: values.expenseId
            });
            return toast.success(`Expense deleted successfully`);
        } catch (error) {
            return toast.error("Expense deletion failed");
        }
    }
}

export default function BudgetPage() {
    const { budget, expenses, incomeData } = useLoaderData(); // Get income data along with budget and expenses
    const { id } = useParams();

    return (
        <div className="grid-lg">
            <h1 className="h2">
                <span className="accent">{budget.name}{" "}</span>Overview
            </h1>
            <div className="flex-lg">
                {/* Pass incomeData to AddExpenseForm and BudgetItem components */}
                <BudgetItem budget={budget} incomeData={incomeData} />
                <AddExpenseForm income={incomeData} />
            </div>
            {expenses && expenses.length > 0 && (
                <div className="grid-md">
                    <h2>
                        <span className="accent">{budget.name}</span>
                    </h2>
                    <Table expenses={expenses} showBudget={false} />
                </div>
            )}
        </div>
    );
}
