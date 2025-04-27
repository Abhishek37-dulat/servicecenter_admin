// import React, { useState } from "react";
// import { Upload, Select, Button, Input, message } from "antd";
// import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
// import { useParams } from "react-router-dom";
// import { useUpdateBusinessMutation, useUploadBusinessPhotosMutation } from "../../redux/services/businessApi";

// const galleryTypes = [
//   "Interior/Infrastructure",
//   "Food Items",
//   "Team",
//   "Events/Occasions",
//   "Certifications",
//   "Products",
//   "Customer Experience",
//   "Storefront/Exterior View",
// ];

// export default function BusinessGallery() {
//   const { id: businessId } = useParams();
//   const [uploadFile] = useUploadBusinessPhotosMutation();
//   const [updateBusiness, { isLoading }] = useUpdateBusinessMutation();

//   const [galleries, setGalleries] = useState([
//     { type: "", images: [] },
//   ]);

//   const updateGallery = (index, field, value) => {
//     const updated = [...galleries];
//     updated[index][field] = value;
//     setGalleries(updated);
//   };

//   const handleImageChange = (index, { fileList }) => {
//     updateGallery(index, "images", fileList);
//   };

//   const handleAddGallery = () => {
//     setGalleries([...galleries, { type: "", images: [] }]);
//   };

//   const handleRemoveGallery = (index) => {
//     const updated = galleries.filter((_, i) => i !== index);
//     setGalleries(updated);
//   };

//   const handleSave = async () => {
//     try {
//       message.loading({ content: "Uploading gallery images...", key: "uploading" });

//       const formData = new FormData();

//       for (const gallery of galleries) {
//         for (const file of gallery.images) {
//           if (file.originFileObj) {
//             formData.append('images', file.originFileObj);
//           }
//         }
//       }

//       await uploadFile({ businessId, formData }).unwrap();

//       message.success({ content: "Gallery images uploaded successfully!", key: "uploading" });
//     } catch (error) {
//       console.error(error);
//       message.error({ content: "Failed to upload gallery images", key: "uploading" });
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {galleries.map((gallery, index) => (
//         <div key={index} className="p-4 border rounded space-y-4">
//           <div className="flex gap-4">
//             <Select
//               placeholder="Select Gallery Type"
//               value={gallery.type}
//               onChange={(value) => updateGallery(index, "type", value)}
//               className="w-full"
//               options={galleryTypes.map((type) => ({ label: type, value: type }))}
//             />
//             <Button
//               danger
//               icon={<DeleteOutlined />}
//               onClick={() => handleRemoveGallery(index)}
//             />
//           </div>

//           <Upload
//             listType="picture-card"
//             fileList={gallery.images}
//             onChange={(info) => handleImageChange(index, info)}
//             beforeUpload={() => false} // prevent automatic upload
//             multiple
//           >
//             <div>
//               <PlusOutlined />
//               <div style={{ marginTop: 8 }}>Upload</div>
//             </div>
//           </Upload>
//         </div>
//       ))}

//       <div className="flex gap-4">
//         <Button onClick={handleAddGallery}>Add Another Gallery</Button>
//         <Button type="primary" loading={isLoading} onClick={handleSave}>
//           Save Galleries
//         </Button>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Upload, Select, Button, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useUpdateBusinessMutation,
  useUploadBusinessPhotosMutation,
} from "../../redux/services/businessApi";

const galleryTypes = [
  "Interior/Infrastructure",
  "Food Items",
  "Team",
  "Events/Occasions",
  "Certifications",
  "Products",
  "Customer Experience",
  "Storefront/Exterior View",
];

export default function Gallery({ data, businessId }) {
  const [uploadFile] = useUploadBusinessPhotosMutation();
  const [updateBusiness, { isLoading }] = useUpdateBusinessMutation();

  const [galleries, setGalleries] = useState([{ type: "", images: [] }]);

  const updateGallery = (index, field, value) => {
    const updated = [...galleries];
    updated[index][field] = value;
    setGalleries(updated);
  };

  const handleImageChange = (index, { fileList }) => {
    updateGallery(index, "images", fileList);
  };

  const handleAddGallery = () => {
    setGalleries([...galleries, { type: "", images: [] }]);
  };

  const handleRemoveGallery = (index) => {
    const updated = galleries.filter((_, i) => i !== index);
    setGalleries(updated);
  };
  const handleSave = async () => {
    try {
      const formData = new FormData();

      let hasImages = false;

      for (const gallery of galleries) {
        for (const file of gallery.images) {
          if (file.originFileObj instanceof File) {
            formData.append("images", file.originFileObj); // Make sure you're appending the actual file object
            hasImages = true;
          }
        }
      }

      if (!hasImages) {
        message.error({
          content: "Please select images before uploading.",
          key: "uploading",
        });
        return;
      }

      console.log("FormData being sent:", formData); // Log formData to verify
      const response = await uploadFile({ businessId, formData }).unwrap();

      message.success({
        content: "Gallery images uploaded successfully!",
        key: "uploading",
      });
    } catch (error) {
      console.error(error);
      message.error({
        content: "Failed to upload gallery images",
        key: "uploading",
      });
    }
  };

  return (
    <div className="space-y-8">
      {galleries.map((gallery, index) => (
        <div key={index} className="p-4 border rounded space-y-4">
          <div className="flex gap-4">
            <Select
              placeholder="Select Gallery Type"
              value={gallery.type}
              onChange={(value) => updateGallery(index, "type", value)}
              className="w-full"
              options={galleryTypes.map((type) => ({
                label: type,
                value: type,
              }))}
            />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleRemoveGallery(index)}
            />
          </div>

          <Upload
            listType="picture-card"
            fileList={gallery.images}
            onChange={(info) => handleImageChange(index, info)}
            beforeUpload={() => false} // prevent automatic upload
            multiple
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </div>
      ))}

      <div className="flex gap-4">
        <Button onClick={handleAddGallery}>Add Another Gallery</Button>
        <Button type="primary" loading={isLoading} onClick={handleSave}>
          Save Galleries
        </Button>
      </div>
    </div>
  );
}
