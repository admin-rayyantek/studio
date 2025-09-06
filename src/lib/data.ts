import type { Student, Order, MenuEvent } from '@/types';

export const students: Student[] = [
  {
    id: 'S001',
    name: 'Olivia Martin',
    email: 'olivia.martin@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    balance: 120.5,
  },
  {
    id: 'S002',
    name: 'Jackson Lee',
    email: 'jackson.lee@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    balance: 85.0,
  },
  {
    id: 'S003',
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    balance: 210.75,
  },
  {
    id: 'S004',
    name: 'William Kim',
    email: 'will@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    balance: -15.2,
  },
  {
    id: 'S005',
    name: 'Sofia Davis',
    email: 'sofia.davis@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
    balance: 5.5,
  },
];

export const orders: Order[] = [
  {
    id: 'ORD001',
    studentId: 'S001',
    meal: 'Chicken Teriyaki',
    amount: 7.5,
    date: '2023-10-26',
  },
  {
    id: 'ORD002',
    studentId: 'S002',
    meal: 'Spaghetti Bolognese',
    amount: 8.0,
    date: '2023-10-26',
  },
  {
    id: 'ORD003',
    studentId: 'S003',
    meal: 'Vegetable Curry',
    amount: 7.0,
    date: '2023-10-26',
  },
  {
    id: 'ORD004',
    studentId: 'S004',
    meal: 'Cheeseburger & Fries',
    amount: 8.5,
    date: '2023-10-25',
  },
  {
    id: 'ORD005',
    studentId: 'S005',
    meal: 'Caesar Salad',
    amount: 6.5,
    date: '2023-10-25',
  },
];

export const menuEvents: MenuEvent[] = [
  { date: '2023-11-01', title: 'Pizza Day', description: 'Assorted pizzas from Pizza Palace.' },
  { date: '2023-11-02', title: 'Taco Tuesday (on Thurs)', description: 'Build your own tacos from The Taco Truck.' },
  { date: '2023-11-03', title: 'Pasta Party', description: 'Various pasta dishes from Italian Express.' },
  { date: '2023-11-15', title: 'Sushi Special', description: 'Fresh sushi rolls from Sushi World.' },
  { date: '2023-11-24', title: 'Thanksgiving Feast', description: 'Turkey, stuffing, and all the fixings.' },
];

export const orderHistoryData = [
  { date: '2023-10-01', orders: 150, balance: 1200 },
  { date: '2023-10-02', orders: 155, balance: 1240 },
  { date: '2023-10-03', orders: 160, balance: 1280 },
  { date: '2023-10-04', orders: 145, balance: 1160 },
  { date: '2023-10-05', orders: 165, balance: 1320 },
  { date: '2023-10-06', orders: 170, balance: 1360 },
  { date: '2023-10-07', orders: 168, balance: 1344 },
];

export const recentOrders = [
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    meal: 'Chicken Teriyaki',
    amount: '+$7.50',
  },
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    meal: 'Spaghetti Bolognese',
    amount: '+$8.00',
  },
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    meal: 'Vegetable Curry',
    amount: '+$7.00',
  },
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    name: 'William Kim',
    email: 'will@email.com',
    meal: 'Cheeseburger & Fries',
    amount: '+$8.50',
  },
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    meal: 'Caesar Salad',
    amount: '+$6.50',
  },
];
