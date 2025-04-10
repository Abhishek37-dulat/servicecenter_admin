import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCreateBusinessMutation } from "../../redux/services/businessApi";
import { useGetAllServices1Query } from "../../redux/services/serviceApi";
import { useGetAllAmenities1Query } from "../../redux/services/amenityApi";
import { Select } from "antd";
 
export default function BusinessForm({ onClose }) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [createBusiness, { isLoading, isSuccess }] = useCreateBusinessMutation();
  
  const [services, setServices] = useState([]);
  const [serviceInput, setServiceInput] = useState("");
  
  const [amenities, setAmenities] = useState([]);
  const [amenityInput, setAmenityInput] = useState("");

  const { data: servicesData, isLoading: servicesLoading } = useGetAllServices1Query();
  const { data: amenitiesData, isLoading: amenitiesLoading } = useGetAllAmenities1Query();

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);


  useEffect(() => {
    if (isSuccess) {
      reset();
      onClose();
    }
  }, [isSuccess, reset, onClose]);

  const onSubmit = async (data) => {
    await createBusiness({
      ...data,
      services: selectedServices,
      amenities: selectedAmenities,
    });
  };

  const addService = () => {
    if (serviceInput.trim() && !services.includes(serviceInput.trim())) {
      setServices([...services, serviceInput.trim()]);
      setServiceInput("");
    }
  };

  // ✅ Remove Service
  const removeService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  // ✅ Add Amenity
  const addAmenity = () => {
    if (amenityInput.trim() && !amenities.includes(amenityInput.trim())) {
      setAmenities([...amenities, amenityInput.trim()]);
      setAmenityInput("");
    }
  };

  // ✅ Remove Amenity
  const removeAmenity = (index) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">Add Business</h2>
        <form onSubmit={handleSubmit(onSubmit)}  className="row g-3">
          
          {/* Business Name */}
          <div className="col-12">
            <label className="form-label">Business Name</label>
            <input {...register("name", { required: "Business Name is required" })} className="form-control" />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>

          {/* Description */}
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea {...register("description")} className="form-control"></textarea>
          </div>

          {/* Contact Details */}
          <div>
            <label className="form-label">Phone</label>
            <input {...register("phone")} className="form-control" />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input {...register("email")} type="email" className="form-control" />
          </div>

          {/* Website */}
          <div className="col-12">
            <label className="form-label">Website</label>
            <input {...register("website")} type="url" className="form-control" />
          </div>

          {/* Address */}
          <div className="col-12">
            <label className="form-label">Address</label>
            <input {...register("address")} className="form-control" />
          </div>

          {/* City & State */}
          <div>
            <label className="form-label">City</label>
            <input {...register("city")} className="form-control" />
          </div>
          <div>
            <label className="form-label">State</label>
            <input {...register("state")} className="form-control" />
          </div>

          {/* Zip Code & Country */}
          <div>
            <label className="form-label">Zip Code</label>
            <input {...register("zipCode")} className="form-control" />
          </div>
          <div>
            <label className="form-label">Country</label>
            <input {...register("country")} className="form-control" />
          </div>

          {/* Coordinates */}
          {/* <div>
            <label className="form-label">Latitude</label>
            <input {...register("latitude")} type="number" step="any" className="form-control" />
          </div>
          <div>
            <label className="form-label">Longitude</label>
            <input {...register("longitude")} type="number" step="any" className="form-control" />
          </div> */}

          {/* Social Media Links */}
          <div className="col-12">
            <label className="form-label">Facebook URL</label>
            <input {...register("facebookUrl")} type="url" className="form-control" />
          </div>
          <div className="col-12">
            <label className="form-label">Instagram URL</label>
            <input {...register("instagramUrl")} type="url" className="form-control" />
          </div>
          <div className="col-12">
            <label className="form-label">Twitter URL</label>
            <input {...register("twitterUrl")} type="url" className="form-control" />
          </div>
          <div className="col-12">
            <label className="form-label">LinkedIn URL</label>
            <input {...register("linkedinUrl")} type="url" className="form-control" />
          </div>

          {/* Owner Details */}
          {/* <div>
            <label className="form-label">Owner Name</label>
            <input {...register("ownerName")} className="form-control" />
          </div>
          <div>
            <label className="form-label">Owner Contact</label>
            <input {...register("ownerContact")} className="form-control" />
          </div>

 
          <div className="col-12">
            <label className="form-label">Additional Info</label>
            <textarea {...register("additionalInfo")} className="form-control"></textarea>
          </div> */}

       

         
          {/* Contact Details */}
          

          {/* Google Map URL */}
          <div className="col-12">
            <label className="form-label">Google Map URL</label>
            <input {...register("googleMapUrl")} className="form-control" />
          </div>

          <div className="col-12">
            <label className="form-label">Services</label>
            <Select
              mode="multiple"
              showSearch
              placeholder="Select Services"
              className="w-100"
              loading={servicesLoading}
              value={selectedServices}
              onChange={(value) => setSelectedServices(value)}
              options={servicesData?.data.map(service => ({ value: service.id, label: service.name }))}
            />
          </div>

          {/* Amenities Dropdown */}
          <div className="col-12">
            <label className="form-label">Amenities</label>
            <Select
              mode="multiple"
              showSearch
              placeholder="Select Amenities"
              className="w-100"
              loading={amenitiesLoading}
              value={selectedAmenities}
              onChange={(value) => setSelectedAmenities(value)}
              options={amenitiesData?.data.map(amenity => ({ value: amenity.id, label: amenity.name }))}
            />
          </div>


          <div className="col-12 d-flex justify-content-end">
            <button type="button" className="btn btn-secondary me-2" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-success" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
