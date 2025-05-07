import { Tabs } from "antd";
import PrivacySettings from "../../components/BusinessSettings/PrivacySettings";
import NotificationSettings from "../../components/BusinessSettings/NotificationSettings";
import AccessControl from "../../components/BusinessSettings/AccessControl";
import DeactivateBusiness from "../../components/BusinessSettings/DeactivateBusiness";
import VisibilitySettings from "../../components/BusinessSettings/VisibilitySettings";
import FeaturedListing from "../../components/BusinessSettings/FeaturedListing";
import CategoriesAndTags from "../../components/BusinessSettings/CategoriesAndTags";
import ReviewSettings from "../../components/BusinessSettings/ReviewSettings";

const { TabPane } = Tabs;

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="bg-white w-full max-w-5xl p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Business Settings
        </h1>

        <Tabs defaultActiveKey="1" tabPosition="top" className="w-full">
          <TabPane tab="Privacy Settings" key="1">
            <PrivacySettings />
          </TabPane>
          <TabPane tab="Notifications" key="2">
            <NotificationSettings />
          </TabPane>
          <TabPane tab="User Access & Roles" key="3">
            <AccessControl />
          </TabPane>
          <TabPane tab="Deactivate / Delete" key="4">
            <DeactivateBusiness />
          </TabPane>
          <TabPane tab="Visibility Settings" key="5">
            <VisibilitySettings />
          </TabPane>
          <TabPane tab="Featured Listing" key="6">
            <FeaturedListing />
          </TabPane>
          <TabPane tab="Categories & Tags" key="7">
            <CategoriesAndTags />
          </TabPane>
          <TabPane tab="Review Settings" key="8">
            <ReviewSettings />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
