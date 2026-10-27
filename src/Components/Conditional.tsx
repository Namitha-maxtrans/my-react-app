import { useState } from "react"

export const Conditional=()=>{
    const [isLoggedIn,setIsLoggedIn]=useState(false)

    return(
        <center>
       <div className="border border-danger p-3 m-3">
        {isLoggedIn ?( <h2>Welcome User</h2>): (<h2>Please Login</h2>)}
         <button
        onClick={() => setIsLoggedIn(!isLoggedIn)}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>

       </div>
       </center>
    )
}