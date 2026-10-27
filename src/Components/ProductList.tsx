type Product = {
  id: number;
  name: string;
};

export const ProductList = () => {
  const products: Product[] = [ { id: 1, name: "Laptop" }];

  return (
    <div className="border border-danger p-3 m-3">
      <h2>Products</h2>

      {products.length > 0 ? (
        products.map((product) => (
          <p key={product.id}>{product.name}</p>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};