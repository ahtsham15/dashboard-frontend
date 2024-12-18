import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles for Toastify
import { ToastContainer } from "react-toastify";

const AddIncomeForm = ({ onIncomeCreate }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const focusRef = useRef();
    const formRef = useRef();

    // Reset form and focus input when submitting is done
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
            name: formData.get("newIncome"),
            amount: parseFloat(formData.get("newIncomeAmount")),
            date: formData.get("newIncomeDate"),
            source: formData.get("source"),
            description: formData.get("description")
        };

        const baseURL = process.env.REACT_APP_BASE_URL;
        console.log("Base URL:", baseURL); // Should log: http://127.0.0.1:8000
        try {
            const response = await axios.post(`${baseURL}/api/incomes/`, data);
            if (response.status === 201) {
                toast.success("Income created successfully!");
                if (onIncomeCreate) onIncomeCreate(); // Trigger the re-fetch in the parent component
            } else {
                toast.error("Failed to create income. Please try again.");
            }
        } catch (error) {
            toast.error("Error creating income. Please check your input or try again later.");
            console.error("Error creating income:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-wrapper">
            <h2 className="h3">Create Income</h2>
            <ToastContainer /> {/* Add ToastContainer here */}
            <form onSubmit={handleSubmit} className="grid-sm" ref={formRef}>
                <div className="grid-xs">
                    <label htmlFor="newIncome">Income Name</label>
                    <input
                        type="text"
                        id="newIncome"
                        name="newIncome"
                        placeholder="Source of Income"
                        required
                        ref={focusRef}
                    />
                </div>
                <div className="grid-xs">
                    <label htmlFor="newIncomeAmount">Income Amount</label>
                    <input
                        type="number"
                        id="newIncomeAmount"
                        name="newIncomeAmount"
                        placeholder="e.g. $1000"
                        required
                        inputMode="decimal"
                    />
                </div>
                <div className="grid-xs">
                    <label htmlFor="newIncomeDate">Income Date</label>
                    <input type="date" id="newIncomeDate" name="newIncomeDate" required />
                </div>
                <div className="grid-xs">
                    <label htmlFor="source">Source</label>
                    <input
                        type="text"
                        id="source"
                        name="source"
                        placeholder="Enter income source"
                        required
                    />
                </div>
                <div className="grid-xs">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Enter income description"
                        required
                    />
                </div>
                <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                    <span>{isSubmitting ? "Creating..." : "Create Income"}</span>
                    <CurrencyDollarIcon className="icon" width={20} height={20} />
                </button>
            </form>
        </div>
    );
};

export default AddIncomeForm;
