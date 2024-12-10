import { formatCurrency } from "../helpers";

const BudgetItem = ({budget}) => {
    return (
        <div className="budget">
            {budget.name}
        </div>
    )
}

export default BudgetItem;