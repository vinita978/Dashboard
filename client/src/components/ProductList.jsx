import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 Auth Header
  const authHeader = {
    authorization: `Bearer ${user?.auth}`,
  };

  const API_BASE = "http://192.168.1.38:5000"; // 👈 laptop IP

  useEffect(() => {
  getProducts();
}, []);


  const getProducts = async () => {
    try {
      const result = await fetch(`${API_BASE}/products`, {
        headers: authHeader,
      });

      const data = await result.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const searchHandle = async (key) => {
    setSearchKey(key);

    if (!key) {
      getProducts();
      return;
    }

    try {
      const result = await fetch(
        `${API_BASE}/search/${key}`,
        { headers: authHeader }
      );
      const data = await result.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Search error", err);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete product?")) return;

    try {
      await fetch(`${API_BASE}/product/${id}`, {
        method: "DELETE",
        headers: authHeader,
      });
      getProducts();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Product List</h2>

      <input
        value={searchKey}
        onChange={(e) => searchHandle(e.target.value)}
        placeholder="Search..."
        className="w-full border px-3 py-2 mb-4 rounded"
      />

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Company</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item._id} className="text-center">
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.price}</td>
                  <td className="border p-2">{item.category}</td>
                  <td className="border p-2">{item.company}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => navigate(`/update/${item._id}`)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteProduct(item._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
