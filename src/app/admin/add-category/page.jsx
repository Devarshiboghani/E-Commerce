"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // useSelector add kiya
import { addCategory } from "@/redux/actions/categoryAction";
import { imageUpload } from "@/services/uploadImage";
import { useRouter } from "next/navigation"; // Router add kiya

export default function AddCategory() {
  const dispatch = useDispatch();
  const router = useRouter();
  const fileInputRef = useRef(null);

  // Aapke authStore se user aur loading state nikalna
  // (Apne authSlice ke state structure ke mutabik 'user' aur 'loading' ka naam match karlein)
  const { user, loading: authLoading } = useSelector((state) => state.authStore);

  const [formData, setFormData] = useState({
    categoryName: "",
    categoryImage: "",
  });

  const [uploading, setUploading] = useState(false);

  // Security Check Effect: Agar user admin nahi hai toh bhaga do
  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== "admin") {
        alert("Access Denied: Only Admins can access this page!");
        router.push("/"); // Home page par redirect
      }
    }
  }, [user, authLoading, router]);

  const handleChange = async (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {   
      setUploading(true); 
      const image = await imageUpload(e.target.files[0]);
      setFormData({
        ...formData,
        categoryImage: image,
      });
      setUploading(false);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Double check token/user before dispatching
    if (!user || user.role !== "admin") {
      alert("Unauthorized action!");
      return;
    }

    await dispatch(addCategory(formData));
    alert("Category Added Successfully");

    setFormData({
      categoryName: "",
      categoryImage: "",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Jab tak auth checking chal rahi ho, tab tak blank ya loader dikhao
  if (authLoading) return <div className="container mt-5">Checking Authorization...</div>;
  if (!user || user.role !== "admin") return null;

  return (
    <div className="container mt-5 pt-5">
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"w
          type="text"
          placeholder="Category Name"
          name="categoryName"
          value={formData.categoryName}
          onChange={handleChange}
          required
        />

        <input
          ref={fileInputRef}
          className="form-control mb-3"
          type="file"
          onChange={handleChange}
          required={!formData.categoryImage}
        />

        <button
          className="btn btn-success"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Category"}
        </button>
      </form>
    </div>
  );
}