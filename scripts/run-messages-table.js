#!/usr/bin/env node

/**
 * Script to create the contact_messages table
 * Run this with: node scripts/run-messages-table.js
 */

const fs = require('fs');
const path = require('path');

async function runMessagesTableSQL() {
  try {
    console.log('📋 Reading contact messages table SQL...');
    
    const sqlPath = path.join(__dirname, '07-create-contact-messages-table.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('✅ SQL file loaded successfully');
    console.log('📝 SQL Content:');
    console.log('================');
    console.log(sqlContent);
    console.log('================');
    
    console.log('\n🚀 Next steps:');
    console.log('1. Copy the SQL content above');
    console.log('2. Go to your Supabase dashboard');
    console.log('3. Navigate to SQL Editor');
    console.log('4. Paste and run the SQL');
    console.log('5. Or use the Supabase CLI: supabase db reset');
    
    console.log('\n📊 After creating the table, you can:');
    console.log('- Send messages via the contact form at /lien-he');
    console.log('- View messages in admin panel at /admin/messages');
    console.log('- Messages will be saved to the contact_messages table');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

runMessagesTableSQL();
