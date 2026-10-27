import { useNavigate } from "react-router-dom"

export const Contact =()=>{
    const navigate= useNavigate()
    const handleSubmit=()=>{
       alert('Form submitted successfully!!')
       navigate('/')
    }
    return(
        <>
        <center>
        <h2>This is Contact Page</h2>
        <button
        className="btn btn-primary"
        onClick={handleSubmit}
      >
        Submit
      </button>
      </center>
        </>
    )
}