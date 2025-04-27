import { Button } from "antd";
import React from "react";

export default function DeactivateBusiness() {
  const handleSave = () => {
    console.log("Business deactivated.");
  };

  const handleCancel = () => {
    console.log("Changes canceled.");
  };

  return (
    <div>
      <h2>Deactivate / Delete Business</h2>
      <div className="mb-4">
        <p>Are you sure you want to deactivate this business listing?</p>
      </div>
      <div className="w-full flex justify-center mt-10">
        <div className="flex flex-row gap-4">
          <Button type="primary" onClick={handleSave} danger>
            Deactivate
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
