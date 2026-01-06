# API 服务器使用指南

## 总结

**MongoDB 不需要 React 组件！** 有两种使用方式：

### 方式 1：直接运行迁移脚本（推荐开始使用）
- ✅ 不需要 React
- ✅ 不需要 API 服务器
- ✅ 直接运行即可
- 📝 用途：一次性将 localStorage 数据迁移到 MongoDB

```bash
node mongodb-migration.js
```

### 方式 2：使用 API 服务器（前端实时访问）
- ✅ 不需要 React（可以用任何前端框架）
- ✅ 需要运行 API 服务器
- 📝 用途：前端应用通过 API 实时读写 MongoDB

```bash
node server.js
```

---

## 方式 1：直接迁移（现在就能用）

### 步骤：

1. **安装依赖**
   ```bash
   npm install
   ```

2. **配置 MongoDB URL**
   打开 `mongodb-migration.js`，找到：
   ```javascript
   const MONGODB_URL = 'YOUR_MONGODB_CONNECTION_URL_HERE';
   ```
   替换为你的 MongoDB 连接字符串。

3. **运行迁移**
   ```bash
   npm run migrate
   ```

✅ **完成！** 数据已经迁移到 MongoDB，不需要任何前端代码。

---

## 方式 2：API 服务器（如果需要前端实时访问）

### 安装依赖

```bash
npm install express mongoose cors dotenv
```

### 配置环境变量

创建 `.env` 文件：

```env
MONGODB_URL=mongodb://example:example@example.mongodb.net/database?ssl=true&authSource=admin
DB_NAME=spmart
PORT=3000
```

### 启动服务器

```bash
npm run server
# 或
node server.js
```

### API 端点

#### 用户相关
- `GET /api/users/:email` - 获取用户信息
- `POST /api/users` - 创建新用户
- `POST /api/users/login` - 用户登录

#### 购物车相关
- `GET /api/cart/:userId` - 获取购物车
- `PUT /api/cart/:userId` - 更新购物车
- `DELETE /api/cart/:userId` - 清空购物车

#### 订单相关
- `GET /api/orders/:userId` - 获取用户所有订单
- `GET /api/orders/order/:orderNumber` - 获取单个订单
- `POST /api/orders` - 创建新订单
- `PATCH /api/orders/:orderNumber` - 更新订单状态

### 前端调用示例

```javascript
// 获取用户购物车
fetch('http://localhost:3000/api/cart/USER_ID')
  .then(res => res.json())
  .then(data => console.log(data));

// 创建订单
fetch('http://localhost:3000/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'USER_ID',
    items: [...],
    total: 100.00
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## 常见问题

### Q: 需要 React 吗？
**A: 不需要！** MongoDB 是数据库，与前端框架无关。

### Q: 现在就能用吗？
**A: 是的！** 方式 1（迁移脚本）现在就能用，只需要：
1. 安装依赖：`npm install`
2. 配置 MongoDB URL
3. 运行：`node mongodb-migration.js`

### Q: 什么时候需要 API 服务器？
**A: 当你需要前端应用实时读写 MongoDB 时。** 如果只是迁移数据，用方式 1 就够了。

### Q: 可以用其他前端框架吗？
**A: 可以！** API 服务器与前端框架无关，可以用：
- 原生 JavaScript
- React
- Vue
- Angular
- 任何能发送 HTTP 请求的框架

---

## 推荐流程

1. **第一步**：使用方式 1 迁移现有数据
2. **第二步**：如果需要实时功能，启动 API 服务器（方式 2）
3. **第三步**：修改前端代码，从 localStorage 改为调用 API


