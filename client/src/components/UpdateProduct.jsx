import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [loading, setLoading] = useState(true);

    // ✅ Auth header
    const authHeader = {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    };

    const params = useParams(); // id comes from clicked product
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    // 🔹 Fetch clicked product data
    const getProductDetails = async () => {
        try {
            const result = await fetch(
                `http://192.168.1.38:5000/add-product/${params.id}`,{
                headers: authHeader,}
            );
            const data = await result.json();

            setName(data.name);
            setPrice(data.price);
            setCategory(data.category);
            setCompany(data.company);
        } catch (error) {
            console.error("Error fetching product", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Update product
    const updateProduct = async () => {
        if (!name || !price || !category || !company) {
            alert("Please fill all fields");
            return;
        }

        await fetch(`http://192.168.1.38:5000/add-product/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({
                name,
                price,
                category,
                company,
            }),
            
            headers: {
                "Content-Type": "application/json",
                 authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            },
        });

        navigate("/");
    };

    if (loading) {
        return <p className="text-center mt-10">Loading product details...</p>;
    }

    return (
        <div className="flex justify-center items-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                <h2 className="text-lg font-semibold text-center mb-4 text-gray-800">
                    Update Product
                </h2>

                <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full mb-3 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Price"
                    className="w-full mb-3 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Category"
                    className="w-full mb-3 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Company"
                    className="w-full mb-4 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />

                <button
                    onClick={updateProduct}
                    className="w-full bg-blue-500 text-white py-2 text-sm rounded-md font-medium hover:bg-blue-600 transition"
                >
                    Update Product
                </button>
            </div>
        </div>
    );
};

export default UpdateProduct;
