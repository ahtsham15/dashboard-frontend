// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const createIncome = async({name,amount,description,source}) =>{
    const newItem = {
        id: crypto.randomUUID(),
        name:name,
        amount: +amount,
        date: new Date().toISOString(),
        description: description,
        source: source
    }
    const existingIncomes = fetchData("income") ?? [];
    return localStorage.setItem("income",JSON.stringify([...existingIncomes,newItem]))
}

export const createExpense = async({name,amount,description,budgetId}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        amount: +amount,
        description: description,
        date: new Date().toISOString(),
        budgetId: budgetId
    }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses",JSON.stringify([...existingExpenses,newItem]))
    // const existingExpenses = fetchData("expenses") ?? [];
    // return localStorage.setItem("expenses",JSON.stringify([...existingExpenses,newItem]))
}

export const deleteItem = ({key}) => {
  return localStorage.removeItem(key);
}

export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc,expenses) => {
        if(expenses.budgetId != budgetId) return acc;
        return acc += expenses.amount;
    },0)
    return budgetSpent;
}

export const formatPercentage = (amount) => {
    return amount.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,

    })
}

export const formatCurrency = (amount) => {
    return amount.toLocaleString(undefined,{
        style: "currency",
        currency: "USD",
    })
}