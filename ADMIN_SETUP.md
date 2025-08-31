# Admin System Setup Guide

## 🚀 **Overview**
This guide will help you set up a complete admin authentication system for thaypin.vn with:
- Secure login system
- JWT token authentication
- Protected admin routes
- Admin dashboard
- Supabase integration

## 📋 **Prerequisites**
- Supabase project set up
- Node.js and npm installed
- Access to your Supabase dashboard

## 🗄️ **Database Setup**

### 1. Create Admin Users Table
Run the following SQL in your Supabase SQL Editor:

```sql
-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  full_name VARCHAR(100),
  role VARCHAR(20) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on username for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);

-- Insert default admin user
INSERT INTO admin_users (username, password_hash, email, full_name, role) 
VALUES (
  'admin', 
  '$2b$10$xnLUTUhZYf1e4st.d9DrMu0fTECUeVvwr3A.8NRqHvCoHLy5l6xIe', 
  'admin@thaypin.vn', 
  'Administrator', 
  'admin'
) ON CONFLICT (username) DO NOTHING;
```

### 2. Default Admin Credentials
- **Username**: `admin`
- **Password**: `thaypinadmin@`

## 🔧 **Environment Variables**

Add these to your `.env.local` file:

```bash
# JWT Secret (generate a strong random string for production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Supabase (you should already have these)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 📁 **File Structure**

```
app/
├── admin/
│   ├── login/
│   │   └── page.tsx          # Admin login page
│   └── dashboard/
│       └── page.tsx          # Admin dashboard
├── api/
│   └── admin/
│       └── login/
│           └── route.ts      # Login API endpoint
├── middleware.ts              # Route protection
└── ...

scripts/
└── generate-password-hash.js  # Password hash generator

supabase-admin-setup.sql       # Database setup SQL
```

## 🚀 **Installation Steps**

### 1. Install Dependencies
```bash
npm install bcryptjs jsonwebtoken
npm install --save-dev @types/bcryptjs @types/jsonwebtoken
```

### 2. Generate Password Hash (if needed)
```bash
node scripts/generate-password-hash.js
```

### 3. Set Up Database
- Copy the SQL from `supabase-admin-setup.sql`
- Run it in your Supabase SQL Editor
- Update the password hash with the generated one

### 4. Configure Environment Variables
- Add JWT_SECRET to your environment variables
- Ensure Supabase credentials are configured

## 🔐 **Security Features**

- **Password Hashing**: Uses bcrypt with 10 salt rounds
- **JWT Tokens**: 24-hour expiration with secure signing
- **Route Protection**: Middleware protects all `/admin/*` routes
- **Input Validation**: Server-side validation for all inputs
- **Secure Headers**: Proper HTTP security headers

## 🎯 **Usage**

### 1. Access Admin Login
Navigate to: `/admin/login`

### 2. Login with Credentials
- Username: `admin`
- Password: `thaypinadmin@`

### 3. Access Dashboard
After successful login, you'll be redirected to `/admin/dashboard`

### 4. Logout
Click the "Đăng xuất" button to log out

## 🛡️ **Production Security Checklist**

- [ ] Change default JWT_SECRET to a strong random string
- [ ] Use HTTPS in production
- [ ] Set up proper CORS policies
- [ ] Implement rate limiting
- [ ] Add audit logging
- [ ] Regular security updates
- [ ] Monitor failed login attempts

## 🔧 **Customization**

### Adding New Admin Users
1. Generate password hash using the script
2. Insert new user into `admin_users` table
3. Set appropriate role and permissions

### Modifying Admin Dashboard
Edit `/app/admin/dashboard/page.tsx` to add new features or modify the layout

### Adding New Protected Routes
1. Create new pages in `/app/admin/`
2. Middleware will automatically protect them
3. Add navigation links in the dashboard

## 🚨 **Troubleshooting**

### Common Issues

1. **"Invalid token" errors**
   - Check JWT_SECRET is set correctly
   - Ensure token hasn't expired (24h limit)

2. **Database connection errors**
   - Verify Supabase credentials
   - Check table exists and has correct structure

3. **Login not working**
   - Verify password hash in database
   - Check username is exactly "admin"

4. **Middleware redirects**
   - Ensure JWT_SECRET is set
   - Check token format in localStorage

### Debug Mode
Add console.logs in the API route to debug authentication issues:

```typescript
console.log('Login attempt:', { username, hasPassword: !!password })
console.log('Database result:', { adminUser, queryError })
console.log('Password validation:', isPasswordValid)
```

## 📞 **Support**

If you encounter issues:
1. Check the browser console for errors
2. Verify all environment variables are set
3. Ensure database table structure is correct
4. Check Supabase logs for database errors

## 🔄 **Updates & Maintenance**

- Regularly rotate JWT_SECRET
- Monitor admin user activity
- Keep dependencies updated
- Backup admin user data regularly

---

**⚠️ Important**: Never commit sensitive information like JWT secrets or database credentials to version control!
