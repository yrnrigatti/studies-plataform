import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
    try {
        // Test database connection
        await prisma.$connect();
        console.log('✅ Database connection successful');

        // Test query
        const userCount = await prisma.user.count();
        console.log(`✅ Users table accessible. Current count: ${userCount}`);

        await prisma.$disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

testConnection();
