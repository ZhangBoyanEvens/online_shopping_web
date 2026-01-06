/**
 * MongoDB 连接测试 - 尝试不同的用户名格式
 */

const mongoose = require('mongoose');

// 测试不同的用户名格式
// TODO: 替换为你的实际 MongoDB 连接字符串
const MONGODB_BASE_URL = process.env.MONGODB_URL || 'YOUR_MONGODB_CONNECTION_URL_HERE';
const DB_NAME = process.env.DB_NAME || 'myDB';

// 注意：这些是示例格式，需要替换为实际的连接字符串
// 推荐：使用环境变量 MONGODB_URL 设置实际的连接字符串
const testConfigs = [
    {
        name: '格式 1: YOUR_USERNAME@admin (完整格式)',
        url: MONGODB_BASE_URL.replace('YOUR_MONGODB_CONNECTION_URL_HERE', 'mongodb://YOUR_USERNAME%40admin:YOUR_PASSWORD@your-cluster.mongodb.net/' + DB_NAME + '?ssl=true&authSource=admin')
    },
    {
        name: '格式 2: YOUR_USERNAME (仅用户名，authSource=admin)',
        url: MONGODB_BASE_URL.replace('YOUR_MONGODB_CONNECTION_URL_HERE', 'mongodb://YOUR_USERNAME:YOUR_PASSWORD@your-cluster.mongodb.net/' + DB_NAME + '?ssl=true&authSource=admin')
    },
    {
        name: '格式 3: YOUR_USERNAME (仅用户名，authSource=myDB)',
        url: MONGODB_BASE_URL.replace('YOUR_MONGODB_CONNECTION_URL_HERE', 'mongodb://YOUR_USERNAME:YOUR_PASSWORD@your-cluster.mongodb.net/' + DB_NAME + '?ssl=true&authSource=' + DB_NAME)
    }
];

async function testConnection(config) {
    console.log(`\n测试: ${config.name}`);
    console.log('URL:', config.url.replace(/\/\/.*@/, '//***:***@'));
    
    try {
        await mongoose.connect(config.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        });
        
        console.log('✅ 连接成功！');
        console.log('数据库:', mongoose.connection.db.databaseName);
        
        await mongoose.connection.close();
        return true;
    } catch (error) {
        console.log('❌ 连接失败:', error.message);
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
        }
        return false;
    }
}

async function runTests() {
    console.log('开始测试不同的用户名格式...\n');
    console.log('='.repeat(60));
    
    for (const config of testConfigs) {
        const success = await testConnection(config);
        if (success) {
            console.log('\n✅ 找到正确的格式！');
            console.log('正确的连接字符串:', config.url);
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('\n测试完成！');
    console.log('\n💡 提示:');
    console.log('- 如果所有格式都失败，请检查密码是否正确');
    console.log('- 在 MongoDB Atlas 中，点击 "Edit Password" 确认密码');
    console.log('- 确保用户有 "Read and write to any database" 权限');
}

runTests().catch(console.error);


