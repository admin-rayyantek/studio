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
