import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import WorkflowsTab from "@/components/apex/WorkflowsTab";

const SolutionsPage = () => {
  const { section } = useParams();

  return (
    <>
      <Helmet>
        <title>Solutions - AI Workflows for Capital Markets | ApexE3</title>
        <meta name="description" content="AI-powered solutions for portfolio management, trading, quantitative analysis, research, and development in capital markets." />
        <meta property="og:title" content="Solutions - AI Workflows for Capital Markets | ApexE3" />
        <meta property="og:description" content="AI-powered solutions for portfolio management, trading, quantitative analysis, research, and development." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Solutions - AI Workflows for Capital Markets | ApexE3" />
        <meta name="twitter:description" content="AI-powered solutions for capital markets." />
      </Helmet>
      <WorkflowsTab scrollToSection={section} />
    </>
  );
};

export default SolutionsPage;
