import { Tabs } from "antd";
import BusinessNews from "../../components/Blog/BusinessNews";
import MarketingTips from "../../components/Blog/MarketingTips";
import SEOTricks from "../../components/Blog/SEOTricks";
import AdminBlogManager from "../../components/Blog/AdminBlogManager";
import SuccessStories from "../../components/Blog/SuccessStories";
import LocalSpotlights from "../../components/Blog/LocalSpotlights";
import EventsPromotions from "../../components/Blog/EventsPromotions";
import PlatformTips from "../../components/Blog/PlatformTips";

const { TabPane } = Tabs;

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="bg-white w-full max-w-5xl p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Business Blog & Insights
        </h1>

        <Tabs defaultActiveKey="1" tabPosition="top" className="w-full">
          <TabPane tab="Business News" key="1">
            <BusinessNews />
          </TabPane>
          <TabPane tab="Marketing Tips" key="2">
            <MarketingTips />
          </TabPane>
          <TabPane tab="SEO & Growth Hacks" key="3">
            <SEOTricks />
          </TabPane>
          <TabPane tab="Success Stories" key="4">
            <SuccessStories />
          </TabPane>
          <TabPane tab="Local Spotlights" key="5">
            <LocalSpotlights />
          </TabPane>
          <TabPane tab="Events & Promotions" key="6">
            <EventsPromotions />
          </TabPane>
          <TabPane tab="Platform Tips" key="7">
            <PlatformTips />
          </TabPane>
          <TabPane tab="Admin Blog Manager" key="8">
            <AdminBlogManager />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
