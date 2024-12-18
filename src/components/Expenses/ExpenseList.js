// src/components/ExpenseList/ExpenseList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa"; // Import the trash icon
import './ExpenseList.css'; // Import your CSS file for styling
import { ToastContainer } from "react-toastify";

const ExpenseList = ({ userId, refreshFlag }) => {
    const [expenseRecords, setExpenseRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const fetchExpenses = async () => {
        try {
            const baseURL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:8000";
            const response = await axios.get(`${baseURL}/api/expenses/${userId}`);
            const data = response.data?.data || [];
            setExpenseRecords(data);
        } catch (error) {
            toast.error("Failed to fetch expense records. Please try again.");
            console.error("Error fetching expense records:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const baseURL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:8000";
        try {
            await axios.delete(`${baseURL}/api/expenses/${id}/`);
            setExpenseRecords(expenseRecords.filter((expense) => expense.id !== id)); // Remove the deleted record from state
            toast.success("Expense deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete expense record. Please try again.");
            console.error("Error deleting expense record:", error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [userId, refreshFlag]);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = expenseRecords.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(expenseRecords.length / recordsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    if (loading) {
        return <p>Loading expense records...</p>;
    }

    if (!Array.isArray(expenseRecords) || expenseRecords.length === 0) {
        return <p>No expense records found. Add some expenses to get started.</p>;
    }

    return (
        <div className="expense-list">
            <h2>Expense Records</h2>
            <ToastContainer /> {/* Add ToastContainer here */}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Date</th>
                        {/* <th>Category</th> */}
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((expense) => (
                        <tr key={expense.id}>
                            <td>{expense.id}</td>
                            <td>{expense.description || "N/A"}</td>
                            <td>{new Date(expense.date).toLocaleDateString()}</td>
                            {/* <td>{expense.category}</td> */}
                            <td>${parseFloat(expense.amount).toFixed(2)}</td>
                            <td>
                                <button onClick={() => handleDelete(expense.id)} className="delete-btn">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ExpenseList;
