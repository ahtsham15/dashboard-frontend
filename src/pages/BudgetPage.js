import { useLoaderData, useParams } from "react-router-dom";
import { deleteItem, getAllMatchingItems } from "../helpers";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { toast } from "react-toastify";

export async function budgetLoader({params}){
    const budget = await getAllMatchingItems({
        category: "income",
        key:"id",
        value: params.id
    })[0];

    const expenses = await getAllMatchingItems({
        category: "expenses",
        key:"budgetId",
        value: params.id
    });

    if(!budget){
        throw new Error("Budget not found")
    }

    return {budget, expenses};
}


export async function budgetAction({request}) {
    const formData = await request.formData();
    const {_action, ...values} = Object.fromEntries(formData);

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

export default function BudgetPage(){
    const {budget, expenses} = useLoaderData();
    const {id} = useParams();
    return <div className="grid-lg">
        <h1 className="h2">
            <span className="accent">{budget.name}{" "} </span>
            Overview
        </h1>
        <div className="flex-lg">
            <BudgetItem budget={budget} />
            <AddExpenseForm income={[budget]}/>
        </div>
        {
            expenses && expenses.length > 0 && (
                <div className="grid-md">
                    <h2>
                        <span className="accent">{budget.name}</span>
                    </h2>
                    <Table expenses={expenses} showBudget={false} />
                </div>
            )
        }
    </div>
}