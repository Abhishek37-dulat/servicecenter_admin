import { Button } from "antd";
import React, { useState } from "react";

export default function CategoriesAndTags() {
  const [categories, setCategories] = useState(["Restaurant", "Cafe"]);

  const handleSave = () => {
    console.log("Categories & Tags saved:", categories);
  };

  const handleCancel = () => {
    console.log("Changes canceled.");
  };

  return (
    <div>
      <h2>Categories & Tags</h2>
      <div className="mb-4">
        <label>Categories:</label>
        <input
          type="text"
          value={categories.join(", ")}
          onChange={(e) => setCategories(e.target.value.split(", "))}
        />
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
