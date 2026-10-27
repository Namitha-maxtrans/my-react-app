
import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Mobile", price: 20000 },
  { id: 3, name: "Headphones", price: 2000 },
];

function Memo() {
  const [count, setCount] = useState<number>(0);

  const totalPrice = useMemo(() => {
    console.log("Calculating total price...");

    return products.reduce(
      (total, product) => total + product.price,
      0
    );
  }, []);

  return (
    <div className="border p-3 m-3">
      <h2>Total Price: ₹{totalPrice}</h2>
      <p>Counter: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Increase Counter
      </button>
    </div>
  );
}

export default Memo;
