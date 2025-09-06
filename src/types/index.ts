export type Student = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  balance: number;
};

export type Order = {
  id: string;
  studentId: string;
  meal: string;
  amount: number;
  date: string;
};

export type MenuEvent = {
  date: string;
  title: string;
  description: string;
};

export type VendorMenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type Vendor = {
  id: string;
  name: string;
  description: string;
  logo: string;
  menu: VendorMenuItem[];
};
