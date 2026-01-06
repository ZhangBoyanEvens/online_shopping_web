/**
 * MongoDB 连接测试脚本
 * 用于快速测试 MongoDB 连接是否正常
 */

const mongoose = require('mongoose');

// MongoDB 连接配置
// TODO: 替换为你的 MongoDB 连接字符串
// 格式: mongodb://YOUR_USERNAME:YOUR_PASSWORD@host:port/database
// 或 MongoDB Atlas: mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/database
// 注意：用户名中的 @ 符号需要编码为 %40
// 推荐：使用环境变量 MONGODB_URL 而不是硬编码
const MONGODB_URL = process.env.MONGODB_URL || 'YOUR_MONGODB_CONNECTION_URL_HERE';
const DB_NAME = process.env.DB_NAME || 'myDB';

async function testConnection() {
    console.log('正在测试 MongoDB 连接...\n');
    console.log('连接 URL:', MONGODB_URL.replace(/\/\/.*@/, '//***:***@')); // 隐藏密码
    console.log('数据库名:', DB_NAME);
    console.log('');

    try {
        // 连接 MongoDB
        console.log('⏳ 正在连接...');
        await mongoose.connect(MONGODB_URL, {
            dbName: DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // 5秒超时
        });

        console.log('✅ MongoDB 连接成功！\n');

        // 测试基本操作
        console.log('📊 数据库信息:');
        const db = mongoose.connection.db;
        const adminDb = db.admin();
        
        try {
            const serverStatus = await adminDb.serverStatus();
            console.log('  - MongoDB 版本:', serverStatus.version);
            console.log('  - 数据库名称:', db.databaseName);
        } catch (e) {
            console.log('  - 数据库名称:', db.databaseName);
        }

        // 列出集合
        const collections = await db.listCollections().toArray();
        console.log('\n📁 现有集合:');
        if (collections.length === 0) {
            console.log('  (暂无集合，这是正常的，数据迁移后会创建)');
        } else {
            collections.forEach(col => {
                console.log('  -', col.name);
            });
        }

        console.log('\n✅ 连接测试完成！可以开始使用 MongoDB 了。\n');

        // 关闭连接
        await mongoose.connection.close();
        console.log('✓ 连接已关闭');
        process.exit(0);

    } catch (error) {
        console.error('\n❌ 连接失败！\n');
        console.error('错误信息:', error.message);
        console.error('错误代码:', error.code);
        
        // 根据错误类型提供具体建议
        if (error.message.includes('authentication failed') || error.message.includes('auth')) {
            console.error('\n🔐 认证失败 - 可能的原因:');
            console.error('1. 用户名或密码错误');
            console.error('2. IP 地址未添加到白名单（最常见）');
            console.error('3. 数据库用户权限不足');
            console.error('\n📋 解决步骤:');
            console.error('步骤 1: 检查 IP 白名单');
            console.error('  - 登录 MongoDB Atlas 控制台');
            console.error('  - 进入 Network Access（网络访问）');
            console.error('  - 点击 "Add IP Address"');
            console.error('  - 选择 "Allow Access from Anywhere" (0.0.0.0/0) 或添加你的 IP');
            console.error('\n步骤 2: 验证用户名和密码');
            console.error('  - 检查你的 MongoDB Atlas 用户名和密码');
            console.error('  - 确认在 Database Access 中用户存在且密码正确');
            console.error('\n步骤 3: 检查数据库用户权限');
            console.error('  - 确保用户有读写权限');
            console.error('  - 检查 authSource 是否正确（当前: admin）');
        } else if (error.message.includes('timeout') || error.message.includes('ENOTFOUND')) {
            console.error('\n🌐 网络连接问题');
            console.error('- 检查网络连接');
            console.error('- 检查防火墙设置');
            console.error('- 确认 MongoDB Atlas 服务正常');
        }
        
        console.error('\n💡 提示:');
        console.error('- 检查你的 MongoDB 连接字符串格式');
        console.error('- 如果用户名包含 @ 符号，需要编码为 %40');
        console.error('- 如果 IP 白名单未设置，这是最常见的失败原因');
        console.error('- 查看 MONGODB_SETUP.md 获取详细说明\n');
        
        process.exit(1);
    }
}

// 运行测试
testConnection();

