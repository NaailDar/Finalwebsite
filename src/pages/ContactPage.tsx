import { Helmet } from "react-helmet-async";
import ContactTab from "@/components/apex/ContactTab";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact - Request a Demo | ApexE3</title>
        <meta name="description" content="Get in touch with ApexE3. Book a demo, contact sales, or try ALICE with our interactive demo. See how agentic AI transforms capital markets workflows." />
        <meta property="og:title" content="Contact - Request a Demo | ApexE3" />
        <meta property="og:description" content="Book a demo, contact sales, or try ALICE - agentic AI for capital markets." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Contact - Request a Demo | ApexE3" />
        <meta name="twitter:description" content="Get in touch with ApexE3 - agentic AI for capital markets." />
      </Helmet>
      <ContactTab />
    </>
  );
};

export default ContactPage;
