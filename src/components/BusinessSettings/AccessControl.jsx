import { Button } from "antd";
import React, { useState } from "react";

export default function AccessControl() {
  const [roles, setRoles] = useState({
    admin: true,
    manager: false,
    user: false,
  });

  const handleSave = () => {
    console.log("Access control saved:", roles);
  };

  const handleCancel = () => {
    console.log("Changes canceled.");
  };

  return (
    <div>
      <h2>User Access & Roles</h2>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={roles.admin}
            onChange={(e) => setRoles({ ...roles, admin: e.target.checked })}
          />
          Admin
        </label>
      </div>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={roles.manager}
            onChange={(e) => setRoles({ ...roles, manager: e.target.checked })}
          />
          Manager
        </label>
      </div>
      <div className="mb-4">
        <label>
          <input
            type="checkbox"
            checked={roles.user}
            onChange={(e) => setRoles({ ...roles, user: e.target.checked })}
          />
          User
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
