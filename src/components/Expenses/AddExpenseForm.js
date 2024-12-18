import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Form, useFetcher } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

const AddExpenseForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const focusRef = useRef();
    const formRef = useRef();
    const fetcher = useFetcher();

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset();
            focusRef.current.focus();
        }
    }, [isSubmitting]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(formRef.current);
        const data = {
            user: "3", // Replace with dynamic user ID if needed
            name: formData.get("expenseName"),
            amount: parseFloat(formData.get("expenseAmount")),
            date: formData.get("expenseDate"),
            description: formData.get("expenseDescription"),
        };

        const baseURL = process.env.REACT_APP_BASE_URL;

        try {
            const response = await axios.post(`${baseURL}/api/expenses/`, data);
            if (response.status === 201) {
                toast.success("Expense created successfully!");
            } else {
                toast.error("Failed to create expense. Please try again.");
            }
        } catch (error) {
            toast.error("Error creating expense. Please check your input or try again later.");
            console.error("Error creating expense:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-wrapper">
            <h2 className="h3">Create Expense</h2>

            <fetcher.Form method="post" onSubmit={handleSubmit} className="grid-sm" ref={formRef}>
                <div className="grid-xs">
                    <label htmlFor="expenseName">Expense Name</label>
                    <input
                        type="text"
                        id="expenseName"
                        name="expenseName"
                        placeholder="Enter expense name"
                        required
                        ref={focusRef}
                    />
                </div>
                <div className="grid-xs">
                    <label htmlFor="expenseAmount">Expense Amount</label>
                    <input
                        type="number"
                        id="expenseAmount"
                        name="expenseAmount"
                        placeholder="e.g. $500"
                        required
                        inputMode="decimal"
                    />
                </div>
                <div className="grid-xs">
                    <label htmlFor="expenseDate">Expense Date</label>
                    <input type="date" id="expenseDate" name="expenseDate" required />
                </div>
                <div className="grid-xs">
                    <label htmlFor="expenseDescription">Description</label>
                    <input
                        type="text"
                        id="expenseDescription"
                        name="expenseDescription"
                        placeholder="Enter expense decription"
                        required
                    />
                </div>
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    <span>{isSubmitting ? "Creating..." : "Create Expense"}</span>
                    <CurrencyDollarIcon className="icon" width={20} height={20} />
                </button>
            </fetcher.Form>
        </div>
    );
};

export default AddExpenseForm;
