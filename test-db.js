const fs = require('fs');
const { PrismaClient } = require('./src/generated/prisma');

// Load .env.local manually
const envContent = fs.readFileSync('.env.local', 'utf8');
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    process.env[key.trim()] = value.trim().replace(/"/g, '');
  }
});

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Test user query
    const user = await prisma.user.findUnique({
      where: { email: 'admin@x2marco.com' }
    });
    
    if (user) {
      console.log('✅ Admin user found:', { id: user.id, email: user.email });
    } else {
      console.log('❌ Admin user not found');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection(); 