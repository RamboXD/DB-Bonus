import {
  ClientLogin,
  Deals,
  Employees,
  Organization,
  Organizations,
  Registration,
  WorkerLogin,
} from "@/pages";
import { IRoute, Role } from "@/ts/types";

export const routes: IRoute[] = [
  {
    name: "Client Login",
    path: "/login/client",
    component: <ClientLogin />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: true,
  },
  {
    name: "Worker Login",
    path: "/login/worker",
    component: <WorkerLogin />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: true,
  },
  {
    name: "Deals",
    path: "/administration/deals",
    component: <Deals />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: true,
  },
  {
    name: "Organizations",
    path: "/administration/organizations",
    component: <Organizations />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "Organizations",
    path: "/administration/organizations/:id",
    component: <Organization />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "Employees",
    path: "/administration/employees",
    component: <Employees />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: false,
  },
  {
    name: "Registration",
    path: "/registration",
    component: <Registration />,
    roles: [Role.CLIENT, Role.ADMIN],
    isPublic: true,
  },  
];
