const fetch = require('node-fetch')

const API_URL = 'http://localhost:3000/api/admin/login'
const testCredentials = {
  username: 'admin',
  password: 'thaypinadmin@'
}

async function testAPI() {
  console.log('🧪 Testing Admin Login API')
  console.log('==========================\n')
  
  console.log('📋 Test Parameters:')
  console.log(`API URL: ${API_URL}`)
  console.log(`Username: ${testCredentials.username}`)
  console.log(`Password: ${testCredentials.password}`)
  console.log('')
  
  try {
    console.log('📡 Sending request to API...')
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testCredentials),
    })
    
    console.log(`📊 Response Status: ${response.status}`)
    console.log(`📊 Response Headers:`, Object.fromEntries(response.headers.entries()))
    
    const data = await response.json()
    console.log('📄 Response Body:', JSON.stringify(data, null, 2))
    
    if (response.ok) {
      console.log('\n✅ SUCCESS: API responded successfully!')
      if (data.token) {
        console.log('✅ JWT Token received')
        console.log(`Token length: ${data.token.length} characters`)
      }
      if (data.user) {
        console.log('✅ User data received')
        console.log(`User ID: ${data.user.id}`)
        console.log(`Username: ${data.user.username}`)
        console.log(`Role: ${data.user.role}`)
      }
    } else {
      console.log('\n❌ FAILURE: API responded with error')
      console.log(`Error: ${data.error}`)
    }
    
  } catch (error) {
    console.error('\n❌ ERROR: Failed to connect to API')
    console.error('Error details:', error.message)
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 This usually means:')
      console.log('1. The development server is not running')
      console.log('2. The API route is not accessible')
      console.log('3. There is a port conflict')
    }
  }
  
  console.log('\n🎯 Next Steps:')
  console.log('1. Make sure your development server is running (npm run dev)')
  console.log('2. Check if the API route is accessible')
  console.log('3. Verify environment variables are set correctly')
  console.log('4. Check browser console for any JavaScript errors')
}

// Run the test
testAPI()
