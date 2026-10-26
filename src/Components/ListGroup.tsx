import type { MouseEvent } from "react";


 export const ListGroup = () => {
    let items=['usa','india','uk','germany'];
    const handleClick=(event:MouseEvent) => console.log(event)
  
  return (
    <>
   
    <ul className="list-group">
        <h1>List</h1>
         {items.length === 0 && <p>No item found</p>}
        {items.map((item)=><li  className='list-group-item' 
        key={item} onClick={handleClick}>
            {item}</li>)}
</ul> 
    </>
  )
}




