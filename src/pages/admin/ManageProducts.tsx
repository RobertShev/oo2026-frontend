import { useEffect, useState } from "react"
import type { Product } from "../../models/Product";
import type { Category } from "../../models/Category";

function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(import.meta.env.VITE_BACK_URL + "/products")
      .then(res => res.json())
      .then(json => setProducts(json));
    fetch(import.meta.env.VITE_BACK_URL + "/categories")
      .then(res => res.json())
      .then(json => setCategories(json));
  }, []);

  const deleteProduct = (productId: number) => {
    fetch(import.meta.env.VITE_BACK_URL + "/products/" + productId, {
      method: "DELETE"
    }).then(res => res.json())
      .then(json => setProducts(json));
  }

  const saveProduct = () => {
    if (!editingProduct) return;
    fetch(import.meta.env.VITE_BACK_URL + "/products", {
      method: "PUT",
      body: JSON.stringify(editingProduct),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(json => {
        setProducts(json);
        setEditingProduct(null);
      });
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Active</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product =>
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {editingProduct !== null && editingProduct.id === product.id ? (
                  <input
                    value={editingProduct.name || ""}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    type="text"
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editingProduct !== null && editingProduct.id === product.id ? (
                  <input
                    value={editingProduct.description || ""}
                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                    type="text"
                  />
                ) : (
                  product.description
                )}
              </td>
              <td>
                {editingProduct !== null && editingProduct.id === product.id ? (
                  <input
                    value={editingProduct.price || 0}
                    onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                    type="number"
                  />
                ) : (
                  product.price
                )}
              </td>
              <td>
                {editingProduct !== null && editingProduct.id === product.id ? (
                  <input
                    checked={editingProduct.active}
                    onChange={(e) => setEditingProduct({...editingProduct, active: e.target.checked})}
                    type="checkbox"
                  />
                ) : (
                  product.active ? "true" : "false"
                )}
              </td>
              <td>
                {editingProduct !== null && editingProduct.id === product.id ? (
                  <input
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({...editingProduct, stock: Number(e.target.value)})}
                    type="number"
                  />
                ) : (
                  product.stock
                )}
              </td>
              <td>
                {editingProduct !== null && editingProduct.id === product.id ? (
                  <select
                    value={editingProduct.category?.id || ""}
                    onChange={(e) => {
                      const selected = categories.find(c => c.id === Number(e.target.value));
                      if (selected) setEditingProduct({...editingProduct, category: selected});
                    }}
                  >
                    <option value="">-- Select category --</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                ) : (
                  product.category?.name
                )}
              </td>
              <td>
                {editingProduct !== null && editingProduct.id === product.id ? (
                  <>
                    <button onClick={saveProduct}>Save</button>
                    <button onClick={() => setEditingProduct(null)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => setEditingProduct({...product})}>Edit</button>
                )}
              </td>
              <td><button onClick={() => deleteProduct(Number(product.id))}>x</button></td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default ManageProducts
