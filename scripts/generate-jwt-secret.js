const crypto = require('crypto')

// Method 1: Generate random bytes and convert to base64
function generateRandomSecret(length = 64) {
  return crypto.randomBytes(length).toString('base64')
}

// Method 2: Generate random string with special characters
function generateComplexSecret(length = 64) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return result
}

// Method 3: Generate UUID-based secret
function generateUUIDSecret() {
  return crypto.randomUUID()
}

// Method 4: Generate timestamp-based secret
function generateTimestampSecret() {
  const timestamp = Date.now().toString()
  const random = crypto.randomBytes(32).toString('hex')
  return `${timestamp}_${random}`
}

console.log('🔐 JWT Secret Generation Script')
console.log('================================\n')

console.log('📋 Choose one of these methods:\n')

console.log('1️⃣ Random Bytes (Base64) - Recommended:')
console.log(`JWT_SECRET=${generateRandomSecret()}\n`)

console.log('2️⃣ Complex String with Special Characters:')
console.log(`JWT_SECRET=${generateComplexSecret()}\n`)

console.log('3️⃣ UUID-based Secret:')
console.log(`JWT_SECRET=${generateUUIDSecret()}\n`)

console.log('4️⃣ Timestamp-based Secret:')
console.log(`JWT_SECRET=${generateTimestampSecret()}\n`)

console.log('💡 Recommendation: Use Method 1 (Random Bytes) for production')
console.log('📝 Copy one of the above secrets to your .env.local file')
console.log('⚠️  Keep this secret secure and never commit it to version control!')
