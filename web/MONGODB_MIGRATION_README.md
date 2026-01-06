# MongoDB 数据迁移指南

这个脚本用于将 SpMart 电商网站的数据从浏览器 localStorage 迁移到 MongoDB 数据库。

## 功能特性

- ✅ **用户账户管理**: 迁移用户注册信息
- ✅ **购物车记录**: 保存用户的购物车数据
- ✅ **订单/账单记录**: 保存历史消费记录和订单详情
- ✅ **数据验证**: 自动检查重复数据
- ✅ **错误处理**: 完善的错误处理和日志记录

## 安装步骤

### 1. 安装 Node.js 依赖

```bash
npm install
```

### 2. 配置 MongoDB 连接

打开 `mongodb-migration.js` 文件，找到以下行：

```javascript
const MONGODB_URL = 'YOUR_MONGODB_CONNECTION_URL_HERE';
```

替换为你的 MongoDB 连接字符串：

**本地 MongoDB:**
```javascript
const MONGODB_URL = 'mongodb://localhost:27017/spmart';
```

**MongoDB Atlas (云数据库):**
```javascript
const MONGODB_URL = 'mongodb+srv://example:example@example.mongodb.net/spmart';
```

### 3. 从浏览器获取数据

在浏览器中打开你的网站，打开开发者工具（F12），在控制台中运行以下代码：

```javascript
// 获取所有 localStorage 数据
const migrationData = {
    users: JSON.parse(localStorage.getItem('users') || '[]'),
    currentUser: localStorage.getItem('currentUser'),
    cart: localStorage.getItem('cart'),
    orders: JSON.parse(localStorage.getItem('orders') || '[]')
};

// 输出 JSON 数据
console.log(JSON.stringify(migrationData, null, 2));

// 复制输出的 JSON 数据
```

### 4. 准备数据文件

创建一个 JSON 文件（例如 `data.json`），将步骤3中获取的数据粘贴进去。

### 5. 修改迁移脚本

在 `mongodb-migration.js` 的 `main()` 函数中，将 `exampleData` 替换为你从浏览器获取的实际数据，或者从文件读取：

```javascript
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
```

## 运行迁移

```bash
npm run migrate
```

或者直接运行：

```bash
node mongodb-migration.js
```

## 数据结构说明

### 用户数据 (User)
```javascript
{
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    isGuest: false
}
```

### 购物车数据 (Cart)
```javascript
{
    "1000000000": {
        name: "Washington Red Delicious™ Premium Apples",
        brand: "Red Delicious",
        price: 0.80,
        priceUnit: "per piece",
        qty: 2,
        image: "...",
        emoji: "🍎"
    }
}
```

### 订单数据 (Order)
```javascript
{
    userEmail: "john@example.com",
    items: [
        {
            productId: "1000000000",
            name: "Washington Red Delicious™ Premium Apples",
            brand: "Red Delicious",
            price: 0.80,
            priceUnit: "per piece",
            qty: 2
        }
    ],
    deliveryMethod: "pickup", // 或 "delivery"
    deliveryInfo: {
        address: "123 Main St",
        city: "New York",
        postalCode: "10001",
        date: "2024-01-15"
    },
    subtotal: 1.60,
    deliveryFee: 0,
    tax: 0.13,
    total: 1.73,
    paymentMethod: "cash", // 或 "card"
    status: "completed"
}
```

## 数据库集合

迁移后，MongoDB 中会创建以下集合：

1. **users** - 用户账户信息
2. **carts** - 用户购物车
3. **orders** - 订单/账单记录

## 注意事项

- ⚠️ 确保 MongoDB 服务正在运行
- ⚠️ 确保有正确的数据库访问权限
- ⚠️ 迁移前建议备份现有数据
- ⚠️ 重复运行会跳过已存在的用户（基于邮箱）

## 故障排除

### 连接失败
- 检查 MongoDB URL 是否正确
- 检查网络连接
- 检查防火墙设置

### 数据迁移失败
- 检查数据格式是否正确
- 查看控制台错误信息
- 确保所有必需字段都存在

## 后续集成

迁移完成后，你可以：

1. 修改前端代码，从 MongoDB 读取数据而不是 localStorage
2. 创建 API 服务器，连接 MongoDB 提供数据服务
3. 实现实时数据同步

## 示例：在代码中使用

```javascript
const { User, Cart, Order, connectDB } = require('./mongodb-migration');

async function example() {
    await connectDB();
    
    // 查找用户
    const user = await User.findOne({ email: 'john@example.com' });
    
    // 获取用户的购物车
    const cart = await Cart.findOne({ userId: user._id });
    
    // 获取用户的订单历史
    const orders = await Order.find({ userId: user._id });
    
    console.log('用户:', user);
    console.log('购物车:', cart);
    console.log('订单:', orders);
}
```


