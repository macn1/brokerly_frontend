import React, { useState } from "react";

const ExtraServiceCreateModal = ({ isOpen, onClose, onSuccess, createExtraService }) => {
  const [formData, setFormData] = useState({
    name: "",
    unit_price: "",
    unit: "hour",
    minimum_unit: 1,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createExtraService(formData).unwrap();
      alert("Extra Service created successfully.");
      onSuccess();      // Refetch list
      onClose();        // Close modal
      setFormData({ name: "", unit_price: "", unit: "hour", minimum_unit: 1 }); // Reset form
    } catch (err) {
      console.error(err);
      alert("Failed to create extra service.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">Create Extra Service</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Unit Price</label>
            <input
              type="number"
              name="unit_price"
              step="0.01"
              value={formData.unit_price}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Unit</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Minimum Unit</label>
            <input
              type="number"
              name="minimum_unit"
              value={formData.minimum_unit}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              min="1"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExtraServiceCreateModal;
