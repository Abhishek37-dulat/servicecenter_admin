// import React, { useState, useEffect } from "react";
// import { Select, Button, message } from "antd";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useCreateBusinessMutation } from "../../redux/services/businessApi";
// import { useGetAllServices1Query } from "../../redux/services/serviceApi";
// import { useGetAllAmenities1Query } from "../../redux/services/amenityApi";

// const businessTypes = [
//   "Restaurant",
//   "Salon",
//   "Gym",
//   "Pet Store",
//   "Bookstore",
//   "Cafe",
//   "Medical Clinic",
//   "Grocery Store",
// ];

// const servicesList = {
//   Restaurant: [
//     "Veg",
//     "Non-Veg",
//     "South Indian",
//     "North Indian",
//     "Chinese",
//     "Desserts",
//   ],
//   Salon: ["Men's Haircut", "Women's Haircut", "Hair Spa", "Facial", "Coloring"],
//   Gym: ["Cardio", "Weightlifting", "Crossfit", "Yoga"],
//   Cafe: ["Coffee", "Snacks", "Beverages"],
// };

// export default function BusinessInfo({ data, businessId, closeModal }) {
//   const [businessId, setBusinessId] = useState("");
//   const [businessType, setBusinessType] = useState(null);
//   const [overview, setOverview] = useState("");
//   const [services, setServices] = useState([]);
//   const [formData, setFormData] = useState({
//     businessName: "",
//     description: "",
//     website: "",
//     establishedYear: "",
//     employeeCount: "",
//   });
//   const [createBusiness, { isLoading, isSuccess }] =
//     useCreateBusinessMutation();

//   const { data: servicesData } = useGetAllServices1Query();
//   const { data: amenitiesData } = useGetAllAmenities1Query();

//   const [selectedServices, setSelectedServices] = useState([]);
//   const [selectedAmenities, setSelectedAmenities] = useState([]);

//   // Generate unique business ID on mount
//   useEffect(() => {
//     const uniqueId = `BIZ-${Date.now().toString(36)}-${Math.floor(
//       Math.random() * 1000
//     )}`;
//     setBusinessId(uniqueId);
//   }, []);
//   const handleTypeChange = (value) => {
//     setBusinessType(value);
//     setServices([]);
//   };

//   const handleSave = async () => {
//     try {
//       const payload = {
//         ...formData,
//         businessType,
//         services: selectedServices,
//         amenities: selectedAmenities,
//         overview,
//       };

//       console.log("Sending payload:", payload);

//       const res = await createBusiness(payload).unwrap();

//       if (res) {
//         message.success("Business created successfully!");
//         closeModal(); // typo? maybe it's closeModal()
//       } else {
//         message.error(
//           res?.message || "Something went wrong while creating the business."
//         );
//       }
//     } catch (err) {
//       console.error("Create business error:", err);
//       message.error(
//         err?.data?.message ||
//           err?.message ||
//           "Unexpected error occurred. Please try again."
//       );
//     }
//   };

//   const handleCancel = () => {
//     // Reset the form data
//     setFormData({
//       businessName: "",
//       description: "",
//       website: "",
//       establishedYear: "",
//       employeeCount: "",
//     });
//     setBusinessType(null);
//     setServices([]);
//     setOverview("");
//     const newId = `BIZ-${Date.now().toString(36)}-${Math.floor(
//       Math.random() * 1000
//     )}`;
//     setBusinessId(newId);
//   };

//   const availableServices = servicesList[businessType] || [];

//   return (
//     <div className="space-y-6">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Business Name
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Enter business name"
//           value={formData.businessName}
//           onChange={(e) =>
//             setFormData({ ...formData, businessName: e.target.value })
//           }
//         />
//       </div>

//       {/* Business Type */}
//       {/* <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Business Type
//         </label>
//         <Select
//           showSearch
//           style={{ width: "100%" }}
//           placeholder="Select business type"
//           onChange={handleTypeChange}
//           value={businessType}
//           options={businessTypes.map((type) => ({ value: type, label: type }))}
//         />
//       </div> */}

