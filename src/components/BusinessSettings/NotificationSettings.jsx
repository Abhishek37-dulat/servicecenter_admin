import { Button } from "antd";
import React, { useState } from "react";

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    newReview: true,
    newMessage: true,
  });

  const handleSave = () => {
    console.log("Notification settings saved:", notifications);
  };

  const handleCancel = () => {
    console.log("Changes canceled.");
  };

  return (
    <div>
      <h2>Notification Settings</h2>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={notifications.newReview}
            onChange={(e) =>
              setNotifications({
                ...notifications,
                newReview: e.target.checked,
              })
            }
          />
          Notify on New Review
        </label>
      </div>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={notifications.newMessage}
            onChange={(e) =>
              setNotifications({
                ...notifications,
                newMessage: e.target.checked,
              })
            }
          />
          Notify on New Message
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
