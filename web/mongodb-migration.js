/**
 * MongoDB 数据迁移脚本
 * 用于将本地存储的数据传输到 MongoDB 数据库
 * 
 * 使用方法：
 * 1. 安装依赖: npm install mongoose
 * 2. 在下面的 MONGODB_URL 位置填入你的 MongoDB 连接字符串
 * 3. 运行: node mongodb-migration.js
 */

const mongoose = require('mongoose');

// ============================================
// MongoDB 连接配置
// ============================================
// MongoDB 连接 URL
// TODO: 替换为你的 MongoDB 连接字符串
// 格式: mongodb://example:example@host:port/database
// 或 MongoDB Atlas: mongodb+srv://example:example@example.mongodb.net/database
// 注意：用户名中的 @ 符号需要编码为 %40
// 推荐：使用环境变量 process.env.MONGODB_URL
const MONGODB_URL = process.env.MONGODB_URL || 'YOUR_MONGODB_CONNECTION_URL_HERE';

// 数据库名称
const DB_NAME = process.env.DB_NAME || 'spmart';

// ============================================
// Mongoose Schema 定义
// ============================================

// 用户账户 Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isGuest: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// 购物车项目 Schema
const CartItemSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true
    },
    priceUnit: {
        type: String,
        default: 'each'
    },
    qty: {
        type: Number,
        required: true,
        min: 1
    },
    image: {
        type: String,
        default: ''
    },
    emoji: {
        type: String,
        default: '📦'
    }
});

// 购物车 Schema
const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [CartItemSchema],
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// 订单项目 Schema
const OrderItemSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true
    },
    priceUnit: {
        type: String,
        default: 'each'
    },
    qty: {
        type: Number,
        required: true,
        min: 1
    },
    image: {
        type: String,
        default: ''
    },
    emoji: {
        type: String,
        default: '📦'
    },
    subtotal: {
        type: Number,
        required: true
    }
});

// 配送信息 Schema
const DeliveryInfoSchema = new mongoose.Schema({
    address: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    postalCode: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: null
    }
});

// 订单/账单 Schema
const OrderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [OrderItemSchema],
    deliveryMethod: {
        type: String,
        enum: ['pickup', 'delivery'],
        required: true
    },
    deliveryInfo: {
        type: DeliveryInfoSchema,
        default: null
    },
    subtotal: {
        type: Number,
        required: true
    },
    deliveryFee: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'card'],
        default: 'cash'
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// ============================================
// 创建模型
// ============================================
const User = mongoose.model('User', UserSchema);
const Cart = mongoose.model('Cart', CartSchema);
const Order = mongoose.model('Order', OrderSchema);

// ============================================
// 数据迁移函数
// ============================================

/**
 * 生成订单号
 */
function generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `ORD-${timestamp}-${random}`;
}

/**
 * 从 localStorage 数据迁移用户账户
 * @param {Array} usersData - 用户数据数组
 */
async function migrateUsers(usersData) {
    console.log('开始迁移用户数据...');
    let successCount = 0;
    let errorCount = 0;

    for (const userData of usersData) {
        try {
            // 检查用户是否已存在
            const existingUser = await User.findOne({ email: userData.email });
            if (existingUser) {
                console.log(`用户 ${userData.email} 已存在，跳过`);
                continue;
            }

            const user = new User({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                isGuest: userData.isGuest || false
            });

            await user.save();
            console.log(`✓ 成功创建用户: ${userData.email}`);
            successCount++;
        } catch (error) {
            console.error(`✗ 创建用户失败 ${userData.email}:`, error.message);
            errorCount++;
        }
    }

    console.log(`用户迁移完成: 成功 ${successCount} 条, 失败 ${errorCount} 条\n`);
    return { successCount, errorCount };
}

/**
 * 从 localStorage 数据迁移购物车
 * @param {Object} cartData - 购物车数据对象 { productId: { name, price, qty, ... } }
 * @param {String} userEmail - 用户邮箱
 */
async function migrateCart(cartData, userEmail) {
    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            console.log(`用户 ${userEmail} 不存在，跳过购物车迁移`);
            return null;
        }

        // 检查是否已有购物车
        let cart = await Cart.findOne({ userId: user._id });
        
        const items = Object.entries(cartData).map(([productId, item]) => ({
            productId: productId,
            name: item.name,
            brand: item.brand || '',
            price: item.price,
            priceUnit: item.priceUnit || 'each',
            qty: item.qty,
            image: item.image || '',
            emoji: item.emoji || '📦'
        }));

        if (cart) {
            // 更新现有购物车
            cart.items = items;
            cart.updatedAt = new Date();
            await cart.save();
            console.log(`✓ 更新用户 ${userEmail} 的购物车`);
        } else {
            // 创建新购物车
            cart = new Cart({
                userId: user._id,
                items: items
            });
            await cart.save();
            console.log(`✓ 创建用户 ${userEmail} 的购物车`);
        }

        return cart;
    } catch (error) {
        console.error(`✗ 迁移购物车失败 (${userEmail}):`, error.message);
        return null;
    }
}

/**
 * 创建订单/账单记录
 * @param {Object} orderData - 订单数据
 * @param {String} userEmail - 用户邮箱
 */
