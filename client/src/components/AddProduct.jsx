import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const navigate = useNavigate();

    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            alert("Please fill all fields");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));

        const result = await fetch("http://192.168.1.38:5000/add-product", {
            method: "POST",
            body: JSON.stringify({
                name,
                price,
                category,
                company,
                userId: user._id,
            }),
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,

            },
        });

        const data = await result.json();
        console.log(data);

        navigate("/");
    };

    return (
        <div className="flex justify-center items-center  bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                <h2 className="text-lg font-semibold text-center mb-4 text-gray-800">
                    Add New Product
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
                    onClick={addProduct}
                    className="w-full bg-black text-white py-2 text-sm rounded-md font-medium hover:bg-gray-800 transition"
                >
                    Add Product
                </button>
            </div>
        </div>
    );

};

export default AddProduct;
