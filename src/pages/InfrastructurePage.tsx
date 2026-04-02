import { Helmet } from "react-helmet-async";
import InfrastructureTab from "@/components/apex/InfrastructureTab";

const InfrastructurePage = () => {
  return (
    <>
      <Helmet>
        <title>Infrastructure - Enterprise AI Platform | ApexE3</title>
        <meta name="description" content="Enterprise-grade AI infrastructure for capital markets. Secure, scalable deployment options including cloud, on-premise, and hybrid solutions." />
        <meta property="og:title" content="Infrastructure - Enterprise AI Platform | ApexE3" />
        <meta property="og:description" content="Enterprise-grade AI infrastructure for capital markets with secure, scalable deployment options." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Infrastructure - Enterprise AI Platform | ApexE3" />
        <meta name="twitter:description" content="Enterprise AI infrastructure for capital markets." />
      </Helmet>
      <InfrastructureTab />
    </>
  );
};

export default InfrastructurePage;
