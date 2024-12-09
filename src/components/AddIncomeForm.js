import { useState } from "react";

const AddIncomeForm = () => {
    const [name,setName] = useState("");
    return <div className="form-wrapper">
        <h2 className="h3">
            Create Income
        </h2>
        {/* <form>
            <input type="text" placeholder="Budget Name" value={name} onChange={(e)=>setName(e.target.value)}/>
        </form> */}
    </div>;
};

export default AddIncomeForm;