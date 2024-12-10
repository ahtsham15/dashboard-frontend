import { useEffect, useState } from "react";
import { Form, useFetcher } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";

const AddIncomeForm = () => {
    const [name,setName] = useState("");
    const fetcher = useFetcher()
    const focusRef = useRef()
    const isSubmitting = fetcher.state === 'submitting'
    const formRef = useRef()
    useEffect(()=>{
        if(!isSubmitting){
            formRef.current.reset()
            focusRef.current.focus()
        }
    },[isSubmitting])
    return <div className="form-wrapper">
        <h2 className="h3">
            Create Budget
        </h2>
        <fetcher.Form method="post" className="grid-sm" ref={formRef}>
            <div className="grid-xs">
                <label htmlFor="newIncome">Budget Name</label>
                <input type="text" id="newInome" name="newIncome" placeholder="Source of Income" required ref={focusRef}/>
            </div>
            <div className="grid-xs">
                <label htmlFor="newIncomeAmount">Budget Amount</label>
                <input type="number" id="newIncomeAmount" name="newIncomeAmount" placeholder="e.g. $1000" required inputMode="decimal"/>
            </div>
            <div className="grid-xs">
                <label htmlFor="newIncomeDate">Budget Date</label>
                <input type="date" id="newIncomeDate" name="newIncomeDate" required/>
            </div>
            {/* <div className="grid-xs">
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" placeholder="Enter description" required/>
            </div> */}
            {/* <div className="grid-xs">
                <label htmlFor="totalIncome">Total Income</label>
                <input type="number" id="totalIncome" name="totalIncome" placeholder="Enter total income" required inputMode="decimal"/>
            </div> */}
            <div className="grid-xs">
                <label htmlFor="source">Source</label>
                <input type="text" id="source" name="source" placeholder="Enter income source" required/>
            </div>
            <input type="hidden" name="_action" value="newIncome"/>
            <button type="submit" className="btn btn--dark"><span>Create Income</span><CurrencyDollarIcon className="icon" width={20} height={20}/></button>
            
        </fetcher.Form>
    </div>;
};

export default AddIncomeForm;