async function createOrder(orderData, userEmail) {
    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            console.log(`用户 ${userEmail} 不存在，跳过订单创建`);
            return null;
        }

        const items = orderData.items.map(item => ({
            productId: item.productId || '',
            name: item.name,
            brand: item.brand || '',
            price: item.price,
            priceUnit: item.priceUnit || 'each',
            qty: item.qty,
            image: item.image || '',
            emoji: item.emoji || '📦',
            subtotal: item.price * item.qty
        }));

        const order = new Order({
            orderNumber: generateOrderNumber(),
            userId: user._id,
            items: items,
            deliveryMethod: orderData.deliveryMethod || 'pickup',
            deliveryInfo: orderData.deliveryInfo || null,
            subtotal: orderData.subtotal || 0,
            deliveryFee: orderData.deliveryFee || 0,
            tax: orderData.tax || 0,
            total: orderData.total || 0,
            paymentMethod: orderData.paymentMethod || 'cash',
            status: orderData.status || 'pending'
        });

        await order.save();
        console.log(`✓ 创建订单: ${order.orderNumber} (用户: ${userEmail})`);
        return order;
    } catch (error) {
        console.error(`✗ 创建订单失败 (${userEmail}):`, error.message);
        return null;
    }
}

/**
 * 从 localStorage 格式的数据迁移所有数据
 * @param {Object} localStorageData - localStorage 格式的数据
 */
async function migrateAllData(localStorageData) {
    try {
        // 迁移用户
        if (localStorageData.users && Array.isArray(localStorageData.users)) {
            await migrateUsers(localStorageData.users);
        }

        // 迁移当前用户的购物车
        if (localStorageData.currentUser && localStorageData.cart) {
            const currentUser = JSON.parse(localStorageData.currentUser);
            if (currentUser && currentUser.email) {
                const cart = JSON.parse(localStorageData.cart || '{}');
                await migrateCart(cart, currentUser.email);
            }
        }

        // 迁移订单（如果有历史订单数据）
        if (localStorageData.orders && Array.isArray(localStorageData.orders)) {
            console.log('开始迁移订单数据...');
            let successCount = 0;
            let errorCount = 0;

            for (const orderData of localStorageData.orders) {
                const userEmail = orderData.userEmail || localStorageData.currentUser?.email;
                if (userEmail) {
                    const result = await createOrder(orderData, userEmail);
                    if (result) successCount++;
                    else errorCount++;
                }
            }

            console.log(`订单迁移完成: 成功 ${successCount} 条, 失败 ${errorCount} 条\n`);
        }

        console.log('✓ 所有数据迁移完成！');
    } catch (error) {
        console.error('✗ 数据迁移失败:', error);
        throw error;
    }
}

// ============================================
// 辅助函数：从浏览器获取 localStorage 数据
// ============================================

/**
 * 示例：如何从浏览器获取 localStorage 数据
 * 在浏览器控制台中运行以下代码获取数据：
 * 
 * const data = {
 *     users: JSON.parse(localStorage.getItem('users') || '[]'),
 *     currentUser: localStorage.getItem('currentUser'),
 *     cart: localStorage.getItem('cart'),
 *     orders: JSON.parse(localStorage.getItem('orders') || '[]')
 * };
 * console.log(JSON.stringify(data, null, 2));
 * 
 * 然后将输出的 JSON 保存到文件中，用于迁移
 */

// ============================================
// 主函数
// ============================================

async function main() {
    // 检查 MongoDB URL 是否已配置
    if (MONGODB_URL === 'YOUR_MONGODB_CONNECTION_URL_HERE') {
        console.error('❌ 错误: 请先配置 MONGODB_URL');
        console.log('请在 mongodb-migration.js 文件中设置 MONGODB_URL 变量');
        process.exit(1);
    }

    try {
        // 连接 MongoDB
        console.log('正在连接 MongoDB...');
        await mongoose.connect(MONGODB_URL, {
            dbName: DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✓ MongoDB 连接成功\n');

        // 示例：迁移数据
        // 你需要从浏览器获取 localStorage 数据，格式如下：
        const exampleData = {
            users: [
                { name: "John Doe", email: "john@example.com", password: "password123" },
                { name: "Jane Smith", email: "jane@example.com", password: "password123" }
            ],
            currentUser: JSON.stringify({ name: "John Doe", email: "john@example.com", password: "password123" }),
            cart: JSON.stringify({
                "1000000000": {
                    name: "Washington Red Delicious™ Premium Apples",
                    brand: "Red Delicious",
                    price: 0.80,
                    priceUnit: "per piece",
                    qty: 2,
                    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
                    emoji: "🍎"
                }
            }),
            orders: [
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
                    deliveryMethod: "pickup",
                    subtotal: 1.60,
                    deliveryFee: 0,
                    tax: 0.13,
                    total: 1.73,
                    paymentMethod: "cash",
                    status: "completed"
                }
            ]
        };

        // 处理数据格式
        const processedData = {
            users: exampleData.users,
            currentUser: typeof exampleData.currentUser === 'string' 
                ? JSON.parse(exampleData.currentUser) 
                : exampleData.currentUser,
            cart: typeof exampleData.cart === 'string' 
                ? JSON.parse(exampleData.cart) 
                : exampleData.cart,
            orders: exampleData.orders
        };

        // 执行迁移
        await migrateAllData(processedData);

        // 关闭连接
        await mongoose.connection.close();
        console.log('\n✓ MongoDB 连接已关闭');
        process.exit(0);
    } catch (error) {
        console.error('❌ 错误:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
}

// 如果直接运行此文件，执行主函数
if (require.main === module) {
    main();
}

// ============================================
// 导出函数供其他模块使用
// ============================================
module.exports = {
    User,
    Cart,
    Order,
    migrateUsers,
    migrateCart,
    createOrder,
    migrateAllData,
    connectDB: async () => {
        if (MONGODB_URL === 'YOUR_MONGODB_CONNECTION_URL_HERE') {
            throw new Error('请先配置 MONGODB_URL');
        }
        await mongoose.connect(MONGODB_URL, {
            dbName: DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    },
    disconnectDB: async () => {
        await mongoose.connection.close();
    }
};

