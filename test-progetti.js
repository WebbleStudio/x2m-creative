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

async function testProgetti() {
  try {
    console.log('Testing progetti table...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Test progetti query
    const progetti = await prisma.progetto.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`✅ Found ${progetti.length} progetti:`);
    progetti.forEach((progetto, index) => {
      console.log(`${index + 1}. ${progetto.titolo} (${progetto.visibile ? 'visibile' : 'nascosto'})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testProgetti(); 