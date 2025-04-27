import { Button } from "antd";
import React, { useState } from "react";

export default function PrivacySettings() {
  const [privacy, setPrivacy] = useState({
    contactVisible: true,
    galleryVisible: true,
    reviewsVisible: true,
  });

  const handleSave = () => {
    // Handle save logic (maybe an API call to save privacy settings)
    console.log("Privacy settings saved:", privacy);
  };

  const handleCancel = () => {
    // Reset to previous state or handle cancel logic
    console.log("Changes canceled.");
  };

  return (
    <div>
      <h2>Privacy Settings</h2>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={privacy.contactVisible}
            onChange={(e) =>
              setPrivacy({ ...privacy, contactVisible: e.target.checked })
            }
          />
          Show Contact Info
        </label>
      </div>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={privacy.galleryVisible}
            onChange={(e) =>
              setPrivacy({ ...privacy, galleryVisible: e.target.checked })
            }
          />
          Show Gallery
        </label>
      </div>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={privacy.reviewsVisible}
            onChange={(e) =>
              setPrivacy({ ...privacy, reviewsVisible: e.target.checked })
            }
          />
          Show Reviews
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
