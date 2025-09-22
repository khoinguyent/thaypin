#!/usr/bin/env node

/**
 * Test script for the contact API
 * Run this with: node scripts/test-contact-api.js
 */

async function testContactAPI() {
  const testData = {
    name: "Test User",
    phone: "0901234567",
    email: "test@example.com",
    service: "thay-pin",
    message: "This is a test message from the test script"
  };

  try {
    console.log('🧪 Testing Contact API...');
    console.log('📤 Sending test data:', testData);
    
    const response = await fetch('https://www.thaypin.vn/api/contact-public', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    console.log('📊 Response Status:', response.status);
    console.log('📄 Response Body:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('✅ SUCCESS: Contact API is working correctly!');
      console.log('🎉 You can now use the contact form at /lien-he');
    } else {
      console.log('❌ ERROR: Contact API returned an error');
      console.log('🔧 Make sure you have created the contact_messages table in Supabase');
    }
    
  } catch (error) {
    console.error('💥 Network Error:', error.message);
    console.log('🌐 Make sure your site is deployed and accessible');
  }
}

// Check if running in Node.js environment
if (typeof fetch === 'undefined') {
  console.log('📦 Installing fetch for Node.js...');
  const { default: fetch } = await import('node-fetch');
  global.fetch = fetch;
}

testContactAPI();
