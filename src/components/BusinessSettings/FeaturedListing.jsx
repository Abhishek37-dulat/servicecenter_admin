import { Button } from "antd";
import React, { useState } from "react";

export default function FeaturedListing() {
  const [isFeatured, setIsFeatured] = useState(false);

  const handleSave = () => {
    console.log("Featured listing status saved:", isFeatured);
  };

  const handleCancel = () => {
    console.log("Changes canceled.");
  };

  return (
    <div>
      <h2>Featured Listing</h2>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          Feature this Business Listing
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
