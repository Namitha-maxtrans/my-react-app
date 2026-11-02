
import { useState } from "react";

function SimpleForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (
   event: React.SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (name.trim() === "") {
      setError("Name is required");
      return;
    }

    setError("");
    alert("Hello " + name);
  };

  return (
    <div className="mx-auto mt-10 max-w-sm rounded-lg bg-white p-6 shadow">
      <form onSubmit={handleSubmit}>
        <label className="mb-2 block font-medium">
          Enter your name
        </label>

        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded border border-gray-300 p-2"
          placeholder="Enter name"
        />

        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SimpleForm;
