import { useLoaderData } from "react-router-dom";
import { fetchData } from "../helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";


export function expensesLoader() {
    const expenses = fetchData("expenses")
    return { expenses };
  }

export async function deleteExpenseAction({request}) {
    const formData = await request.formData();
    const {_action, ...values} = Object.fromEntries(formData);
    if(_action === "deleteExpense"){
        try {
            deleteItem({
                key: "expenses",
                id: values.expenseId    
            })
            console.log("values of the object:",values)
            return toast.success(`Expense deleted successfully`)
        } catch (error) {
            return toast.error("Expense deletion Field")
        }
    }
}

const ExpensesPage = () => {
    const {expenses} = useLoaderData();
    return (
        <div className="grid-lg">
            <h1>All Expenses</h1>
            {
                expenses && expenses.length >  0
                ? (
                    <div className="grid-md">
                        <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                        <Table expenses={expenses.sort((a,b) => b.createdAt - a.createdAt).slice(0,6)}/>
                    </div>
                ): <p>No expenses to show</p>
            }
        </div>
    )
}

export default ExpensesPage;