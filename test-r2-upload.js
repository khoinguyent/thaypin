#!/usr/bin/env node

/**
 * Test script for R2 upload functionality
 * Run with: node test-r2-upload.js
 */

const fs = require('fs');
const path = require('path');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!');
  console.log('Please create .env.local with the following variables:');
  console.log(`
CLOUDFLARE_R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
CLOUDFLARE_R2_ACCESS_KEY_ID=your-access-key-id-here
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-secret-access-key-here
CLOUDFLARE_R2_PUBLIC_URL=https://images.thaypin.vn
CLOUDFLARE_R2_BUCKET=thaypin-images
CLOUDFLARE_R2_ACCOUNT_ID=your-account-id
  `);
  process.exit(1);
}

// Load environment variables
require('dotenv').config({ path: envPath });

// Check required environment variables
const requiredVars = [
  'CLOUDFLARE_R2_ENDPOINT',
  'CLOUDFLARE_R2_ACCESS_KEY_ID', 
  'CLOUDFLARE_R2_SECRET_ACCESS_KEY',
  'CLOUDFLARE_R2_PUBLIC_URL',
  'CLOUDFLARE_R2_BUCKET',
  'CLOUDFLARE_R2_ACCOUNT_ID'
];

const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingVars.forEach(varName => console.error(`   - ${varName}`));
  process.exit(1);
}

console.log('✅ All required environment variables are set');
console.log('📋 Configuration:');
console.log(`   Endpoint: ${process.env.CLOUDFLARE_R2_ENDPOINT}`);
console.log(`   Bucket: ${process.env.CLOUDFLARE_R2_BUCKET}`);
console.log(`   Public URL: ${process.env.CLOUDFLARE_R2_PUBLIC_URL}`);
console.log(`   Account ID: ${process.env.CLOUDFLARE_R2_ACCOUNT_ID}`);
console.log(`   Access Key ID: ${process.env.CLOUDFLARE_R2_ACCESS_KEY_ID.substring(0, 8)}...`);

console.log('\n🚀 To test the upload:');
console.log('1. Start your Next.js development server: npm run dev');
console.log('2. Go to http://localhost:3000/admin/battery-images');
console.log('3. Try uploading an image');
console.log('4. Check the browser console and server logs for any errors');

console.log('\n📝 Next steps:');
console.log('1. Create R2 API Token in Cloudflare dashboard');
console.log('2. Update .env.local with your actual credentials');
console.log('3. Test the upload functionality');
