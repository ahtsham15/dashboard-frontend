import { Link, useFetcher } from "react-router-dom";
import { formatCurrency, formatDateToLocalString, getAllMatchingItems } from "../helpers";
import { TrashIcon } from "@heroicons/react/24/solid";

const ExpenseItem = ({expense}) => {
    const fetcher = useFetcher()
    const budget = getAllMatchingItems({
        category: "income",
        key: "id",
        value: expense.budgetId
    })[0];
    console.log(budget)
    return (
        <>
            <td>{expense.name}</td>
            <td>{formatCurrency(expense.amount)}</td>
            <td>{formatDateToLocalString(expense.date)}</td>
            <td>{expense.category}</td>
            <td><Link to={`/budget/${budget.id}`}>{budget.name}</Link></td>
            <td>
                <fetcher.Form method="post">
                    <input type="hidden" name="_action" value="deleteExpense"/>
                    <input type="hidden" name="expenseId" value={expense.id}/>
                    <button type="submit" className="btn btn--warning" aria-label={`Delete ${expense.name} expense`}>
                        <TrashIcon width={20}/>
                    </button>
                </fetcher.Form>
            </td>
        </>
    )   
}

export default ExpenseItem;