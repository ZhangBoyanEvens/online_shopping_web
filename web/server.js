/**
 * Express.js API 服务器
 * 用于前端应用与 MongoDB 数据库交互
 * 
 * 使用方法：
 * 1. 安装依赖: npm install express mongoose cors dotenv
 * 2. 配置环境变量（创建 .env 文件）
 * 3. 运行: node server.js
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// ============================================
// MongoDB 连接
// ============================================
// 从环境变量读取 MongoDB URL，如果没有则使用默认值
// TODO: 创建 .env 文件并设置 MONGODB_URL
// 格式: mongodb://YOUR_USERNAME:YOUR_PASSWORD@host:port/database
// 或 MongoDB Atlas: mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/database
// 注意：用户名中的 @ 符号需要编码为 %40
// 推荐：使用环境变量，不要硬编码凭据
const MONGODB_URL = process.env.MONGODB_URL || 'YOUR_MONGODB_CONNECTION_URL_HERE';
const DB_NAME = process.env.DB_NAME || 'spmart';

// 连接 MongoDB
mongoose.connect(MONGODB_URL, {
    dbName: DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✓ MongoDB 连接成功');
})
.catch((error) => {
    console.error('✗ MongoDB 连接失败:', error);
    process.exit(1);
});

// ============================================
// 导入数据模型（从 mongodb-migration.js）
// ============================================
const { User, Cart, Order } = require('./mongodb-migration');

// ============================================
// API 路由
// ============================================

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'API 服务器运行正常' });
});

// ============================================
// 用户相关 API
// ============================================

// 获取用户信息
app.get('/api/users/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ error: '用户不存在' });
        }
        // 不返回密码
        const userData = user.toObject();
        delete userData.password;
        res.json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 创建用户
app.post('/api/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: '缺少必需字段' });
        }

        // 检查用户是否已存在
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: '用户已存在' });
        }

        const user = new User({ name, email, password });
        await user.save();
        
        const userData = user.toObject();
        delete userData.password;
        res.status(201).json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 用户登录验证
app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        
        if (!user) {
            return res.status(401).json({ error: '邮箱或密码错误' });
        }

        const userData = user.toObject();
        delete userData.password;
        res.json(userData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============================================
// 购物车相关 API
// ============================================

// 获取用户购物车
app.get('/api/cart/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId })
            .populate('userId', 'name email');
        
        if (!cart) {
            return res.json({ userId: req.params.userId, items: [] });
        }
        
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 更新用户购物车
app.put('/api/cart/:userId', async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.params.userId;

        // 验证用户是否存在
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: '用户不存在' });
        }

        let cart = await Cart.findOne({ userId });
        
        if (cart) {
            cart.items = items;
            cart.updatedAt = new Date();
            await cart.save();
        } else {
            cart = new Cart({ userId, items });
            await cart.save();
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 清空用户购物车
app.delete('/api/cart/:userId', async (req, res) => {
    try {
        await Cart.findOneAndDelete({ userId: req.params.userId });
        res.json({ message: '购物车已清空' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============================================
// 订单相关 API
// ============================================

// 获取用户所有订单
app.get('/api/orders/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
            .sort({ createdAt: -1 })
            .populate('userId', 'name email');
        
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 获取单个订单
app.get('/api/orders/order/:orderNumber', async (req, res) => {
    try {
        const order = await Order.findOne({ orderNumber: req.params.orderNumber })
            .populate('userId', 'name email');
        
        if (!order) {
            return res.status(404).json({ error: '订单不存在' });
        }
        
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 创建新订单
app.post('/api/orders', async (req, res) => {
    try {
        const {
            userId,
            items,
            deliveryMethod,
            deliveryInfo,
            subtotal,
            deliveryFee,
            tax,
            total,
            paymentMethod
        } = req.body;

        // 验证用户是否存在
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: '用户不存在' });
        }

        // 生成订单号
        const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

        // 处理订单项目
        const orderItems = items.map(item => ({
            ...item,
            subtotal: item.price * item.qty
        }));

        const order = new Order({
            orderNumber,
            userId,
            items: orderItems,
            deliveryMethod: deliveryMethod || 'pickup',
            deliveryInfo: deliveryInfo || null,
            subtotal: subtotal || 0,
            deliveryFee: deliveryFee || 0,
            tax: tax || 0,
            total: total || 0,
            paymentMethod: paymentMethod || 'cash',
            status: 'pending'
        });

        await order.save();

        // 清空购物车
        await Cart.findOneAndDelete({ userId });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 更新订单状态
app.patch('/api/orders/:orderNumber', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findOneAndUpdate(
            { orderNumber: req.params.orderNumber },
            { status, updatedAt: new Date() },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: '订单不存在' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============================================
// 启动服务器
// ============================================

app.listen(PORT, () => {
    console.log(`✓ API 服务器运行在 http://localhost:${PORT}`);
    console.log(`✓ API 文档: http://localhost:${PORT}/api/health`);
});

// 优雅关闭
process.on('SIGTERM', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

