import { Helmet } from "react-helmet-async";
import OverviewTab from "@/components/apex/OverviewTab";
import type { TabId } from "@/components/apex/TabNavigation";

interface HomePageProps {
  onTabChange: (tab: TabId, section?: string) => void;
}

const HomePage = ({ onTabChange }: HomePageProps) => {
  return (
    <>
      <Helmet>
        <title>ApexE3 - Agentic AI Infrastructure for Capital Markets</title>
        <meta name="description" content="ApexE3 provides award-winning agentic AI infrastructure for capital markets. ALICE delivers portfolio management, trading, and research solutions." />
        <meta property="og:title" content="ApexE3 - Agentic AI Infrastructure for Capital Markets" />
        <meta property="og:description" content="Award-winning agentic AI infrastructure for capital markets. Portfolio management, trading, and research solutions." />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="ApexE3 - Agentic AI Infrastructure for Capital Markets" />
        <meta name="twitter:description" content="Award-winning agentic AI infrastructure for capital markets." />
      </Helmet>
      <OverviewTab onTabChange={onTabChange} isHome />
    </>
  );
};

export default HomePage;
