import { redirect } from "react-router-dom";
import { deleteItem } from "../helpers";
import { toast } from "react-toastify";

export async function logoutAction() {
    deleteItem({key: "userName"});
    deleteItem({key: "expenses"});
    deleteItem({key: "income"});
    toast.success("User deleted successfully");
    return redirect("/");
}