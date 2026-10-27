export const SimpleIf =()=>{
    const isLoggedIn=true
    if(isLoggedIn){
        return <h2>Welcome User</h2>
    }
    else{
        return <h2>Please login</h2>
    }
}