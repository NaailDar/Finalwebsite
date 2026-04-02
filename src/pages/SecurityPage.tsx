import { Helmet } from "react-helmet-async";
import SecurityTab from "@/components/apex/SecurityTab";

const SecurityPage = () => {
  return (
    <>
      <Helmet>
        <title>Security - Enterprise-Grade Protection | ApexE3</title>
        <meta name="description" content="Enterprise-grade security for AI infrastructure. SOC 2 compliant, data sovereignty, and comprehensive security controls for capital markets." />
        <meta property="og:title" content="Security - Enterprise-Grade Protection | ApexE3" />
        <meta property="og:description" content="Enterprise-grade security for AI infrastructure in capital markets." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Security - Enterprise-Grade Protection | ApexE3" />
        <meta name="twitter:description" content="Enterprise security for AI infrastructure." />
      </Helmet>
      <SecurityTab />
    </>
  );
};

export default SecurityPage;
