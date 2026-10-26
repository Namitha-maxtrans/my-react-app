import { Child } from "./Child";

export const Parent = () => {
  let data = "Namitha";

  return (
    <div className="border  border-danger p-3 m-3">
      <h2>Parent Component</h2>
      <Child name={data} />
    </div>
  );
};
  
   