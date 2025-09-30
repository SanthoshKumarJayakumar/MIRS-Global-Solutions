import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface CareerApplicationData {
  name: string
  email: string
  phone: string
  location: string
  position: string
  experience: string
  resume: string
  cover_letter: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const applicationData: CareerApplicationData = await req.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'location', 'position', 'experience', 'resume', 'cover_letter']
    for (const field of requiredFields) {
      if (!applicationData[field as keyof CareerApplicationData]) {
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
    if (!emailRegex.test(applicationData.email)) {
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
    if (!phoneRegex.test(applicationData.phone.replace(/\s/g, ''))) {
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
    if (!nameRegex.test(applicationData.name)) {
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
    if (!locationRegex.test(applicationData.location)) {
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
      from: 'MIRS Global Solutions <careers@mirsglobalsolutions.com>',
      to: ['sashkumarjay@gmail.com'],
      subject: `New Career Application - ${applicationData.position} from ${applicationData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            New Career Application - MIRS Global Solutions
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Applicant Information</h3>
            <p><strong>Name:</strong> ${applicationData.name}</p>
            <p><strong>Email:</strong> ${applicationData.email}</p>
            <p><strong>Phone:</strong> ${applicationData.phone}</p>
            <p><strong>Location:</strong> ${applicationData.location}</p>
            <p><strong>Position Applied:</strong> ${applicationData.position}</p>
            <p><strong>Experience:</strong> ${applicationData.experience}</p>
            <p><strong>Resume/CV:</strong> <a href="${applicationData.resume}" target="_blank">View Resume</a></p>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Cover Letter</h3>
            <p style="line-height: 1.6;">${applicationData.cover_letter}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This application was submitted through the MIRS Global Solutions careers page.
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
        message: 'Career application submitted successfully and email sent!' 
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




