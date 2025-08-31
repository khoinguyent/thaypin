const { createClient } = require('@supabase/supabase-js')

// You'll need to add these to your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

async function testDatabaseConnection() {
  console.log('🗄️ Testing Supabase Database Connection')
  console.log('=====================================\n')
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Missing environment variables:')
    console.log(`NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✅ Set' : '❌ Missing'}`)
    console.log(`SUPABASE_SERVICE_ROLE_KEY: ${supabaseKey ? '✅ Set' : '❌ Missing'}`)
    console.log('\n💡 Add these to your .env.local file')
    return
  }
  
  console.log('📋 Connection Parameters:')
  console.log(`URL: ${supabaseUrl}`)
  console.log(`Key: ${supabaseKey.substring(0, 20)}...`)
  console.log('')
  
  try {
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey)
    console.log('🔌 Supabase client created successfully')
    
    // Test 1: Check if we can connect
    console.log('\n🧪 Test 1: Basic Connection Test')
    const { data: testData, error: testError } = await supabase
      .from('admin_users')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.log('❌ Connection failed:', testError.message)
      return
    }
    console.log('✅ Connection successful!')
    
    // Test 2: Check if admin_users table exists
    console.log('\n🧪 Test 2: Table Existence Test')
    const { data: tableData, error: tableError } = await supabase
      .from('admin_users')
      .select('*')
      .limit(1)
    
    if (tableError) {
      console.log('❌ Table access failed:', tableError.message)
      if (tableError.message.includes('relation "admin_users" does not exist')) {
        console.log('💡 The admin_users table does not exist. Run the SQL setup script.')
      }
      return
    }
    console.log('✅ admin_users table accessible')
    
    // Test 3: Check for admin user
    console.log('\n🧪 Test 3: Admin User Check')
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', 'admin')
      .eq('is_active', true)
      .single()
    
    if (adminError) {
      console.log('❌ Admin user query failed:', adminError.message)
      if (adminError.message.includes('No rows found')) {
        console.log('💡 No admin user found. Insert the admin user first.')
      }
      return
    }
    
    console.log('✅ Admin user found:')
    console.log(`  ID: ${adminData.id}`)
    console.log(`  Username: ${adminData.username}`)
    console.log(`  Email: ${adminData.email}`)
    console.log(`  Role: ${adminData.role}`)
    console.log(`  Active: ${adminData.is_active}`)
    console.log(`  Hash Length: ${adminData.password_hash.length}`)
    console.log(`  Hash: ${adminData.password_hash}`)
    
    // Test 4: Test password verification
    console.log('\n🧪 Test 4: Password Verification Test')
    const bcrypt = require('bcryptjs')
    const password = 'thaypinadmin@'
    const isValid = bcrypt.compareSync(password, adminData.password_hash)
    
    if (isValid) {
      console.log('✅ Password verification successful!')
      console.log('The hash in the database is correct.')
    } else {
      console.log('❌ Password verification failed!')
      console.log('The hash in the database is incorrect.')
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
    console.error('Stack trace:', error.stack)
  }
}

// Run the test
testDatabaseConnection()
