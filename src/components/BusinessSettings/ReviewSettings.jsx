import { Button } from "antd";
import React, { useState } from "react";

export default function ReviewSettings() {
  const [reviewApproval, setReviewApproval] = useState({
    autoApprove: false,
    allowReporting: true,
  });

  const handleSave = () => {
    console.log("Review settings saved:", reviewApproval);
  };

  const handleCancel = () => {
    console.log("Changes canceled.");
  };

  return (
    <div>
      <h2>Review Settings</h2>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={reviewApproval.autoApprove}
            onChange={(e) =>
              setReviewApproval({
                ...reviewApproval,
                autoApprove: e.target.checked,
              })
            }
          />
          Auto Approve Reviews
        </label>
      </div>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={reviewApproval.allowReporting}
            onChange={(e) =>
              setReviewApproval({
                ...reviewApproval,
                allowReporting: e.target.checked,
              })
            }
          />
          Allow Users to Report Reviews
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
