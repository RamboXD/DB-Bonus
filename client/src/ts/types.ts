export enum Role {
  CLIENT = "CLIENT",
  ADMIN = "ADMIN",
}

export type IRoute = {
  name: string;
  path: string;
  component: React.ReactElement;
  roles: Role[];
  isPublic: boolean;
};

export type organization_type = {
  id: string;
  name: string;
};

export type ecpData = {
  BIN: string;
  IIN: string;
  name: string;
  surname: string;
  patronymic: string;
  email: string;
  organization: string;
  organization_types: organization_type[];
};

type Citizenship = {
  value: string;
};

type SignedXML = {
  bin: string;
  certsn: string;
  cn: string;
  email: string;
  givenname: string;
  iin: string;
  org: string;
  surname: string;
};

export type signResponse = {
  citizenships: Citizenship[];
  signed_xml: SignedXML;
  organization_types: organization_type[];
};

type AtsType = {
  is_city: boolean;
  priority: boolean;
  short_value_kz: string;
  short_value_ru: string;
  value_kz: string;
  value_ru: string;
};

export type LocationResponse = {
  actual: boolean;
  ats_type: AtsType;
  ats_type_id: number;
  cato: string;
  children: null | LocationResponse[];
  full_path_kaz: string;
  full_path_rus: string;
  id: number;
  modified: string;
  name_kaz: string;
  name_rus: string;
  parent_id: number;
  rco: string;
}[];

interface User {
  email: string;
  password: string;
  givenName: string;
  surname: string;
  city: string;
  phoneNumber: string;
  profileDescription: string;
}

interface Caregiver {
  photo: string;
  gender: string;
  caregivingType: string;
  hourlyRate: number;
}

export interface caregiverData {
  user: User;
  caregiver: Caregiver;
}

export type caregiverRegistartionForm = {
  step: number;
  email: string;
  password: string;
  givenName: string;
  surname: string;
  city: string;
  phoneNumber: string;
  profileDescription: string;
  photo: string;
  gender: string;
  caregivingType: string;
  hourlyRate: number;
};

export type organizationsTable = {
  id: string;
  name: string;
  BIN: string;
  head: string;
};

export type dealsTable = {
  id: string;
  name: string;
};
