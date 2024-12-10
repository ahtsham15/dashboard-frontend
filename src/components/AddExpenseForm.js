import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

const AddExpenseForm = ({income}) => {
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting"
    const formRef = useRef()
    const focusRef = useRef()
    useEffect(()=>{
        if(!isSubmitting){
            formRef.current.reset()
            focusRef.current.focus()
        }
    },[isSubmitting])
    return (
        <div className="form-wrapper">
            <h2 className="h3">Add New {" "} <span className="accent">
                {income.length === 1 && `${income.map((inc)=> inc.name)}`}
                </span>{" "}
                Expense
            </h2>
            <fetcher.Form method="post" className="grid-sm" ref={formRef}>
                <div className="expense-inputs">
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input type="text" id="newExpense" name="newExpense" placeholder="Expense Name" required ref={focusRef}/>
                    </div>
                    {/* <div className="grid-xs">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input type="text" id="newExpense" name="newExpense" placeholder="Expense Name" required ref={focusRef}/>
                    </div> */}
                </div>
                <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Expense Amount</label>
                        <input type="number" inputMode="decimal" id="newExpenseAmount" name="newExpenseAmount" placeholder="Expense Amount e.g. $0.0" required ref={focusRef}/>
                </div>
                <div className="grid-xs">
                    <label htmlFor="newExpenseDescription">Description</label>
                    <input type="text" id="newExpenseDescription" name="newExpenseDescription" placeholder="Enter Description" required/>
                </div>
                <div className="grid-sm" hidden={income.length === 1}>
                    <label htmlFor="newExpenseBudget">Budget Category</label>
                    <select name="newExpenseBudget" id="newExpenseBudget" required>
                        {
                            income.sort((a,b)=> a.createdAt - b.createdAt).map((inc)=>{
                                return (
                                    <option key={inc.id} value={inc.id}>{inc.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <input type="hidden" name="_action" value="createExpense"/>
                <button type="submit" className="btn btn--dark"><span>Create Expense</span><PlusCircleIcon className="icon" width={20} height={20}/></button>
            </fetcher.Form>
        </div>
    )
}

export default AddExpenseForm