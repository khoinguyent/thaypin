import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
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

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = image.name.split('.').pop()
    const filename = `blog-images/${timestamp}-${randomString}.${extension}`

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
      throw new Error('Failed to upload to R2')
    }

    // Construct the public URL
    const publicUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${filename}`

    return NextResponse.json({ 
      url: publicUrl,
      filename: filename,
      size: image.size,
      type: image.type
    })

  } catch (error) {
    console.error('Image upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' }, 
      { status: 500 }
    )
  }
}
