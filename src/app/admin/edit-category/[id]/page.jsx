"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  updateCategory,
} from "@/redux/actions/categoryAction";
import { imageUpload } from "@/services/uploadImage";

export default function EditCategoryPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();

  const { categories } = useSelector(
    (state) => state.categoryStore
  );

  const [formData, setFormData] = useState({
    categoryName: "",
    categoryImage: "",
  });

  const [loading, setLoading] = useState(false);

  // Load category data
  useEffect(() => {
    if (!categories.length) {
      dispatch(getCategories());
    }
  }, [dispatch, categories.length]);

  useEffect(() => {
    const single = categories.find(
      (item) => item._id === params.id
    );

    if (single) {
      setFormData({
        categoryName: single.categoryName,
        categoryImage: single.categoryImage,
      });
    }
  }, [categories, params.id]);

  // handle change
  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setLoading(true);

      const url = await imageUpload(files[0]);

      setFormData((prev) => ({
        ...prev,
        categoryImage: url,
      }));

      setLoading(false);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      updateCategory({
        id: params.id,
        data: formData,
      })
    );

    if (updateCategory.fulfilled.match(result)) {
      alert("Category Updated Successfully");

      router.push("/admin/categories");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4">Edit Category</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <input
          className="form-control mb-3"
          type="text"
          name="categoryName"
          value={formData.categoryName}
          onChange={handleChange}
          placeholder="Category Name"
          required
        />

        {/* Image Preview */}
        {formData.categoryImage && (
          <img
            src={formData.categoryImage}
            alt="preview"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              marginBottom: "10px",
              borderRadius: "10px",
            }}
          />
        )}

        {/* Image Upload */}
        <input
          className="form-control mb-3"
          type="file"
          onChange={handleChange}
        />

        <button
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Update Category"}
        </button>
      </form>
    </div>
  );
}