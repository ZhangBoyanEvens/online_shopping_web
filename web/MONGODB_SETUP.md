# MongoDB 连接配置说明

## ✅ 已配置的 MongoDB URL

配置 MongoDB 连接字符串：
```
mongodb://example:example@example.mongodb.net/database?ssl=true&authSource=admin
```

**注意**: 将 `example` 替换为你的实际 MongoDB 凭据。

## ⚠️ 重要提示

### 1. 用户名和密码

你提供的 URL **可能缺少用户名和密码**。如果连接失败，需要添加认证信息：

**标准格式：**
```
mongodb://example:example@example.mongodb.net/database?ssl=true&authSource=admin
```

**如何获取用户名和密码：**
1. 登录 MongoDB Atlas 控制台
2. 进入 Database Access（数据库访问）
3. 创建或查看数据库用户
4. 获取用户名和密码

### 2. 数据库名称

当前配置使用 `myDB` 作为数据库名。如果你想使用 `spmart`：

**选项 A：修改 URL 中的数据库名**
```
mongodb://example:example@example.mongodb.net/spmart?ssl=true&authSource=admin
```

**选项 B：修改代码中的 DB_NAME**
在 `mongodb-migration.js` 和 `server.js` 中修改：
```javascript
const DB_NAME = 'spmart';
```

### 3. 更新配置

#### 方式 1：直接修改代码（迁移脚本）
编辑 `mongodb-migration.js`：
```javascript
const MONGODB_URL = 'mongodb://example:example@example.mongodb.net/database?ssl=true&authSource=admin';
```

#### 方式 2：使用环境变量（API 服务器，推荐）
创建 `.env` 文件：
```env
MONGODB_URL=mongodb://example:example@example.mongodb.net/database?ssl=true&authSource=admin
DB_NAME=spmart
```

**注意：** `.env` 文件已添加到 `.gitignore`，不会被提交到 GitHub。

## 🚀 测试连接

### 测试迁移脚本
```bash
node mongodb-migration.js
```

### 测试 API 服务器
```bash
node server.js
```

如果看到 `✓ MongoDB 连接成功`，说明连接正常！

## ❌ 常见错误

### 错误 1：Authentication failed
**原因：** 缺少用户名和密码
**解决：** 在 URL 中添加 `example:example@`

### 错误 2：Network timeout
**原因：** IP 地址未添加到白名单
**解决：** 
1. 登录 MongoDB Atlas
2. 进入 Network Access（网络访问）
3. 添加你的 IP 地址或 `0.0.0.0/0`（允许所有 IP，仅用于测试）

### 错误 3：Database not found
**原因：** 数据库不存在
**解决：** MongoDB 会在首次写入时自动创建数据库，或者手动创建

## 📝 下一步

1. **如果连接成功：** 直接运行迁移脚本
   ```bash
   npm install
   node mongodb-migration.js
   ```

2. **如果连接失败：** 
   - 检查是否需要添加用户名和密码
   - 检查 IP 白名单设置
   - 检查网络连接

3. **开始使用：**
   - 迁移数据：`node mongodb-migration.js`
   - 启动 API：`node server.js`


