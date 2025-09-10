import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Helper function to create AWS signature key
function getSignatureKey(key: string, dateStamp: string, regionName: string, serviceName: string) {
  const kDate = crypto.createHmac('sha256', `AWS4${key}`).update(dateStamp).digest()
  const kRegion = crypto.createHmac('sha256', kDate).update(regionName).digest()
  const kService = crypto.createHmac('sha256', kRegion).update(serviceName).digest()
  const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest()
  return kSigning
}

export async function POST(request: NextRequest) {
  try {
    // Check if required environment variables are set
    const requiredEnvVars = {
      CLOUDFLARE_R2_ENDPOINT: process.env.CLOUDFLARE_R2_ENDPOINT,
      CLOUDFLARE_R2_ACCESS_KEY_ID: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
      CLOUDFLARE_R2_SECRET_ACCESS_KEY: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
      CLOUDFLARE_R2_PUBLIC_URL: process.env.CLOUDFLARE_R2_PUBLIC_URL,
      CLOUDFLARE_R2_BUCKET: process.env.CLOUDFLARE_R2_BUCKET,
      CLOUDFLARE_R2_ACCOUNT_ID: process.env.CLOUDFLARE_R2_ACCOUNT_ID,
    }

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([, value]) => !value)
      .map(([key]) => key)

    if (missingVars.length > 0) {
      console.error('Missing required environment variables:', missingVars)
      return NextResponse.json({ 
        error: 'Server configuration incomplete',
        details: `Missing: ${missingVars.join(', ')}`,
        message: 'Please configure Cloudflare R2 environment variables'
      }, { status: 500 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type (images and videos)
    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')
    
    if (!isImage && !isVideo) {
      return NextResponse.json({ error: 'Invalid file type. Only images and videos are allowed.' }, { status: 400 })
    }

    // Validate file size (max 50MB for videos, 5MB for images)
    const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024
    if (file.size > maxSize) {
      const maxSizeMB = isVideo ? 50 : 5
      return NextResponse.json({ error: `File too large. Maximum size: ${maxSizeMB}MB` }, { status: 400 })
    }

    // Get file type from query parameter
    const { searchParams } = new URL(request.url)
    const fileType = searchParams.get('type') || 'blog'
    
    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split('.').pop()
    const folder = isVideo ? 'videos' : 'images'
    const filename = `${fileType}-${folder}/${timestamp}-${randomString}.${extension}`

    console.log('Uploading to R2:', {
      endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
      bucket: process.env.CLOUDFLARE_R2_BUCKET,
      filename,
      size: file.size,
      type: file.type,
      isVideo: isVideo
    })

    // Create AWS S3-compatible signature for R2
    const now = new Date()
    const awsTimestamp = now.toISOString().replace(/[:\-]|\.\d{3}/g, '')
    const date = awsTimestamp.substr(0, 8)
    
    // Create the canonical request
    const canonicalUri = `/${process.env.CLOUDFLARE_R2_BUCKET}/${filename}`
    const canonicalQueryString = ''
    const canonicalHeaders = `host:${new URL(process.env.CLOUDFLARE_R2_ENDPOINT!).host}\nx-amz-date:${awsTimestamp}\n`
    const signedHeaders = 'host;x-amz-date'
    const payloadHash = crypto.createHash('sha256').update(Buffer.from(await file.arrayBuffer())).digest('hex')
    
    const canonicalRequest = `PUT\n${canonicalUri}\n${canonicalQueryString}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`
    
    // Create the string to sign
    const algorithm = 'AWS4-HMAC-SHA256'
    const credentialScope = `${date}/auto/s3/aws4_request`
    const stringToSign = `${algorithm}\n${awsTimestamp}\n${credentialScope}\n${crypto.createHash('sha256').update(canonicalRequest).digest('hex')}`
    
    // Calculate the signature
    const signingKey = getSignatureKey(process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!, date, 'auto', 's3')
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex')
    
    // Create authorization header
    const authorizationHeader = `${algorithm} Credential=${process.env.CLOUDFLARE_R2_ACCESS_KEY_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`
    
    const r2Response = await fetch(`${process.env.CLOUDFLARE_R2_ENDPOINT}${canonicalUri}`, {
      method: 'PUT',
      headers: {
        'Authorization': authorizationHeader,
        'Content-Type': file.type,
        'x-amz-date': awsTimestamp,
        'x-amz-content-sha256': payloadHash,
      },
      body: file,
    })

    if (!r2Response.ok) {
      const errorText = await r2Response.text()
      console.error('R2 upload failed:', {
        status: r2Response.status,
        statusText: r2Response.statusText,
        error: errorText
      })
      throw new Error(`R2 upload failed: ${r2Response.status} ${r2Response.statusText}`)
    }

    // Construct the public URL
    const publicUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${filename}`

    console.log('Upload successful:', publicUrl)

    return NextResponse.json({ 
      url: publicUrl,
      filename: filename,
      size: file.size,
      type: file.type,
      isVideo: isVideo
    })

  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to upload file',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}
