import { Layout } from "@/components";
import { dealsTable } from "@/ts/types";
import { useState } from "react";
import { DealsTable } from "./components";

const Deals: React.FC = () => {
  const [deals, _] = useState<dealsTable[]>([]);

  return (
    <Layout>
      <p className="text-xl font-semibold">Организации</p>
      <DealsTable data={deals} />
    </Layout>
  );
};

export default Deals;
