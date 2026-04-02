import { Helmet } from "react-helmet-async";
import ApiDataLayerTab from "@/components/apex/ApiDataLayerTab";

const ApisDataLayerPage = () => {
  return (
    <>
      <Helmet>
        <title>APIs & Data Layer - Integration Solutions | ApexE3</title>
        <meta name="description" content="APIs, SDKs, and data pipelines to integrate and extend your AI capabilities. Connect your systems with ApexE3's powerful data layer." />
        <meta property="og:title" content="APIs & Data Layer - Integration Solutions | ApexE3" />
        <meta property="og:description" content="APIs, SDKs, and data pipelines to integrate and extend your AI capabilities." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="APIs & Data Layer - Integration Solutions | ApexE3" />
        <meta name="twitter:description" content="APIs and data integration solutions." />
      </Helmet>
      <ApiDataLayerTab />
    </>
  );
};

export default ApisDataLayerPage;
