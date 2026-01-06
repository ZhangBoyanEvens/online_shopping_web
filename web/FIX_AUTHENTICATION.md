# 解决 MongoDB 认证失败问题

## 当前配置

- **用户名**: [你的 MongoDB 用户名]
- **密码**: [你的 MongoDB 密码]
- **数据库**: [你的数据库名称]
- **认证源**: admin

## ❌ 错误信息

```
authentication failed
```

## 🔧 解决步骤

### 步骤 1: 添加 IP 白名单（最重要！）

这是最常见的失败原因。MongoDB Atlas 默认只允许白名单中的 IP 访问。

1. **登录 MongoDB Atlas**
   - 访问 https://cloud.mongodb.com
   - 使用你的账户登录

2. **进入 Network Access**
   - 在左侧菜单找到 "Network Access"
   - 或直接访问：https://cloud.mongodb.com/v2#/security/network/list

3. **添加 IP 地址**
   - 点击 "Add IP Address" 按钮
   - 选择以下选项之一：
     - **选项 A（推荐用于测试）**: 选择 "Allow Access from Anywhere"
       - IP Address: `0.0.0.0/0`
       - Comment: "Allow all IPs for testing"
     - **选项 B（更安全）**: 添加你的当前 IP 地址
       - 点击 "Add Current IP Address"
       - 或手动输入你的 IP

4. **保存并等待生效**
   - 点击 "Confirm"
   - 等待 1-2 分钟让设置生效

### 步骤 2: 验证数据库用户

1. **进入 Database Access**
   - 在左侧菜单找到 "Database Access"
   - 或直接访问：https://cloud.mongodb.com/v2#/security/database/users

2. **检查用户是否存在**
   - 查找你的数据库用户
   - 确认用户状态为 "Active"

3. **验证密码**
   - 如果密码不正确，可以：
     - 点击用户旁边的 "..." 菜单
     - 选择 "Edit" 或 "Reset Password"
     - 设置新密码

4. **检查用户权限**
   - 确保用户有 "Read and write to any database" 权限
   - 或至少对 `myDB` 数据库有读写权限

### 步骤 3: 检查认证源

当前配置使用 `authSource=admin`，这意味着：
- 用户应该在 `admin` 数据库中
- 如果用户在其他数据库，需要修改 `authSource`

### 步骤 4: 重新测试

完成上述步骤后，运行：

```bash
node test-connection.js
```

## 🔍 常见问题

### Q: 为什么需要 IP 白名单？
A: MongoDB Atlas 为了安全，默认只允许白名单中的 IP 访问数据库。

### Q: 使用 0.0.0.0/0 安全吗？
A: 不安全，但方便测试。生产环境应该只添加特定的 IP 地址。

### Q: 用户名中的 @ 符号需要编码吗？
A: 是的，在 URL 中 `@` 需要编码为 `%40`。
- 例如用户名: `user@admin`
- URL 编码: `user%40admin`

### Q: 如何查看我的当前 IP？
A: 访问 https://whatismyipaddress.com/ 查看你的公网 IP。

## ✅ 成功标志

如果看到以下输出，说明连接成功：

```
✅ MongoDB 连接成功！

📊 数据库信息:
  - MongoDB 版本: x.x.x
  - 数据库名称: myDB

📁 现有集合:
  (暂无集合，这是正常的，数据迁移后会创建)

✅ 连接测试完成！可以开始使用 MongoDB 了。
```

## 📞 需要帮助？

如果完成所有步骤后仍然失败，请检查：
1. MongoDB Atlas 服务状态
2. 网络连接
3. 防火墙设置
4. 用户名和密码是否正确


