import { Layout } from "@/components";
import { organizationsTable } from "@/ts/types";
import { useEffect, useState } from "react";
import { getOrganizations } from "./api";
import { OrganizationsTable } from "./components";

const Organizations: React.FC = () => {
  const [organizations, setOrganizations] = useState<organizationsTable[]>([]);

  useEffect(() => {
    const get = async () => {
      const result = await getOrganizations();
      const organizations = result.data.map((org) => ({
        id: org.id,
        name: org.official_name,
        BIN: org.bin,
        head: `${org.header_first_name} ${org.header_patronymic} ${org.header_last_name}`,
      }));
      setOrganizations(organizations);
    };

    get();
  }, []);

  return (
    <Layout>
      <p className="text-xl font-semibold">Организации</p>
      <OrganizationsTable data={organizations} />
    </Layout>
  );
};

export default Organizations;
