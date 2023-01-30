import { Role, Simulator } from "@/types/enum";

export interface IPortfolio {
  filename: string;
  displayName: string;
  uploadAt: string;
}

export interface Monetization {
  ignoreSimulators: Array<Simulator>;
  factor: number;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  maxMembers: number;
}

export interface IUser {
  _id: string;

  firstName: string;

  lastName: string;

  phone: string | null;

  lastLogin: string | null;

  profileImg: string | null;

  rate: number;

  points: number;

  status: boolean;

  birthDate: string | null;

  device: Array<string>;

  role: Role;

  email: string;

  description: string | null;

  city: string | null;

  address: string | null;

  portfolio: Array<IPortfolio>;

  // centres: Array<Centre>;

  maxGroups: number;

  monetization: Monetization | null;

  plan: Plan | null;

  balance: number;

  isAdmin: boolean;

  createdAt: string;

  group: string;
}
