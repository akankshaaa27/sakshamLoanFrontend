import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProperty() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    type: "",
    clientName: "",
    contactNo: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Correct backend route
  const API_URL = "https://loanfinance.onrender.com/api/requests";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to add property: ${text}`);
      }

      await res.json();

      alert("✅ Property added successfully!");
      navigate("/realestateadmin"); // redirect after success
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Something went wrong while adding property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Property</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {Object.keys(formData).map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              required={field === "title"} // only title required in schema
              className="border p-3 rounded w-full"
            />
          ))}

          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate("/realestateadmin")}
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              {loading ? "Saving..." : "Add Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProperty;
