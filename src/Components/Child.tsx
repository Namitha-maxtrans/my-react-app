
    
type ChildProps = {
  namee: string;
};

export const Child = ({ namee }: ChildProps) => {
  return (
    <div  className="border border-secondary p-3 m-2">
      <h3>Child Component</h3>
      <p>Name: {namee}</p>
    </div>
  );
};