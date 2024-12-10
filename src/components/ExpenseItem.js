import { formatCurrency, formatDateToLocalString } from "../helpers";

const ExpenseItem = ({expense}) => {
    return (
        <>
            <td>{expense.name}</td>
            <td>{formatCurrency(expense.amount)}</td>
            <td>{formatDateToLocalString(expense.date)}</td>
            <td>{expense.category}</td>
        </>
    )
}

export default ExpenseItem;