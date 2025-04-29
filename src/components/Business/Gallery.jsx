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
import React, { useState, useEffect, useRef } from "react";
import { Select, Button, message, Popconfirm, Card } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useUpdateBusinessMutation,
  useUploadBusinessPhotosMutation,
  useDeleteBusinessPhotoMutation,
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
  const [deletePhoto] = useDeleteBusinessPhotoMutation();
  console.log(data);
  const [galleries, setGalleries] = useState([]);
  const fileInputRefs = useRef([]);

  useEffect(() => {
    if (data?.data?.galleries?.length > 0) {
      const loadedGalleries = data.data.galleries.reduce((acc, img) => {
        const existing = acc.find((g) => g.type === img.type);
        if (existing) {
          existing.existingImages.push({ id: img.id, url: img.photoUrl });
        } else {
          acc.push({
            type: img.type,
            images: [],
            existingImages: [{ id: img.id, url: img.photoUrl }],
          });
        }
        return acc;
      }, []);
      setGalleries(loadedGalleries);
    }
  }, [data]);

  const updateGallery = (index, field, value) => {
    const updated = [...galleries];
    updated[index][field] = value;
    setGalleries(updated);
  };

  const handleFileChange = (index, event) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    const updated = [...galleries];
    updated[index].images = files;
    setGalleries(updated);
  };

  const handleDeleteGallery = (index) => {
    setGalleries((prev) => prev.filter((_, i) => i !== index));
  };

  const openFilePicker = (index) => {
    fileInputRefs.current[index]?.click();
  };

  const handleDeleteExistingImage = async (
    galleryIndex,
    imageId,
    businessId
  ) => {
    console.log(
      "Deleting image with ID:",
      imageId,
      "from gallery index:",
      galleryIndex
    );

    // Ensure imageId is a valid string or number
    if (
      !imageId ||
      (typeof imageId !== "string" && typeof imageId !== "number")
    ) {
      console.error("Invalid imageId:", imageId);
      message.error("Invalid image ID.");
      return;
    }

    try {
      // ✅ Correct: send both businessId and photoId in a single object
      await deletePhoto({ businessId, photoId: imageId }).unwrap();

      message.success("Image deleted successfully!");

      const updated = [...galleries];
      updated[galleryIndex].existingImages = updated[
        galleryIndex
      ].existingImages.filter((img) => img.id !== imageId);
      setGalleries(updated);
    } catch (error) {
      console.error("Error deleting image:", error);
      message.error("Failed to delete image!");
    }
  };

  const handleSaveGallery = async () => {
    try {
      message.loading({
        content: "Saving galleries...",
        key: "saving",
      });

      // Loop through each gallery to process images
      for (const gallery of galleries) {
        const formData = new FormData();
        formData.append("type", gallery.type); // Append gallery type

        // Append each image from the gallery to the form data
        for (const file of gallery.images) {
          formData.append("images", file);
        }

        // Check if there are images to upload
        if (gallery.images.length > 0) {
          // Upload the images along with the gallery type
          await uploadFile({ businessId, formData }).unwrap();
        }
      }

      // Success message after uploading
      message.success({
        content: "Gallery saved successfully!",
        key: "saving",
      });
    } catch (error) {
      // Error handling
      console.error(error);
      message.error({
        content: "Failed to save galleries",
        key: "saving",
      });
    }
  };

  return (
    <div className="gallery-container">
      {/* Existing Galleries */}
      <div className="existing-galleries">
        {galleries.map((gallery, index) => (
          <Card
            key={index}
            title={
              <div className="flex justify-between">
                <div style={{ width: "200px" }}>
                  <Select
                    value={gallery.type}
                    onChange={(value) => updateGallery(index, "type", value)}
                    style={{ width: "100%" }}
                    options={galleryTypes.map((type) => ({
                      label: type,
                      value: type,
                    }))}
                  />
                </div>
                <div className="actions">
                  <Popconfirm
                    title="Delete this gallery?"
                    onConfirm={() => handleDeleteGallery(index)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button icon={<DeleteOutlined />} danger />
                  </Popconfirm>
                </div>
              </div>
            }
          >
            <div className="image-gallery">
              {/* Show existing images */}
              {gallery.existingImages.map((img, i) => (
                <div key={i} className="image-item">
                  <img src={img.url} alt="gallery" width={100} height={100} />
                  <Button
                    size="small"
                    danger
                    onClick={() =>
                      handleDeleteExistingImage(index, img.id, businessId)
                    }
                    icon={<DeleteOutlined />}
                  />
                </div>
              ))}
              {/* Show selected images as preview */}
              {gallery.images.length > 0 && (
                <div className="image-preview">
                  {gallery.images.map((file, i) => (
                    <div key={i} className="image-item">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        width={100}
                        height={100}
                        style={{ marginBottom: 8 }}
                      />
                      <Button
                        size="small"
                        danger
                        onClick={() => {
                          const updated = [...galleries];
                          updated[index].images = updated[index].images.filter(
                            (_, idx) => idx !== i
                          );
                          setGalleries(updated);
                        }}
                        icon={<DeleteOutlined />}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Manually placed Upload Button */}
            <Button
              onClick={() => openFilePicker(index)}
              icon={<PlusOutlined />}
              style={{ marginTop: 10 }}
            >
              Upload Images
            </Button>
            <input
              type="file"
              multiple
              ref={(el) => (fileInputRefs.current[index] = el)}
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(index, e)}
            />
          </Card>
        ))}
      </div>

      {/* Add New Gallery */}
      <Button
        type="dashed"
        onClick={() =>
          setGalleries([
            ...galleries,
            { type: "", images: [], existingImages: [] },
          ])
        }
        icon={<PlusOutlined />}
      >
        Add New Gallery
      </Button>

      {/* Save Button */}
      <Button
        type="primary"
        onClick={handleSaveGallery}
        loading={isLoading}
        className="save-gallery-btn"
      >
        Save Galleries
      </Button>
    </div>
  );
}
