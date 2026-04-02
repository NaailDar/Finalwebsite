import { Helmet } from "react-helmet-async";
import BespokeWorkflowsTab from "@/components/apex/BespokeWorkflowsTab";

const BespokeWorkflowsPage = () => {
  return (
    <>
      <Helmet>
        <title>Bespoke Workflows - Custom AI Solutions | ApexE3</title>
        <meta name="description" content="Custom AI workflows tailored to your specific business processes. Build bespoke solutions for your capital markets operations." />
        <meta property="og:title" content="Bespoke Workflows - Custom AI Solutions | ApexE3" />
        <meta property="og:description" content="Custom AI workflows tailored to your specific business processes in capital markets." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Bespoke Workflows - Custom AI Solutions | ApexE3" />
        <meta name="twitter:description" content="Custom AI workflows for capital markets." />
      </Helmet>
      <BespokeWorkflowsTab />
    </>
  );
};

export default BespokeWorkflowsPage;
