// Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const createIncome = async({name,amount,source}) =>{
    const newItem = {
        id: crypto.randomUUID(),
        name:name,
        amount: +amount,
        date: new Date().toISOString(),
        source: source
    }
    // const existingIncomes = fetchData("income") ?? [];
    const existingIncomes = fetchData("income");

    // Ensure the fetched data is converted to an array
    const incomesArray = Array.isArray(existingIncomes) ? existingIncomes : [];

    // Add new income item
    const updatedIncomes = [...incomesArray, newItem];
    return localStorage.setItem("income",JSON.stringify(updatedIncomes))
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

export const formatDateToLocalString = (epoch) =>{
    return new Date(epoch).toLocaleDateString();
}

// export const deleteItem = ({key}) => {
//   return localStorage.removeItem(key);
// }

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

export const getAllMatchingItems = ({category,key,value}) =>{
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value)
}

export const deleteItem = ({key,id}) =>{
    const existingItems = fetchData(key) ?? [];
    if(id){
        const newData = existingItems.filter((item) => item.id !==id);
        return localStorage.setItem(key,JSON.stringify(newData))
    }
    return localStorage.removeItem(key);
}

export const formatCurrency = (amount) => {
    return amount.toLocaleString(undefined,{
        style: "currency",
        currency: "USD",
    })
}