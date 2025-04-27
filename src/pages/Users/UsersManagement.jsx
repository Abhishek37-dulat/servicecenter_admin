import React from "react";
import { Tabs } from "antd";

import AllUsers from "../../components/UsersManagement/AllUsers";
import AddUserForm from "../../components/UsersManagement/AddUserForm";
// import RolesPermissions from "../../components/UsersManagement/RolesPermissions";
// import ActivityLogs from "../../components/UsersManagement/ActivityLogs";
// import BlockedUsers from "../../components/UsersManagement/BlockedUsers";
// import FeedbackReports from "../../components/UsersManagement/FeedbackReports";

const { TabPane } = Tabs;

const UserManagement = () => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>
      <Tabs
        defaultActiveKey="1"
        tabBarGutter={32}
        tabBarStyle={{ marginBottom: 24 }}
        type="line"
      >
        <TabPane tab="All Users" key="1">
          <AllUsers />
        </TabPane>
        <TabPane tab="Add User" key="2">
          <AddUserForm />
        </TabPane>
        {/* <TabPane tab="Roles & Permissions" key="3">
          <RolesPermissions />
        </TabPane>
        <TabPane tab="Activity Logs" key="4">
          <ActivityLogs />
        </TabPane>
        <TabPane tab="Blocked Users" key="5">
          <BlockedUsers />
        </TabPane>
        <TabPane tab="Feedback & Reports" key="6">
          <FeedbackReports />
        </TabPane> */}
      </Tabs>
    </div>
  );
};

export default UserManagement;
