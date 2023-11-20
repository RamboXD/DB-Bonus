import $api from "@/http";

interface organizationResponse {
  bin: string;
  fact_address: string;
  header_first_name: string;
  header_id: string;
  header_last_name: string;
  header_patronymic: string;
  id: string;
  inserted_at: string;
  official_address: string;
  official_name: string;
}

export const getOrganizations = () => {
  return $api.get<organizationResponse[]>(`/administration/organization`);
};
