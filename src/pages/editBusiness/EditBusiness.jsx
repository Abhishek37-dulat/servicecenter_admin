// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Tabs, Spin, message } from "antd";
// import { useGetBusinessByIdQuery, useUpdateBusinessMutation } from "../../redux/services/businessApi";
// import BasicDetailsForm from "./BasicDetailsForm";
// import BusinessImagesForm from "./BusinessImagesForm";
// import OtherDetailsForm from "./OtherDetailsForm";

// const EditBusiness = () => {
//   const { id } = useParams();
//   const { data, isLoading } = useGetBusinessByIdQuery(id);
//   const [updateBusiness, { isLoading: isUpdating, isSuccess }] = useUpdateBusinessMutation();

//   const [business, setBusiness] = useState(null);

//   useEffect(() => {
//     if (data) setBusiness(data.business);
//   }, [data]);

//   useEffect(() => {
//     if (isSuccess) message.success("Business updated successfully!");
//   }, [isSuccess]);

//   if (isLoading) return <Spin size="large" className="flex justify-center items-center h-screen" />;

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Edit Business</h2>
//       <Tabs defaultActiveKey="1">
//         <Tabs.TabPane tab="Basic Details" key="1">
//           <BasicDetailsForm business={business} updateBusiness={updateBusiness} isUpdating={isUpdating} />
//         </Tabs.TabPane>
//         <Tabs.TabPane tab="Images" key="2">
//           <BusinessImagesForm business={business} updateBusiness={updateBusiness} isUpdating={isUpdating} />
//         </Tabs.TabPane>
//         <Tabs.TabPane tab="Other Details" key="3">
//           <OtherDetailsForm business={business} updateBusiness={updateBusiness} isUpdating={isUpdating} />
//         </Tabs.TabPane>
//       </Tabs>
//     </div>
//   );
// };

// export default EditBusiness;
