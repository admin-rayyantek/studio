import type { Student, Order, MenuEvent, Vendor, User } from '@/types';

export const students: Student[] = [
  {
    id: 'S001',
    name: 'Aisha Khan',
    email: 'aisha.khan@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    balance: 120.5,
  },
  {
    id: 'S002',
    name: 'Yusuf Ahmed',
    email: 'yusuf.ahmed@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    balance: 85.0,
  },
  {
    id: 'S003',
    name: 'Fatima Al-Fassi',
    email: 'fatima.alfassi@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    balance: 210.75,
  },
  {
    id: 'S004',
    name: 'Omar Abdullah',
    email: 'omar.abdullah@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    balance: -15.2,
  },
  {
    id: 'S005',
    name: 'Layla Ibrahim',
    email: 'layla.ibrahim@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
    balance: 5.5,
  },
];


export const allUsers: User[] = [
  {
    id: 'S001',
    name: 'Aisha Khan',
    email: 'aisha.khan@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    balance: 120.5,
    orgId: 'ORG001',
    gender: 'female',
    active: true,
    dateJoined: '2023-01-15',
    userType: 'student-tadris',
    primaryPayment: 'card',
  },
  {
    id: 'S002',
    name: 'Yusuf Ahmed',
    email: 'yusuf.ahmed@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    balance: 85.0,
    orgId: 'ORG002',
    gender: 'male',
    active: true,
    dateJoined: '2023-02-20',
    userType: 'student-tahfiz',
    primaryPayment: 'cash',
  },
  {
    id: 'STF001',
    name: 'Mr. Ali Hassan',
    email: 'ali.hassan@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d',
    balance: 0,
    orgId: 'STF-A1',
    gender: 'male',
    active: true,
    dateJoined: '2022-08-01',
    userType: 'staff',
    primaryPayment: 'card',
  },
  {
    id: 'S003',
    name: 'Fatima Al-Fassi',
    email: 'fatima.alfassi@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    balance: -25.0,
    orgId: 'ORG003',
    gender: 'female',
    active: false,
    dateJoined: '2023-03-10',
    userType: 'student-tanwir',
    primaryPayment: 'FACTS',
  },
    {
    id: 'S004',
    name: 'Omar Abdullah',
    email: 'omar.abdullah@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    balance: -15.2,
    orgId: 'ORG004',
    gender: 'male',
    active: true,
    dateJoined: '2023-04-05',
    userType: 'student-tadris',
    primaryPayment: 'financial-aid',
  },
  {
    id: 'S005',
    name: 'Layla Ibrahim',
    email: 'layla.ibrahim@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
    balance: 5.5,
    orgId: 'ORG005',
    gender: 'female',
    active: true,
    dateJoined: '2023-05-12',
    userType: 'student-tahfiz',
    primaryPayment: 'card',
  },
];


export const orders: Order[] = [
  {
    id: 'ORD001',
    studentId: 'S001',
    meal: 'Chicken Shawarma',
    amount: 7.5,
    date: '2023-10-26',
  },
  {
    id: 'ORD002',
    studentId: 'S002',
    meal: 'Beef Kofta',
    amount: 8.0,
    date: '2023-10-26',
  },
  {
    id: 'ORD003',
    studentId: 'S003',
    meal: 'Vegetable Tagine',
    amount: 7.0,
    date: '2023-10-26',
  },
  {
    id: 'ORD004',
    studentId: 'S004',
    meal: 'Lamb Burger & Fries',
    amount: 8.5,
    date: '2023-10-25',
  },
  {
    id: 'ORD005',
    studentId: 'S005',
    meal: 'Fattoush Salad',
    amount: 6.5,
    date: '2023-10-25',
  },
];

export const vendors: Vendor[] = [
  {
    id: 'V001',
    name: 'Pide Palace',
    description: 'Authentic Turkish Pide and more.',
    logo: 'https://picsum.photos/seed/pide/200/200',
    menu: [
      { id: 'M001', name: 'Lahmacun', description: 'Thin Turkish pizza with minced meat.', price: 10.99 },
      { id: 'M002', name: 'Cheese Pide', description: 'Pide with delicious cheese.', price: 12.99 },
      { id: 'M003', name: 'Ayran', description: 'Refreshing yogurt drink.', price: 5.99 },
    ],
  },
  {
    id: 'V002',
    name: 'The Kebab Shop',
    description: 'Grilled meats and fresh salads.',
    logo: 'https://picsum.photos/seed/kebab/200/200',
    menu: [
      { id: 'M004', name: 'Chicken Kebab', description: 'Grilled chicken skewers.', price: 3.50 },
      { id: 'M005', name: 'Lamb Shawarma', description: 'Slow-roasted lamb in a wrap.', price: 3.50 },
      { id: 'M006', name: 'Hummus & Pita', description: 'Classic hummus with fresh pita.', price: 6.50 },
    ],
  },
  {
    id: 'V003',
    name: 'Tagine House',
    description: 'Traditional Moroccan tagines.',
    logo: 'https://picsum.photos/seed/tagine/200/200',
    menu: [
      { id: 'M007', name: 'Chicken Tagine', description: 'Slow-cooked chicken with olives.', price: 11.99 },
      { id: 'M008', name: 'Vegetable Tagine', description: 'A mix of fresh vegetables.', price: 11.99 },
      { id: 'M009', name: 'Couscous Salad', description: 'Light and refreshing salad.', price: 8.99 },
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
  { date: '2023-10-01', orders: 150, revenue: 12000 },
  { date: '2023-10-02', orders: 155, revenue: 18400 },
  { date: '2023-10-03', orders: 160, revenue: 15800 },
  { date: '2023-10-04', orders: 145, revenue: 21600 },
  { date: '2023-10-05', orders: 165, revenue: 13200 },
  { date: '2023-10-06', orders: 170, revenue: 19600 },
  { date: '2023-10-07', orders: 168, revenue: 13440 },
];

export const recentOrders = [
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    name: 'Aisha Khan',
    email: 'aisha.khan@example.com',
    meal: 'Chicken Shawarma',
    amount: '+$7.50',
  },
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
    name: 'Yusuf Ahmed',
    email: 'yusuf.ahmed@example.com',
    meal: 'Beef Kofta',
    amount: '+$8.00',
  },
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
    name: 'Fatima Al-Fassi',
    email: 'fatima.alfassi@example.com',
    meal: 'Vegetable Tagine',
    amount: '+$7.00',
  },
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
    name: 'Omar Abdullah',
    email: 'omar.abdullah@example.com',
    meal: 'Lamb Burger & Fries',
    amount: '+$8.50',
  },
  {
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
    name: 'Layla Ibrahim',
    email: 'layla.ibrahim@example.com',
    meal: 'Fattoush Salad',
    amount: '+$6.50',
  },
];


export const dashboardStats = {
  todaysOrders: 84,
  todaysMenu: 'Cheese Pide',
  totalActiveUsers: allUsers.filter(u => u.active).length,
  outstandingBalances: allUsers.reduce((acc, user) => user.balance < 0 ? acc + Math.abs(user.balance) : acc, 0),
  unpaidUsers: allUsers.filter(u => u.balance < 0).length,
  mostSellingItem: 'Chicken Kebab',
  financialAidLastMonth: 450.75,
};
