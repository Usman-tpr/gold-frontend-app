import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select"; // Importing react-select
import { toast } from "react-toastify";
import BreadCrums from "../../../common/BreadCrums";
import { districts } from "../../../districts/District";
import { getRequest, postRequest } from "../../../Requests/Request"; // Assuming request.js contains getRequest and postRequest functions

export default function ProductCreationForm() {
  const navigate = useNavigate();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    location: null, // Dropdown value
    condition: null, // Dropdown value
    weight: null, // Dropdown value
    category: null, // Dropdown value
    subcategory: null, // Dropdown value
    images: [], // Array of images
  });

  // Location options
  const locationOptions = districts.map((district) => ({
    value: district,
    label: district,
  }));

  const conditionOptions = [
    { value: "new", label: "New" },
    { value: "used", label: "Used" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (selectedOption) => {
    setFormData({ ...formData, location: selectedOption });
  };

  const handleConditionChange = (selectedOption) => {
    setFormData({ ...formData, condition: selectedOption });
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      category: selectedOption,
      subcategory: null, // Reset subcategory when category changes
    }));
  };

  const handleSubcategoryChange = (selectedOption) => {
    setFormData({ ...formData, subcategory: selectedOption });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length <= 10) {
      setFormData({ ...formData, images: [...formData.images, ...files] });
    }
  };

  const handleImageDelete = (indexToDelete) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, index) => index !== indexToDelete),
    }));
  };

  const validateForm = () => {
    const { title, description, location, category, images, price, condition, weight } = formData;

    if (!title || !description || !location || !category || !price || !condition || !weight) {
      toast.error("All fields are required!");
      return false;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image!");
      return false;
    }

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB per image
    for (let image of images) {
      if (!image.type.startsWith("image/")) {
        toast.error("Only image files are allowed!");
        return false;
      }

      if (image.size > maxSizeInBytes) {
        toast.error("Each image size should not exceed 5MB!");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("price", formData.price);
      data.append("description", formData.description);
      data.append("location", formData.location?.value || "");
      data.append("weight", formData.weight || "");
      data.append("condition", formData.condition?.value || "");
      data.append("category", formData.category?.value || "");
      data.append("subCategory", formData.subcategory?.value || "");

      // Append images to the FormData object
      formData.images.forEach((image) => {
        data.append("images", image);
      });

      try {
        const response = await postRequest("/product/add", data);
        console.log( "the response product" ,  response)
          toast.success("Product added successfully!");
          navigate(-1);
      
      } catch (error) {
        toast.error(error.message || "Something went wrong!");
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getRequest("/category/getAll");
        console.log(response.body)
        console.log(response.status)

          const options = response.body.map((e) => ({
            value: e.name,
            label: e.name,
          }));
          setCategoryOptions(options);
        
      } catch (error) {
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (formData.category) {
        try {
          const response = await getRequest(`/subCategory/get/${formData.category.value}`);

            const options = response.body.map((e) => ({
              value: e.name,
              label: e.name,
            }));
            setSubCategoryOptions(options);
          
        } catch (error) {
          toast.error("Failed to fetch subcategories");
        }
      }
    };

    fetchSubCategories();
  }, [formData.category]);

  return (
    <>
      <div className="">
        <div className="flex justify-between items-center py-5">
          <BreadCrums
            breadCrum={[{ name: "User Dashboard", path: "/user-dashboard/manage-products" }, { name: "Manage Products", path: "/user-dashboard/manage-product" }, { name: "Add Products" }]}
          />
        </div>
      </div>
      <div className="w-full bg-white rounded-xl p-3 mb-4 border-l-4 border-usetheme">
        <h1 className="text-[#18120F] text-lg font-semibold p-1">Add New Product</h1>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="flex flex-col gap-2">
            {/* Title */}
            <div>
              <label className="text-[#6B6B6B] text-[12px] font-semibold">Product Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-[#FAFAFA] text-xs font-normal text-[#6B6B6B] rounded-lg w-full py-2 px-2 border border-[#EBF0ED] outline-none"
                type="text"
                placeholder="Enter product title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-[#6B6B6B] text-[12px] font-semibold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="bg-[#FAFAFA] text-xs font-normal text-[#6B6B6B] rounded-lg w-full py-2 px-2 border border-[#EBF0ED] outline-none"
                placeholder="Enter product description"
                rows="3"
              />
            </div>

            {/* Condition */}
            <div>
              <label className="text-[#6B6B6B] text-[12px] font-semibold">Condition</label>
              <Select
                name="condition"
                value={formData.condition}
                onChange={handleConditionChange}
                options={conditionOptions}
                className="text-xs"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="text-[#6B6B6B] text-[12px] font-semibold">Weight (in grams)</label>
              <input
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="bg-[#FAFAFA] text-xs font-normal text-[#6B6B6B] rounded-lg w-full py-2 px-2 border border-[#EBF0ED] outline-none"
                type="text"
                placeholder="Enter product weight in grams"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-[#6B6B6B] text-[12px] font-semibold">Location</label>
              <Select
                name="location"
                value={formData.location}
                onChange={handleLocationChange}
                options={locationOptions}
                className="text-xs"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-[#6B6B6B] text-[12px] font-semibold">Category</label>
              <Select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                options={categoryOptions}
                className="text-xs"
              />
            </div>

            {/* Subcategory */}
            <div>
              <label className="text-[#6B6B6B] text-[12px] font-semibold">Subcategory</label>
              <Select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleSubcategoryChange}
                options={subCategoryOptions}
                className="text-xs"
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-[#6B6B6B] text-[12px] font-semibold">Price</label>
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="bg-[#FAFAFA] text-xs font-normal text-[#6B6B6B] rounded-lg w-full py-2 px-2 border border-[#EBF0ED] outline-none"
                type="text"
                placeholder="Enter product price"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-[#6B6B6B] text-[12px] font-semibold">Product Images</label>
              <input type="file" multiple onChange={handleImageChange} />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={URL.createObjectURL(image)} alt={`img-${index}`} className="h-20 w-20 rounded-md object-cover" />
                    <button
                      type="button"
                      onClick={() => handleImageDelete(index)}
                      className="absolute top-0 right-0 text-white bg-red-500 rounded-full p-1 text-xs"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="text-white bg-yellow-600 rounded-lg w-full py-3"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}
