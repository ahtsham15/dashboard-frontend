import React from "react";
import logomark from "../assets/logomark.svg";
import { Form, NavLink } from "react-router-dom";
import { TrashIcon } from '@heroicons/react/24/solid'

const Nav = ({userName}) => {
    return <nav>
        {/* <h1>{userName}</h1> */}
        <NavLink to="/" aria-label="Home">
             <img src={logomark} alt="logomark" height={40  } />
             <span>Dashboard</span>
        </NavLink>
       {
        userName && (
            <Form method="post" action="/logout" className="logout" onSubmit={(event)=> {if(!window.confirm("Are you sure you want to delete this user?")) event.preventDefault()}}>
                <button type="submit" className="btn btn--warning"><span>Delete User</span><TrashIcon width={20} /></button>
            </Form>
        )
       }
    </nav>;
};

export default Nav;