import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Check if required environment variables are set
    const requiredEnvVars = {
      CLOUDFLARE_R2_ENDPOINT: process.env.CLOUDFLARE_R2_ENDPOINT,
      CLOUDFLARE_R2_TOKEN: process.env.CLOUDFLARE_R2_TOKEN,
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
    const image = formData.get('image') as File

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    // Validate file type
    if (!image.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    // Get image type from query parameter
    const { searchParams } = new URL(request.url)
    const imageType = searchParams.get('type') || 'blog'
    
    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = image.name.split('.').pop()
    const filename = `${imageType}-images/${timestamp}-${randomString}.${extension}`

    console.log('Uploading to R2:', {
      endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
      bucket: process.env.CLOUDFLARE_R2_BUCKET,
      filename,
      size: image.size,
      type: image.type
    })

    // Upload to Cloudflare R2
    const r2Response = await fetch(`${process.env.CLOUDFLARE_R2_ENDPOINT}/${filename}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${process.env.CLOUDFLARE_R2_TOKEN}`,
        'Content-Type': image.type,
      },
      body: image,
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
      size: image.size,
      type: image.type
    })

  } catch (error) {
    console.error('Image upload error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to upload image',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    )
  }
}