//       {/* Short Description */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Short Description
//         </label>
//         <textarea
//           rows="3"
//           className="form-control"
//           placeholder="Brief description (150–200 characters)"
//           value={formData.description}
//           onChange={(e) =>
//             setFormData({ ...formData, description: e.target.value })
//           }
//         ></textarea>
//       </div>

//       {/* Overview */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Overview
//         </label>
//         <ReactQuill value={overview} onChange={setOverview} />
//       </div>

//       {/* Services */}
//       {availableServices.length > 0 && (
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Services
//           </label>
//           <Select
//             mode="multiple"
//             allowClear
//             style={{ width: "100%" }}
//             placeholder="Select services"
//             value={services}
//             onChange={setServices}
//             options={availableServices.map((s) => ({ value: s, label: s }))}
//           />
//         </div>
//       )}

//       {/* Website (Optional) */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Website (Optional)
//         </label>
//         <input
//           type="url"
//           className="form-control"
//           placeholder="https://yourbusiness.com"
//           value={formData.website}
//           onChange={(e) =>
//             setFormData({ ...formData, website: e.target.value })
//           }
//         />
//       </div>

//       {/* Established Year */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Established Year
//         </label>
//         <input
//           type="number"
//           min="1900"
//           max={new Date().getFullYear()}
//           className="form-control"
//           placeholder="e.g., 2005"
//           value={formData.establishedYear}
//           onChange={(e) =>
//             setFormData({ ...formData, establishedYear: e.target.value })
//           }
//         />
//       </div>

//       {/* Number of Employees */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Number of Employees
//         </label>
//         <input
//           type="number"
//           min="1"
//           className="form-control"
//           placeholder="e.g., 25"
//           value={formData.employeeCount}
//           onChange={(e) =>
//             setFormData({ ...formData, employeeCount: e.target.value })
//           }
//         />
//       </div>
//       {servicesData?.data?.length > 0 && (
//         <div className="md:col-span-2">
//           <label>Services</label>
//           <Select
//             mode="multiple"
//             style={{ width: "100%" }}
//             placeholder="Select services"
//             value={selectedServices}
//             onChange={setSelectedServices}
//             options={servicesData?.data?.map((service) => ({
//               label: service.name,
//               value: service.id, // <- again, send ID
//             }))}
//             optionFilterProp="label"
//           />
//         </div>
//       )}

//       {/* Amenities */}
//       {amenitiesData?.data?.length > 0 && (
//         <div className="md:col-span-2">
//           <label>Amenities</label>
//           <Select
//             mode="multiple"
//             style={{ width: "100%" }}
//             placeholder="Select amenities"
//             value={selectedAmenities}
//             onChange={setSelectedAmenities}
//             options={amenitiesData?.data?.map((amenity) => ({
//               label: amenity.name,
//               value: amenity.id, // <- send ID here, not name
//             }))}
//             optionFilterProp="label"
//           />
//         </div>
//       )}
//       {/* Save and Cancel buttons */}
//       <div className="w-full flex justify-center mt-10">
//         <div className="flex flex-row gap-4">
//           <Button type="primary" onClick={handleSave}>
//             Save
//           </Button>
//           <Button onClick={handleCancel}>Cancel</Button>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { Select, Button, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
} from "../../redux/services/businessApi";
import { useGetAllServices1Query } from "../../redux/services/serviceApi";
import { useGetAllAmenities1Query } from "../../redux/services/amenityApi";

