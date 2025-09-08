





export type Student = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  balance: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  balance: number;
  orgId?: string;
  gender: 'male' | 'female';
  active: boolean;
  dateJoined: string;
  userType: 'student-tadris' | 'student-tahfiz' | 'student-tanwir' | 'staff';
  primaryPayment: 'cash' | 'card' | 'FACTS' | 'financial-aid';
  allergies?: string[];
}

export type Order = {
  id: string;
  studentId: string;
  meal: string;
  amount: number;
  date: string;
};

export type RecentOrderItem = {
    name: string;
    quantity: number;
    price: number;
}

export type RecentOrder = {
    id: string;
    date: string;
    studentId: string;
    name: string;
    email: string;
    total: number;
    items: RecentOrderItem[];
}

export type MenuEvent = {
  date: string;
  menuItems: VendorMenuItem[];
};

export type VendorMenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  allergens?: string[];
};

export type Vendor = {
  id:string;
  name: string;
  description: string;
  logo: string;
  menu: VendorMenuItem[];
};

export type TodaysMenuItem = {
  name: string;
  ordered: number;
  status: 'Taking Orders' | 'No Longer Taking Orders';
}

export type UserOrder = {
  id: string;
  date: string;
  items: string[];
  total: number;
}

export type UserPayment = {
  id: string;
  date: string;
  amount: number;
  method: 'card' | 'cash' | 'FACTS' | 'financial-aid';
  status: 'Paid' | 'Failed';
}
