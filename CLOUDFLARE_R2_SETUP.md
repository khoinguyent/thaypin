# Cloudflare R2 Setup Guide for thaypin.vn

## 🚀 **Overview**
This guide will help you set up Cloudflare R2 Object Storage for image uploads in the thaypin.vn admin dashboard.

## 📋 **Prerequisites**
- Cloudflare account
- Access to Cloudflare dashboard
- Domain configured with Cloudflare

## 🔧 **Step 1: Create R2 Bucket**

1. **Login to Cloudflare Dashboard**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Select your account

2. **Navigate to R2 Object Storage**
   - Click on "R2 Object Storage" in the left sidebar
   - Click "Create bucket"

3. **Configure Bucket**
   - **Bucket name**: `thaypin-images` (or your preferred name)
   - **Location**: Choose closest to your users (e.g., APAC for Vietnam)
   - Click "Create bucket"

## 🔑 **Step 2: Create API Token**

1. **Go to API Tokens**
   - In Cloudflare dashboard, click "My Profile" (top right)
   - Click "API Tokens" tab
   - Click "Create Token"

2. **Configure Token**
   - **Token name**: `thaypin-r2-upload`
   - **Permissions**: 
     - **Account**: `Cloudflare R2:Edit` (for your account)
     - **Zone**: `Zone:Edit` (for your domain)
   - **Account Resources**: Include specific account
   - **Zone Resources**: Include specific zone (your domain)

3. **Create Token**
   - Click "Continue to summary"
   - Click "Create Token"
   - **IMPORTANT**: Copy the token immediately (you won't see it again!)

## 🌐 **Step 3: Get Account ID and Endpoint**

1. **Account ID**
   - In Cloudflare dashboard, look at the URL: `https://dash.cloudflare.com/<ACCOUNT_ID>`
   - Copy the `<ACCOUNT_ID>` part

2. **R2 Endpoint**
   - Go to R2 Object Storage
   - Click on your bucket
   - Look for "S3 API" section
   - Copy the endpoint URL (format: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`)

## 🔗 **Step 4: Configure Custom Domain (Optional but Recommended)**

1. **Add Custom Domain**
   - In your R2 bucket settings, go to "Settings" tab
   - Under "Custom Domains", click "Add custom domain"
   - Enter: `images.thaypin.vn` (or your preferred subdomain)
   - Follow DNS setup instructions

2. **DNS Configuration**
   - Add CNAME record in your domain's DNS:
     - **Name**: `images` (or your preferred subdomain)
     - **Target**: `<ACCOUNT_ID>.r2.cloudflarestorage.com`
     - **Proxy status**: Proxied (orange cloud)

## ⚙️ **Step 5: Environment Variables**

Create a `.env.local` file in your project root with these variables:

```bash
# Cloudflare R2 Configuration
CLOUDFLARE_R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
CLOUDFLARE_R2_TOKEN=your-r2-api-token-here
CLOUDFLARE_R2_PUBLIC_URL=https://images.thaypin.vn
CLOUDFLARE_R2_BUCKET=thaypin-images
CLOUDFLARE_R2_ACCOUNT_ID=your-account-id
```

## 🧪 **Step 6: Test Configuration**

1. **Restart your development server**
   ```bash
   npm run dev
   ```

2. **Try uploading an image**
   - Go to `/admin/battery-images`
   - Click "Thêm hình ảnh mới"
   - Select an image file and click "Thêm"

3. **Check console logs**
   - Open browser developer tools
   - Look for upload logs in the console
   - Check Network tab for API calls

## 🚨 **Troubleshooting**

### **Error: "Server configuration incomplete"**
- Check that all environment variables are set
- Verify `.env.local` file exists and has correct values
- Restart your development server

### **Error: "R2 upload failed: 401 Unauthorized"**
- Check your API token has correct permissions
- Verify token hasn't expired
- Ensure token has access to the specific bucket

### **Error: "R2 upload failed: 403 Forbidden"**
- Check bucket permissions
- Verify bucket name matches environment variable
- Ensure account ID is correct

### **Error: "Failed to connect"**
- Check R2 endpoint URL format
- Verify account ID in endpoint URL
- Ensure R2 service is enabled for your account

## 📱 **Usage in Admin Dashboard**

Once configured, the upload flow works as follows:

1. **User selects image file** or **provides URL**
2. **If file selected**: 
   - File uploads to Cloudflare R2 silently
   - URL field automatically populated with R2 public URL
3. **Database insertion**: Image data saved with the R2 URL
4. **Success feedback**: User sees confirmation message

## 🔒 **Security Notes**

- **Never commit `.env.local` to git**
- **Rotate API tokens regularly**
- **Use least-privilege permissions**
- **Monitor R2 usage and costs**
- **Set up R2 lifecycle policies for old images**

## 💰 **Cost Considerations**

- **Storage**: $0.015 per GB per month
- **Class A operations** (PUT, POST, DELETE): $4.50 per million
- **Class B operations** (GET, HEAD): $0.36 per million
- **Egress**: Free (unlike AWS S3)

## 📞 **Support**

If you encounter issues:
1. Check Cloudflare R2 status page
2. Review Cloudflare R2 documentation
3. Check browser console for detailed error messages
4. Verify all environment variables are correctly set