export default function BusinessInfo({ data, businessId, closeModal }) {
  const [formData, setFormData] = useState({
    businessName: "",
    description: "",
    website: "",
    establishedYear: "",
    employeeCount: "",
    businessType: "",
  });
  const [overview, setOverview] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const { data: servicesData } = useGetAllServices1Query();
  const { data: amenitiesData } = useGetAllAmenities1Query();

  const [createBusiness, { isLoading: isCreating }] =
    useCreateBusinessMutation();
  const [updateBusiness, { isLoading: isUpdating }] =
    useUpdateBusinessMutation();

  useEffect(() => {
    if (businessId && data?.success && data?.data) {
      setFormData({
        businessName: data.data.businessName || "",
        description: data.data.description || "",
        website: data.data.website || "",
        establishedYear: data.data.establishedYear || "",
        employeeCount: data.data.employeeCount || "",
        businessType: data.data.businessType || "",
      });
      setOverview(data.data.overview || "");
      setSelectedServices(data.data.services || []);
      setSelectedAmenities(data.data.amenities || []);
    }
  }, [businessId, data]);

  const handleSave = async () => {
    const payload = {
      ...formData,
      services: selectedServices,
      amenities: selectedAmenities,
      overview,
      businessId, // use the passed prop
    };

    try {
      if (businessId) {
        // Update existing business
        const res = await updateBusiness({
          id: businessId,
          updatedData: payload,
        }).unwrap();
        if (res) {
          message.success("Business updated successfully!");
          closeModal();
        } else {
          message.error(res?.message || "Failed to update business.");
        }
      } else {
        // Create new business
        const res = await createBusiness(payload).unwrap();
        if (res) {
          message.success("Business created successfully!");
          closeModal();
        } else {
          message.error(res?.message || "Failed to create business.");
        }
      }
    } catch (err) {
      console.error("Error saving business:", err);
      message.error(
        err?.data?.message || err?.message || "Unexpected error occurred."
      );
    }
  };

  const handleCancel = () => {
    setFormData({
      businessName: "",
      description: "",
      website: "",
      establishedYear: "",
      employeeCount: "",
      businessType: "",
    });
    setOverview("");
    setSelectedServices([]);
    setSelectedAmenities([]);
  };

  return (
    <div className="space-y-6">
      {/* Business Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Business Name
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter business name"
          value={formData.businessName}
          onChange={(e) =>
            setFormData({ ...formData, businessName: e.target.value })
          }
        />
      </div>

      {/* Business Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Business Type
        </label>
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Select business type"
          value={formData.businessType}
          onChange={(value) =>
            setFormData({ ...formData, businessType: value })
          }
          options={[
            "Restaurant",
            "Salon",
            "Gym",
            "Pet Store",
            "Bookstore",
            "Cafe",
            "Medical Clinic",
            "Grocery Store",
          ].map((type) => ({ label: type, value: type }))}
        />
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Short Description
        </label>
        <textarea
          rows="3"
          className="form-control"
          placeholder="Brief description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>
      </div>

      {/* Overview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Overview
        </label>
        <ReactQuill value={overview} onChange={setOverview} />
      </div>

      {/* Services */}
      {servicesData?.data?.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Services
          </label>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Select services"
            value={selectedServices}
            onChange={setSelectedServices}
            options={servicesData.data.map((service) => ({
              label: service.name,
              value: service.id,
            }))}
            optionFilterProp="label"
          />
        </div>
      )}

      {/* Amenities */}
      {amenitiesData?.data?.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amenities
          </label>
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Select amenities"
            value={selectedAmenities}
            onChange={setSelectedAmenities}
            options={amenitiesData.data.map((amenity) => ({
              label: amenity.name,
              value: amenity.id,
            }))}
            optionFilterProp="label"
          />
        </div>
      )}

      {/* Website */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Website (Optional)
        </label>
        <input
          type="url"
          className="form-control"
          placeholder="https://yourbusiness.com"
          value={formData.website}
          onChange={(e) =>
            setFormData({ ...formData, website: e.target.value })
          }
        />
      </div>

      {/* Established Year */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Established Year
        </label>
        <input
          type="number"
          min="1900"
          max={new Date().getFullYear()}
          className="form-control"
          placeholder="e.g., 2005"
          value={formData.establishedYear}
          onChange={(e) =>
            setFormData({ ...formData, establishedYear: e.target.value })
          }
        />
      </div>

      {/* Number of Employees */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Number of Employees
        </label>
        <input
          type="number"
          min="1"
          className="form-control"
          placeholder="e.g., 25"
          value={formData.employeeCount}
          onChange={(e) =>
            setFormData({ ...formData, employeeCount: e.target.value })
          }
        />
      </div>

      {/* Buttons */}
      <div className="w-full flex justify-center mt-10">
        <div className="flex flex-row gap-4">
          <Button
            type="primary"
            loading={isCreating || isUpdating}
            onClick={handleSave}
          >
            {businessId ? "Update" : "Save"}
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
