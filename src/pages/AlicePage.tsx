import { Helmet } from "react-helmet-async";
import OverviewTab from "@/components/apex/OverviewTab";
import type { TabId } from "@/components/apex/TabNavigation";

interface AlicePageProps {
  onTabChange: (tab: TabId, section?: string) => void;
}

const AlicePage = ({ onTabChange }: AlicePageProps) => {
  return (
    <>
      <Helmet>
        <title>ALICE - Agentic AI for Capital Markets | ApexE3</title>
        <meta name="description" content="ALICE is an award-winning agentic AI platform for capital markets. Solutions for portfolio managers, traders, quants, researchers, and developers." />
        <meta property="og:title" content="ALICE - Agentic AI for Capital Markets | ApexE3" />
        <meta property="og:description" content="Award-winning agentic AI platform for portfolio managers, traders, quants, researchers, and developers in capital markets." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="ALICE - Agentic AI for Capital Markets | ApexE3" />
        <meta name="twitter:description" content="Award-winning agentic AI platform for capital markets." />
      </Helmet>
      <OverviewTab onTabChange={onTabChange} />
    </>
  );
};

export default AlicePage;
