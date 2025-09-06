
import type { Student, Order, MenuEvent, Vendor } from '@/types';

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

export const vendors: Vendor[] = [
  {
    id: 'V001',
    name: 'Pizza Palace',
    description: 'The best pizza in town, made with fresh ingredients and a whole lot of love.',
    logo: 'https://picsum.photos/200/200',
    menu: [
      { id: 'M001', name: 'Margherita Pizza', description: 'Classic cheese and tomato pizza.', price: 10.99 },
      { id: 'M002', name: 'Pepperoni Pizza', description: 'Loaded with pepperoni and extra cheese.', price: 12.99 },
      { id: 'M003', name: 'Garlic Bread', description: 'Served with marinara sauce.', price: 5.99 },
    ],
  },
  {
    id: 'V002',
    name: 'The Taco Truck',
    description: 'Authentic street tacos with a modern twist. Always fresh, always delicious.',
    logo: 'https://picsum.photos/200/200',
    menu: [
      { id: 'M004', name: 'Carne Asada Taco', description: 'Grilled steak, onions, and cilantro.', price: 3.50 },
      { id: 'M005', name: 'Al Pastor Taco', description: 'Marinated pork with pineapple.', price: 3.50 },
      { id: 'M006', name: 'Chips and Guacamole', description: 'Made fresh daily.', price: 6.50 },
    ],
  },
  {
    id: 'V003',
    name: 'Italian Express',
    description: 'Quick and tasty Italian classics, perfect for a satisfying lunch.',
    logo: 'https://picsum.photos/200/200',
    menu: [
      { id: 'M007', name: 'Spaghetti Bolognese', description: 'Rich meat sauce over spaghetti.', price: 11.99 },
      { id: 'M008', name: 'Fettuccine Alfredo', description: 'Creamy Alfredo sauce with fettuccine.', price: 11.99 },
      { id: 'M009', name: 'Caesar Salad', description: 'Crisp romaine with Caesar dressing.', price: 8.99 },
    ],
  },
];

export const menuEvents: MenuEvent[] = [
  { date: '2023-11-01', menuItems: [vendors[0].menu[1]] },
  { date: '2023-11-02', menuItems: [vendors[1].menu[0], vendors[1].menu[1]] },
  { date: '2023-11-03', menuItems: [vendors[2].menu[0]] },
  { date: '2023-11-15', menuItems: [] },
  { date: '2023-11-24', menuItems: [] },
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
