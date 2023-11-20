import $api from "@/http";

export const workerLogin = (xmlData: string) => {
  return $api.post("/authorization/worker", {
    xml_to_sign: xmlData,
  });
};
