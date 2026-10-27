import { useRef } from "react";

function UseRef() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="border border-danger p-3 m-3" >
      <input ref={inputRef} placeholder="Enter your name" />

      <button onClick={handleClick}>
        Focus Input
      </button>
    </div>
  );
}

export default UseRef;