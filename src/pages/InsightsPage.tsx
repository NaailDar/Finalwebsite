import { Helmet } from "react-helmet-async";
import InsightsTab from "@/components/apex/InsightsTab";

const InsightsPage = () => {
  return (
    <>
      <Helmet>
        <title>Insights - AI & Capital Markets Blog | ApexE3</title>
        <meta name="description" content="Latest insights on AI, machine learning, and their applications in capital markets. Thought leadership from ApexE3 experts." />
        <meta property="og:title" content="Insights - AI & Capital Markets Blog | ApexE3" />
        <meta property="og:description" content="Latest insights on AI and machine learning in capital markets." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Insights - AI & Capital Markets Blog | ApexE3" />
        <meta name="twitter:description" content="AI and capital markets insights." />
      </Helmet>
      <InsightsTab />
    </>
  );
};

export default InsightsPage;
