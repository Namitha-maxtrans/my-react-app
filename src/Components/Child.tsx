
    
type ChildProps = {
  name: string;
};

export const Child = ({ name }: ChildProps) => {
  return (
    <div  className="border border-secondary p-3 m-2">
      <h3>Child Component</h3>
      <p>Name: {name}</p>
    </div>
  );
};