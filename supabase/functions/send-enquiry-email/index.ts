import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
console.log("RESEND_API_KEY", Deno.env.get("RESEND_API_KEY"))

interface EnquiryData {
  name: string
  email: string
  phone: string
  location: string
  service: string
  message: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const enquiryData: EnquiryData = await req.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'location', 'service', 'message']
    for (const field of requiredFields) {
      if (!enquiryData[field as keyof EnquiryData]) {
        return new Response(
          JSON.stringify({ error: `${field} is required` }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(enquiryData.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Phone validation (10 digits)
    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(enquiryData.phone.replace(/\s/g, ''))) {
      return new Response(
        JSON.stringify({ error: 'Phone number must be 10 digits' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Name validation (only alphabets and spaces)
    const nameRegex = /^[a-zA-Z\s]+$/
    if (!nameRegex.test(enquiryData.name)) {
      return new Response(
        JSON.stringify({ error: 'Name should contain only alphabets' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Location validation (alphabets, spaces, and basic punctuation)
    const locationRegex = /^[a-zA-Z\s,.-]+$/
    if (!locationRegex.test(enquiryData.location)) {
      return new Response(
        JSON.stringify({ error: 'Location should contain only alphabets' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Send email using Resend API
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      console.error('RESEND_API_KEY not found')
      return new Response(
        JSON.stringify({ error: 'Email service configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const emailContent = {
      from: 'MIRS Global Solutions <support@mirsglobalsolutions.com>',
      to: ['sashkumarjay@gmail.com'],
      subject: `New Enquiry from ${enquiryData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            New Enquiry - MIRS Global Solutions
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${enquiryData.name}</p>
            <p><strong>Email:</strong> ${enquiryData.email}</p>
            <p><strong>Phone:</strong> ${enquiryData.phone}</p>
            <p><strong>Location:</strong> ${enquiryData.location}</p>
            <p><strong>Service Required:</strong> ${enquiryData.service}</p>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6;">${enquiryData.message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This enquiry was submitted through the MIRS Global Solutions website.
            </p>
          </div>
        </div>
      `
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailContent),
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text()
      console.log("Resend key is", Deno.env.get("RESEND_API_KEY"))
      console.error('Resend API error:', errorData)
      return new Response(
        JSON.stringify({ error: 'Failed to send email notification' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Enquiry submitted successfully and email sent!' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})