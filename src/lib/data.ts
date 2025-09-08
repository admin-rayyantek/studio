import type { Student, Order, MenuEvent, Vendor, User, TodaysMenuItem, RecentOrder } from '@/types';

export const allergens = [
  'Milk',
  'Eggs',
  'Fish',
  'Shellfish',
  'Tree Nuts',
  'Peanuts',
  'Wheat',
  'Soy',
  'Sesame',
  'Gluten',
  'Corn',
  'Mustard',
  'Sulfites',
  'Celery',
  'Lupin',
];

export const students: Student[] = [
  {
    id: 'S001',
    name: 'Aisha Khan',
    email: 'aisha.khan@example.com',
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Aisha+Khan',
    balance: 120.5,
  },
  {
    id: 'S002',
    name: 'Yusuf Ahmed',
    email: 'yusuf.ahmed@example.com',
    avatar: 'https://avatar.iran.liara.run/public/boy?username=Yusuf+Ahmed',
    balance: 85.0,
  },
  {
    id: 'S003',
    name: 'Fatima Al-Fassi',
    email: 'fatima.alfassi@example.com',
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Fatima+Al-Fassi',
    balance: 210.75,
  },
  {
    id: 'S004',
    name: 'Omar Abdullah',
    email: 'omar.abdullah@example.com',
    avatar: 'https://avatar.iran.liara.run/public/boy?username=Omar+Abdullah',
    balance: -15.2,
  },
  {
    id: 'S005',
    name: 'Layla Ibrahim',
    email: 'layla.ibrahim@example.com',
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Layla+Ibrahim',
    balance: 5.5,
  },
];


