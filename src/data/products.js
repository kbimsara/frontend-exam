export const products = [
  {
    id: 1,
    name: 'Laptop Computer',
    price: 899.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    stock: 15,
    rating: 4.5,
    sales: 234
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    price: 29.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    stock: 45,
    rating: 4.2,
    sales: 567
  },
  {
    id: 3,
    name: 'Keyboard',
    price: 49.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
    stock: 32,
    rating: 4.7,
    sales: 423
  },
  {
    id: 4,
    name: 'Office Chair',
    price: 199.99,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&fit=crop',
    stock: 8,
    rating: 4.3,
    sales: 145
  },
  {
    id: 5,
    name: 'Desk Lamp',
    price: 39.99,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop',
    stock: 23,
    rating: 4.0,
    sales: 289
  },
  {
    id: 6,
    name: 'Monitor',
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
    stock: 12,
    rating: 4.8,
    sales: 678
  },
  {
    id: 7,
    name: 'Notebook',
    price: 9.99,
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=300&fit=crop',
    stock: 100,
    rating: 3.9,
    sales: 891
  },
  {
    id: 8,
    name: 'Pen Set',
    price: 14.99,
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&h=300&fit=crop',
    stock: 67,
    rating: 4.1,
    sales: 456
  },
  {
    id: 9,
    name: 'USB Cable',
    price: 12.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1538356111053-748a48e1acb8?w=400&h=300&fit=crop',
    stock: 89,
    rating: 4.4,
    sales: 723
  },
  {
    id: 10,
    name: 'Water Bottle',
    price: 19.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop',
    stock: 54,
    rating: 4.6,
    sales: 534
  },
  {
    id: 11,
    name: 'Backpack',
    price: 59.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    stock: 28,
    rating: 4.5,
    sales: 267
  },
  {
    id: 12,
    name: 'Headphones',
    price: 79.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    stock: 19,
    rating: 4.9,
    sales: 845
  },
  {
    id: 13,
    name: 'Smartphone',
    price: 699.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    stock: 7,
    rating: 4.7,
    sales: 412
  },
  {
    id: 14,
    name: 'Tablet',
    price: 399.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
    stock: 14,
    rating: 4.4,
    sales: 298
  },
  {
    id: 15,
    name: 'Desk Organizer',
    price: 24.99,
    category: 'Stationery',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop',
    stock: 42,
    rating: 4.2,
    sales: 356
  }
];

export const categories = [
  'All',
  'Electronics',
  'Furniture',
  'Stationery',
  'Accessories'
];

export const orders = [
  { id: 1001, date: '2024-12-20', customer: 'John Doe', total: 249.98, status: 'Delivered' },
  { id: 1002, date: '2024-12-21', customer: 'Jane Smith', total: 899.99, status: 'Shipped' },
  { id: 1003, date: '2024-12-22', customer: 'Bob Johnson', total: 159.97, status: 'Processing' },
  { id: 1004, date: '2024-12-23', customer: 'Alice Williams', total: 79.99, status: 'Delivered' },
  { id: 1005, date: '2024-12-24', customer: 'Charlie Brown', total: 349.98, status: 'Shipped' },
  { id: 1006, date: '2024-12-25', customer: 'Diana Prince', total: 199.99, status: 'Processing' },
  { id: 1007, date: '2024-12-26', customer: 'Ethan Hunt', total: 89.97, status: 'Pending' }
];

export const salesData = [
  { month: 'Jan', sales: 4200 },
  { month: 'Feb', sales: 3800 },
  { month: 'Mar', sales: 5100 },
  { month: 'Apr', sales: 4600 },
  { month: 'May', sales: 5900 },
  { month: 'Jun', sales: 6200 },
  { month: 'Jul', sales: 5800 },
  { month: 'Aug', sales: 6500 },
  { month: 'Sep', sales: 7100 },
  { month: 'Oct', sales: 6800 },
  { month: 'Nov', sales: 7500 },
  { month: 'Dec', sales: 8200 }
];