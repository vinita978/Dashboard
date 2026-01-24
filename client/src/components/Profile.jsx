import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        // If user not logged in, redirect to login
        if (!user) {
            navigate("/login");
        }
    }, [navigate, user]);

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    if (!user) return null;

    return (
        <div className="flex justify-center items-center  bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
                <h2 className="text-xl font-semibold text-center mb-4">
                    Profile
                </h2>

                <div className="mb-3">
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{user.name || "N/A"}</p>
                </div>

                <div className="mb-4">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                </div>

                <button
                    onClick={logout}
                    className="w-full bg-red-500 text-white py-2 rounded-md text-sm font-medium hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
