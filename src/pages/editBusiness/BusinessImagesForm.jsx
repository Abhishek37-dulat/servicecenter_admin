import { useState } from "react";
import { useUploadBusinessImagesMutation } from "../../redux/services/businessApi";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function BusinessImagesForm({ businessId }) {
  const [uploadBusinessImages, { isLoading }] = useUploadBusinessImagesMutation();
  const [fileList, setFileList] = useState([]);

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.error("Please select images to upload.");
      return;
    }

    const formData = new FormData();
    fileList.forEach(file => formData.append("images", file.originFileObj));

    await uploadBusinessImages({ businessId, formData });
    message.success("Images uploaded successfully!");
    setFileList([]); // Clear selection after upload
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Business Images</h2>
      <Upload
        listType="picture"
        fileList={fileList}
        beforeUpload={(file) => {
          setFileList([...fileList, file]);
          return false;
        }}
        onRemove={(file) => {
          setFileList(fileList.filter(item => item.uid !== file.uid));
        }}
      >
        <Button icon={<UploadOutlined />}>Select Images</Button>
      </Upload>
      <Button type="primary" onClick={handleUpload} loading={isLoading} className="mt-4">
        Upload
      </Button>
    </div>
  );
}
