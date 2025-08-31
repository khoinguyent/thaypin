const bcrypt = require('bcryptjs')

const password = 'thaypinadmin@'
const saltRounds = 10

async function generateHash() {
  try {
    const hash = await bcrypt.hash(password, saltRounds)
    console.log('Password:', password)
    console.log('Hash:', hash)
    console.log('\nUse this hash in your Supabase admin_users table:')
    console.log('UPDATE admin_users SET password_hash = \'' + hash + '\' WHERE username = \'admin\';')
  } catch (error) {
    console.error('Error generating hash:', error)
  }
}

generateHash()