export const allUsers: User[] = [
  {
    id: 'S001',
    name: 'Aisha Khan',
    email: 'aisha.khan@example.com',
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Aisha+Khan',
    balance: 120.5,
    orgId: 'ORG001',
    gender: 'female',
    active: true,
    dateJoined: '2023-01-15',
    userType: 'student-tadris',
    primaryPayment: 'card',
    allergies: ['Peanuts']
  },
  {
    id: 'S002',
    name: 'Yusuf Ahmed',
    email: 'yusuf.ahmed@example.com',
    avatar: 'https://avatar.iran.liara.run/public/boy?username=Yusuf+Ahmed',
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
    avatar: 'https://avatar.iran.liara.run/public/boy?username=Ali+Hassan',
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
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Fatima+Al-Fassi',
    balance: -25.0,
    orgId: 'ORG003',
    gender: 'female',
    active: false,
    dateJoined: '2023-03-10',
    userType: 'student-tanwir',
    primaryPayment: 'FACTS',
    allergies: ['Gluten', 'Soy']
  },
    {
    id: 'S004',
    name: 'Omar Abdullah',
    email: 'omar.abdullah@example.com',
    avatar: 'https://avatar.iran.liara.run/public/boy?username=Omar+Abdullah',
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
    avatar: 'https://avatar.iran.liara.run/public/girl?username=Layla+Ibrahim',
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
      { id: 'M001', name: 'Lahmacun', description: 'Thin Turkish pizza with minced meat.', price: 10.99, allergens: ['Gluten', 'Wheat'] },
      { id: 'M002', name: 'Cheese Pide', description: 'Pide with delicious cheese.', price: 12.99, allergens: ['Gluten', 'Milk', 'Wheat'] },
      { id: 'M003', name: 'Ayran', description: 'Refreshing yogurt drink.', price: 5.99, allergens: ['Milk'] },
    ],
  },
  {
    id: 'V002',
    name: 'The Kebab Shop',
    description: 'Grilled meats and fresh salads.',
    logo: 'https://picsum.photos/seed/kebab/200/200',
    menu: [
      { id: 'M004', name: 'Chicken Kebab', description: 'Grilled chicken skewers.', price: 3.50 },
      { id: 'M005', name: 'Lamb Shawarma', description: 'Slow-roasted lamb in a wrap.', price: 3.50, allergens: ['Gluten', 'Wheat'] },
      { id: 'M006', name: 'Hummus & Pita', description: 'Classic hummus with fresh pita.', price: 6.50, allergens: ['Sesame', 'Gluten', 'Wheat'] },
    ],
  },
  {
    id: 'V003',
    name: 'Tagine House',
    description: 'Traditional Moroccan tagines.',
    logo: 'https://picsum.photos/seed/tagine/200/200',
    menu: [
      { id: 'M007', name: 'Chicken Tagine', description: 'Slow-cooked chicken with olives.', price: 11.99, allergens: ['Celery'] },
      { id: 'M008', name: 'Vegetable Tagine', description: 'A mix of fresh vegetables.', price: 11.99, allergens: ['Celery'] },
      { id: 'M009', name: 'Couscous Salad', description: 'Light and refreshing salad.', price: 8.99, allergens: ['Gluten', 'Wheat'] },
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


export const weeklyOrderData = [
    { day: 'Mon', male_kebab: 20, male_pide: 5, female_kebab: 5, female_pide: 1, male_total: 25, female_total: 6 },
    { day: 'Tue', male_kebab: 15, male_pide: 10, female_kebab: 8, female_pide: 3, male_total: 25, female_total: 11 },
    { day: 'Wed', male_kebab: 18, male_pide: 7, female_kebab: 6, female_pide: 2, male_total: 25, female_total: 8 },
    { day: 'Thu', male_kebab: 22, male_pide: 4, female_kebab: 7, female_pide: 4, male_total: 26, female_total: 11 },
    { day: 'Fri', male_kebab: 25, male_pide: 8, female_kebab: 10, female_pide: 5, male_total: 33, female_total: 15 },
    { day: 'Sat', male_kebab: 10, male_pide: 3, female_kebab: 4, female_pide: 1, male_total: 13, female_total: 5 },
    { day: 'Sun', male_kebab: 12, male_pide: 6, female_kebab: 3, female_pide: 2, male_total: 18, female_total: 5 },
];


export const recentOrders: RecentOrder[] = [
  {
    id: 'RO001',
    date: '2023-10-28',
    studentId: 'S001',
    name: 'Aisha Khan',
    email: 'aisha.khan@example.com',
    total: 10.50,
    items: [
      { name: 'Chicken Kebab', quantity: 3, price: 3.50 }
    ],
  },
  {
    id: 'RO002',
    date: '2023-10-28',
    studentId: 'S002',
    name: 'Yusuf Ahmed',
    email: 'yusuf.ahmed@example.com',
    total: 13.00,
    items: [
        { name: 'Lamb Shawarma', quantity: 2, price: 3.50 },
        { name: 'Hummus & Pita', quantity: 1, price: 6.50 },
    ],
  },
  {
    id: 'RO003',
    date: '2023-10-27',
    studentId: 'S003',
    name: 'Fatima Al-Fassi',
    email: 'fatima.alfassi@example.com',
    total: 11.99,
    items: [
        { name: 'Chicken Tagine', quantity: 1, price: 11.99 },
    ],
  },
  {
    id: 'RO004',
    date: '2023-10-27',
    studentId: 'S004',
    name: 'Omar Abdullah',
    email: 'omar.abdullah@example.com',
    total: 12.99,
    items: [
      { name: 'Cheese Pide', quantity: 1, price: 12.99 },
    ],
  },
  {
    id: 'RO005',
    date: '2023-10-26',
    studentId: 'S005',
    name: 'Layla Ibrahim',
    email: 'layla.ibrahim@example.com',
    total: 8.99,
    items: [
      { name: 'Couscous Salad', quantity: 1, price: 8.99 },
    ],
  },
];

export const todaysMenuData: TodaysMenuItem[] = [
    { name: 'Cheese Pide', ordered: 32, status: 'Taking Orders' },
    { name: 'Chicken Kebab', ordered: 54, status: 'Taking Orders' },
    { name: 'Hummus & Pita', ordered: 21, status: 'Taking Orders' },
    { name: 'Vegetable Tagine', ordered: 18, status: 'No Longer Taking Orders' },
    { name: 'Couscous Salad', ordered: 25, status: 'Taking Orders' },
    { name: 'Lahmacun', ordered: 15, status: 'No Longer Taking Orders' },
];

export const dashboardStats = {
  todaysOrders: todaysMenuData.reduce((sum, item) => sum + item.ordered, 0),
  totalActiveUsers: allUsers.filter(u => u.active).length,
  outstandingBalances: allUsers.reduce((acc, user) => user.balance < 0 ? acc + Math.abs(user.balance) : acc, 0),
  unpaidUsers: allUsers.filter(u => u.balance < 0).length,
  mostSellingItem: 'Chicken Kebab',
  financialAidLastMonth: 450.75,
};

export const monthlyUserOrdersData = [
  { month: 'Jan', total: 75.50 },
  { month: 'Feb', total: 90.00 },
  { month: 'Mar', total: 110.25 },
  { month: 'Apr', total: 85.75 },
  { month: 'May', total: 120.00 },
  { month: 'Jun', total: 95.50 },
  { month: 'Jul', total: 60.00 },
  { month: 'Aug', total: 78.25 },
  { month: 'Sep', total: 105.00 },
  { month: 'Oct', total: 130.50 },
  { month: 'Nov', total: 0 },
  { month: 'Dec', total: 0 },
];
