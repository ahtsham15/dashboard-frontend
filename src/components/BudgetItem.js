import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers";


const BudgetItem = ({budget}) => {
    // const {name,amount,description,date} = budget;
    const {id,name,amount,description,date} = budget;
    const spent = calculateSpentByBudget(id);
    return (
        <div className="budget">
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)}</p>
            </div>
            <progress max={amount} value={spent}>
                {formatPercentage(spent/amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)}   spent</small>
                <small>{formatCurrency(amount - spent)}   remaining</small>
            </div>
            {/* {budget.name} */}
        </div>
    )
}

export default BudgetItem;