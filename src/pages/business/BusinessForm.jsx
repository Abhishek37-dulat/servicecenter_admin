// import { useForm } from "react-hook-form";
// import { useEffect, useState } from "react";
// import { useCreateBusinessMutation } from "../../redux/services/businessApi";
// import { useGetAllServices1Query } from "../../redux/services/serviceApi";
// import { useGetAllAmenities1Query } from "../../redux/services/amenityApi";
// import { Input, Select, Button, Spin } from "antd";

// const { TextArea } = Input;

// export default function BusinessForm({ onClose }) {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const [createBusiness, { isLoading, isSuccess }] = useCreateBusinessMutation();
//   const { data: servicesData } = useGetAllServices1Query();
//   const { data: amenitiesData } = useGetAllAmenities1Query();

//   const [selectedServices, setSelectedServices] = useState([]);
//   const [selectedAmenities, setSelectedAmenities] = useState([]);

//   useEffect(() => {
//     if (isSuccess) {
//       reset();
//       onClose();
//     }
//   }, [isSuccess, reset, onClose]);

//   const onSubmit = async (data) => {
//     console.log(data)
//     await createBusiness({
//       ...data,
//       services: selectedServices,
//       amenities: selectedAmenities,
//     });
//   };

//   return (
//     <div className="  bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//         <h2 className="text-2xl font-semibold mb-4">Add Business</h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Business Name */}
//           <div>
//             <label>Business Name</label>
//             <Input {...register("businessName")} />
//             {errors.businessName && <p className="text-red-500 text-sm">{errors.businessName.message}</p>}
//           </div>

//           {/* Description */}
//           <div className="md:col-span-2">
//             <label>Description</label>
//             <TextArea rows={3} {...register("description")} />
//           </div>

//           {/* Website */}
//           <div>
//             <label>Website</label>
//             <Input {...register("website")} />
//           </div>

//           {/* Established Year */}
//           <div>
//             <label>Established Year</label>
//             <Input {...register("establishedYear")} />
//           </div>

//           {/* Employee Count */}
//           <div>
//             <label>Employee Count</label>
//             <Input {...register("employeeCount")} />
//           </div>

//           {/* Business Type */}
//           <div>
//             <label>Business Type</label>
//             <Input {...register("businessType")} />
//           </div>

//           {/* Phone */}
//           <div>
//             <label>Phone</label>
//             <Input {...register("phone")} />
//           </div>

//           {/* Email */}
//           <div>
//             <label>Email</label>
//             <Input {...register("email")} />
//           </div>

//           {/* Address 1 */}
//           <div>
//             <label>Address Line 1</label>
//             <Input {...register("address1")} />
//           </div>

//           {/* Address 2 */}
//           <div>
//             <label>Address Line 2</label>
//             <Input {...register("address2")} />
//           </div>

//           {/* City */}
//           <div>
//             <label>City</label>
//             <Input {...register("city")} />
//           </div>

//           {/* State */}
//           <div>
//             <label>State</label>
//             <Input {...register("state")} />
//           </div>

//           {/* Country */}
//           <div>
//             <label>Country</label>
//             <Input {...register("country")} />
//           </div>

//           {/* Services */}

//           {/* Submit Buttons */}
//           <div className="md:col-span-2 flex justify-end gap-4 mt-4">
//             <Button onClick={onClose}>Cancel</Button>
//             <Button type="primary" htmlType="submit" loading={isLoading}>
//               Create
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCreateBusinessMutation } from "../../redux/services/businessApi";
import { useGetAllServicesQuery } from "../../redux/services/serviceApi";
import { useGetAllAmenitiesQuery } from "../../redux/services/amenityApi";
import { Input, Select, Button } from "antd";

const { TextArea } = Input;

export default function BusinessForm({ onClose }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [createBusiness, { isLoading, isSuccess }] =
    useCreateBusinessMutation();
  const { data: servicesData } = useGetAllServicesQuery();
  const { data: amenitiesData } = useGetAllAmenitiesQuery();

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      onClose();
    }
  }, [isSuccess, reset, onClose]);

  const onSubmit = async (data) => {
    console.log({
      ...data,
      services: selectedServices,
      amenities: selectedAmenities,
    });
    await createBusiness({
      ...data,
      services: selectedServices,
      amenities: selectedAmenities,
    });
  };

  return (
    <div className="bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Add Business</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Business Name */}
          <div>
            <label>Business Name</label>
            <Controller
              name="businessName"
              control={control}
              rules={{ required: "Business name is required" }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.businessName && (
              <p className="text-red-500 text-sm">
                {errors.businessName.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label>Description</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <TextArea rows={3} {...field} />}
            />
          </div>

          {/* Website */}
          <div>
            <label>Website</label>
            <Controller
              name="website"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </div>

          {/* Established Year */}
          <div>
            <label>Established Year</label>
            <Controller
              name="establishedYear"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </div>

          {/* Employee Count */}
          <div>
            <label>Employee Count</label>
            <Controller
              name="employeeCount"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </div>

          {/* Business Type */}
          <div>
            <label>Business Type</label>
            <Controller
              name="businessType"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </div>

          {/* Phone */}
          <div>
            <label>Phone</label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </div>

          {/* Email */}
          <div>
            <label>Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </div>

          {/* Address 1 */}
          <div>
            <label>Address Line 1</label>
            <Controller
              name="address1"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </div>

          {/* Address 2 */}
          <div>
            <label>Address Line 2</label>
            <Controller
              name="address2"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </div>

          {/* City */}
          <div>
            <label>City</label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </div>

          {/* State */}
          <div>
            <label>State</label>
            <Controller
              name="state"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </div>

          {/* Zip */}
          <div>
            <label>Zip Code</label>
            <Controller
              name="zip"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </div>

          {/* Country */}
          <div>
            <label>Country</label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </div>
          {servicesData?.data?.length > 0 && (
            <div className="md:col-span-2">
              <label>Services</label>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select services"
                value={selectedServices}
                onChange={setSelectedServices}
                options={servicesData?.data?.map((service) => ({
                  label: service.name,
                  value: service.id, // <- again, send ID
                }))}
                optionFilterProp="label"
              />
            </div>
          )}

          {/* Amenities */}
          {amenitiesData?.data?.length > 0 && (
            <div className="md:col-span-2">
              <label>Amenities</label>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select amenities"
                value={selectedAmenities}
                onChange={setSelectedAmenities}
                options={amenitiesData?.data?.map((amenity) => ({
                  label: amenity.name,
                  value: amenity.id, // <- send ID here, not name
                }))}
                optionFilterProp="label"
              />
            </div>
          )}
          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
