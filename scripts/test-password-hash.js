const bcrypt = require('bcryptjs')

const password = 'thaypinadmin@'
const dbHash = '$2b$10$G9Il8Lq2W1pjQU0EcUFsk.B4ocB6MOLW.GjXGmkiJqHXKt3l1ossa'
const saltRounds = 10

console.log('🔐 Password Hash Test Script')
console.log('=============================\n')

console.log('📋 Test Parameters:')
console.log(`Password: "${password}"`)
console.log(`Database Hash: ${dbHash}`)
console.log(`Salt Rounds: ${saltRounds}`)
console.log(`Hash Length: ${dbHash.length} characters`)
console.log('')

// Test 1: Generate new hash
console.log('🧪 Test 1: Generate New Hash')
try {
    const newHash = bcrypt.hashSync(password, saltRounds)
    console.log(`New Hash: ${newHash}`)
    console.log(`Hash Length: ${newHash.length}`)
    console.log(`Starts with: ${newHash.substring(0, 7)}`)
    console.log(`Salt Rounds: ${newHash.substring(4, 6)}`)
    console.log('')
} catch (error) {
    console.error('❌ Error generating hash:', error.message)
}

// Test 2: Verify database hash
console.log('🔍 Test 2: Verify Database Hash')
try {
    const isValid = bcrypt.compareSync(password, dbHash)
    if (isValid) {
        console.log('✅ SUCCESS: Database hash matches password!')
        console.log('This means the hashing is working correctly.')
    } else {
        console.log('❌ FAILURE: Database hash does NOT match password!')
        console.log('This explains why login is failing.')
    }
    console.log('')
} catch (error) {
    console.error('❌ Error verifying hash:', error.message)
}

// Test 3: Generate multiple hashes
console.log('🔄 Test 3: Generate Multiple Hashes')
console.log('(Same password, different results due to random salt)')
try {
    for (let i = 1; i <= 3; i++) {
        const hash = bcrypt.hashSync(password, saltRounds)
        console.log(`${i}. ${hash}`)
    }
    console.log('')
} catch (error) {
    console.error('❌ Error generating multiple hashes:', error.message)
}

// Test 4: Verify all generated hashes
console.log('✅ Test 4: Verify All Generated Hashes')
try {
    const hashes = [
        dbHash,
        bcrypt.hashSync(password, saltRounds),
        bcrypt.hashSync(password, saltRounds),
        bcrypt.hashSync(password, saltRounds)
    ]
    
    hashes.forEach((hash, index) => {
        const isValid = bcrypt.compareSync(password, hash)
        const status = isValid ? '✅ PASS' : '❌ FAIL'
        console.log(`${index + 1}. ${status} - ${hash}`)
    })
    console.log('')
} catch (error) {
    console.error('❌ Error in verification test:', error.message)
}

// Test 5: Check hash format
console.log('📊 Test 5: Hash Format Analysis')
console.log(`Database Hash Format: ${dbHash.substring(0, 7)}...`)
console.log(`Version: ${dbHash.substring(0, 2)}`)
console.log(`Cost: ${dbHash.substring(4, 6)}`)
console.log(`Salt: ${dbHash.substring(7, 29)}`)
console.log(`Hash: ${dbHash.substring(29)}`)
console.log('')

// Test 6: Performance test
console.log('⚡ Test 6: Performance Test')
try {
    const startTime = Date.now()
    const testHash = bcrypt.hashSync(password, saltRounds)
    const endTime = Date.now()
    console.log(`Hash generation time: ${endTime - startTime}ms`)
    console.log(`Generated hash: ${testHash}`)
    
    const compareStart = Date.now()
    const compareResult = bcrypt.compareSync(password, testHash)
    const compareEnd = Date.now()
    console.log(`Hash comparison time: ${compareEnd - compareStart}ms`)
    console.log(`Comparison result: ${compareResult}`)
} catch (error) {
    console.error('❌ Error in performance test:', error.message)
}

console.log('\n🎯 Summary:')
console.log('If Test 2 shows SUCCESS, the hashing is working correctly.')
console.log('If Test 2 shows FAILURE, there is a mismatch between password and hash.')
console.log('All generated hashes should work with the same password due to bcrypt design.')
