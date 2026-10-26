import { useState } from "react";

export const Event = () => {
  const [name, setName] = useState("");

  return (
    <div className="border p-3 m-3">
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter your name"
      />

      <h2>Hello, {name}</h2>
    </div>
  );
};