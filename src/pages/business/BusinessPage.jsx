import { Tabs } from "antd";
import BusinessInfo from "../../components/Business/BusinessInfo";
import Gallery from "../../components/Business/Gallery";
import Location from "../../components/Business/Location";
import Contact from "../../components/Business/Contact";
import Timing from "../../components/Business/Timing";
import SEO from "../../components/Business/SEO";
import { useGetBusinessByIdQuery } from "../../redux/services/businessApi";
import { useParams } from "react-router-dom";

const { TabPane } = Tabs;

export default function BusinessPage() {
  const { id } = useParams();
  const { data } = useGetBusinessByIdQuery(id);
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="bg-white w-full max-w-5xl p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Business</h1>

        <Tabs defaultActiveKey="1" tabPosition="top" className="w-full">
          <TabPane tab="Business Info" key="1">
            <BusinessInfo data={data} businessId={id} />
          </TabPane>

          <TabPane tab="Gallery" key="2">
            <Gallery data={data} businessId={id} />
          </TabPane>

          <TabPane tab="Location" key="3">
            <Location data={data} businessId={id} />
          </TabPane>

          <TabPane tab="Contact" key="4">
            <Contact data={data} businessId={id} />
          </TabPane>

          <TabPane tab="Timing" key="5">
            <Timing data={data} businessId={id} />
          </TabPane>

          <TabPane tab="SEO" key="6">
            <SEO data={data} businessId={id} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
