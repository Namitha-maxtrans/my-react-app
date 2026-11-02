// // import { Parent } from "./Components/Parent";

// import Employees from "./Pages/Emloyee";

import AppRoutes from "./RouterDom/AppRoutes";

// import ProductTable from "./Components/ProductTable";


// import ProductTable from "./Components/ProductTable";

// import { BrowserRouter } from "react-router-dom";
// import MainLayout from "./MainLayout/MainLayout";



// // import Memo from "./Components/Memo";

// // import { ProductList } from "./Components/Product";
// // import Products from "./Components/Products";
// // import UseRef from "./Components/Useref";

// // import { ProductList } from "./Components/Product";

// // import { Conditional } from "./Components/Conditional";

// // import { SimpleIf } from "./Components/SimpleIf";

// // import { Event } from "./Components/Event";

// // import { Count } from "./Components/Count";


// function App() {
//   return (
//     <div>
//       {/* <Parent /> */}
//       {/* <Count/>
//       <Event/> */}
//     {/* <SimpleIf/> */}
//     {/* <Conditional/>
//     <ProductList/> */}
// {/* <Products/>   useeffect */}
// {/* <UseRef/> */}
// {/* <Memo/> */}
// <BrowserRouter><MainLayout/></BrowserRouter>

//     </div>
//   );
// }
// export default App;



import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <AppRoutes />
    </>
  );
}

export default App;

