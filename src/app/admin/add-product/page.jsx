"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@/redux/actions/productAction";
import { getCategories } from "@/redux/actions/categoryAction";
import { imageUpload } from "@/services/uploadImage";

export default function AddProduct() {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categoryStore);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    images: [],
    quantity: "",
    price: "",
    rating: "",
  });

  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

 const handleChange = async (e) => {
  const { name, value, type, files } = e.target;

  if (type === "file") {
    setUploading(true);

    try {
      const uploadedImages = [];

      for (let i = 0; i < files.length; i++) {
        const image = await imageUpload(files[i]);
        uploadedImages.push(image);
      }

      setFormData((prev) => ({
        ...prev,
        images: uploadedImages,
      }));
    } catch (err) {
      alert("Image Upload Failed");
    }

    setUploading(false);

    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.length === 0) {
  alert("Please upload product images.");
  return;
}

    const result = await dispatch(addProduct(formData));

    if (addProduct.fulfilled.match(result)) {
      alert("Product Added Successfully");

      setFormData({
        title: "",
        description: "",
        category: "",
        images: [],
        quantity: "",
        price: "",
        rating: 4.5,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="container mt-5 pt-5">

      <h2 className="mb-4 text-center">
        Add Product
      </h2>

      <form onSubmit={handleSubmit}>

        {/* Product Title */}

        <input
          className="form-control mb-3"
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        {/* Description */}

        <textarea
          className="form-control mb-3"
          rows="4"
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        {/* Category */}

        <select
          className="form-select mb-3"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">
            Select Category
          </option>

          {categories.map((item) => (
            <option
              key={item._id}
              value={item.categoryName}
            >
              {item.categoryName}
            </option>
          ))}
        </select>

        {/* Quantity */}

        <input
          className="form-control mb-3"
          type="number"
          name="quantity"
          placeholder="Quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        {/* Price */}

        <input
          className="form-control mb-3"
          type="number"
          name="price"
          placeholder="Price"
          min="1"
          value={formData.price}
          onChange={handleChange}
          required
        />

        {/* Rating */}

        <input
          className="form-control mb-3"
          type="number"
          name="rating"
          placeholder="Rating"
          min="0"
          max="5"
          step="0.1"
          value={formData.rating}
          onChange={handleChange}
        />

        {/* Image */}

        <input
          ref={fileInputRef}
          className="form-control mb-4"
          type="file"
          accept="image/*"
          multiple
          onChange={handleChange}
          required
        />

        <button
          className="btn btn-success w-100"
          disabled={uploading}
        >
          {uploading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Uploading...
            </>
          ) : (
            "Add Product"
          )}
        </button>

      </form>

    </div>
  );
}