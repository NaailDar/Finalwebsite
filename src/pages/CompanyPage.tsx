import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import CompanyTab from "@/components/apex/CompanyTab";

const CompanyPage = () => {
  const { section } = useParams();

  return (
    <>
      <Helmet>
        <title>Company - About ApexE3 | Agentic AI for Capital Markets</title>
        <meta name="description" content="Learn about ApexE3, our mission, team, careers, and contact information. We're building the future of agentic AI for capital markets." />
        <meta property="og:title" content="Company - About ApexE3 | Agentic AI for Capital Markets" />
        <meta property="og:description" content="Learn about ApexE3, our mission, team, and careers in agentic AI." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Company - About ApexE3" />
        <meta name="twitter:description" content="About ApexE3 - agentic AI for capital markets." />
      </Helmet>
      <CompanyTab scrollToSection={section} />
    </>
  );
};

export default CompanyPage;
