import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa"; // Import the trash icon
import './IncomeList.css'; // Import your CSS file for styling
import { ToastContainer } from "react-toastify";

const IncomeList = ({ userId, refreshFlag }) => {
    const [incomeRecords, setIncomeRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;

    const fetchIncomes = async () => {
        try {
            const baseURL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:8000";
            const response = await axios.get(`${baseURL}/api/incomes/${userId}`);
            const data = response.data?.data || [];
            setIncomeRecords(data);
        } catch (error) {
            toast.error("Failed to fetch income records. Please try again.");
            console.error("Error fetching income records:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const baseURL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:8000";
        try {
            await axios.delete(`${baseURL}/api/incomes/${id}/`);
            setIncomeRecords(incomeRecords.filter((income) => income.id !== id)); // Remove the deleted record from state
            toast.success("Data deleted successfully!"); // Success message for deletion
        } catch (error) {
            toast.error("Failed to delete income record. Please try again.");
            console.error("Error deleting income record:", error);
        }
    };

    useEffect(() => {
        fetchIncomes();
    }, [userId, refreshFlag]);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = incomeRecords.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(incomeRecords.length / recordsPerPage);

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
        return <p>Loading income records...</p>;
    }

    if (!Array.isArray(incomeRecords) || incomeRecords.length === 0) {
        return <p>No income records found. Add some income to get started.</p>;
    }

    return (
        <div className="income-list">
            <h2>Income Records</h2>
            <ToastContainer /> {/* Add ToastContainer here */}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Source</th>
                        <th>Amount</th>
                        <th>Total Income</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((income) => (
                        <tr key={income.id}>
                            <td>{income.id}</td>
                            <td>{income.description || "N/A"}</td>
                            <td>{new Date(income.date).toLocaleDateString()}</td>
                            <td>{income.source}</td>
                            <td>${parseFloat(income.amount).toFixed(2)}</td>
                            <td>${parseFloat(income.total_income).toFixed(2)}</td>
                            <td>
                                <button onClick={() => handleDelete(income.id)} className="delete-btn">
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

export default IncomeList;


