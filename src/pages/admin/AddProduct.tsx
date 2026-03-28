import { useEffect, useState } from "react";
import { Product } from "../../models/Product";
import { Category } from "../../models/Category";

function AddProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    active: false,
    stock: 0,
  });

  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + "/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = categories.find(c => c.id === Number(e.target.value));
    setNewProduct({...newProduct, category: selected});
  }

  const addProduct = () => {
    fetch(import.meta.env.VITE_BACK_URL + "/products", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(() => alert("Toode lisatud!"));
  }

  return (
    <div>
      <label>Name</label> <br />
      <input onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} type="text" /> <br />
      <label>Description</label> <br />
      <input onChange={(e) => setNewProduct({...newProduct, description: e.target.value})} type="text" /> <br />
      <label>Price</label> <br />
      <input onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})} type="number" /> <br />
      <label>Active</label> <br />
      <input onChange={(e) => setNewProduct({...newProduct, active: e.target.checked})} type="checkbox" /> <br />
      <label>Stock</label> <br />
      <input onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})} type="number" /> <br />
      <label>Category</label> <br />
      <select onChange={handleCategoryChange}>
        <option value="">-- Select category --</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select> <br />
      <button onClick={addProduct}>Add product</button>
    </div>
  )
}

export default AddProduct
