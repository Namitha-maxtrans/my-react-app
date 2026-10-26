
import { useState } from "react";

export const Count=()=> {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="container text-center mt-5">
      <h1>Counter App</h1>

      <h2 className="my-4">Count: {count}</h2>

      <button
        className="btn btn-success m-2"
        onClick={handleIncrement}
      >
        Increment 
      </button>

      <button
        className="btn btn-danger m-2"
        onClick={handleDecrement}
      >
        Decrement 
      </button>

      <button
        className="btn btn-secondary"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};
