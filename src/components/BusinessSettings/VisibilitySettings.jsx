import { Button } from "antd";
import React, { useState } from "react";

export default function VisibilitySettings() {
  const [visibility, setVisibility] = useState(true);

  const handleSave = () => {
    console.log("Visibility settings saved:", visibility);
  };

  const handleCancel = () => {
    console.log("Changes canceled.");
  };

  return (
    <div>
      <h2>Visibility Settings</h2>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={visibility}
            onChange={(e) => setVisibility(e.target.checked)}
          />
          Make Business Publicly Visible
        </label>
      </div>
      <div className="w-full flex justify-center mt-10">
        <div className="flex flex-row gap-4">
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
