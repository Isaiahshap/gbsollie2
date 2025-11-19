import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isRateLimited } from '@/lib/rateLimit';
import { checkIfBot } from '@/lib/botDetection';

// Initialize Resend with the API key
const apiKey = process.env.RESEND_API_KEY || 're_YZ8QpvdE_Q4EofEwxWvyMq6kMSzDTAjau';
const resend = new Resend(apiKey);

// The account owner's email (for sandbox mode)
const ACCOUNT_EMAIL = 'greg.sollie@gmail.com';

// Check if we have a verified domain (in .env). If not, we're in sandbox mode.
const VERIFIED_DOMAIN = process.env.VERIFIED_DOMAIN;
const isDomainVerified = !!VERIFIED_DOMAIN;

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { name, email, city, timestamp, submitTime } = await req.json();

    // Basic validation
    if (!name || !email || !city) {
      return NextResponse.json(
        { error: 'Name, email, and city are required' },
        { status: 400 }
      );
    }

    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    // Rate limiting check - 3 submissions per IP per minute
    if (isRateLimited(`ip:${clientIP}`, { maxRequests: 3, windowMs: 60 * 1000 })) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Rate limiting by email - 2 submissions per email per 5 minutes
    if (isRateLimited(`email:${email.toLowerCase()}`, { maxRequests: 2, windowMs: 5 * 60 * 1000 })) {
      return NextResponse.json(
        { error: 'You have already subscribed. Please check your email.' },
        { status: 429 }
      );
    }

    // Bot detection
    const botCheck = checkIfBot({
      request: req,
      name,
      email,
      timestamp,
      submitTime,
    });

    if (botCheck.isBot) {
      // Log bot attempt for monitoring
      console.warn('Bot submission blocked:', {
        reason: botCheck.reason,
        confidence: botCheck.confidence,
        email,
        ip: clientIP,
        userAgent: req.headers.get('user-agent'),
      });

      // For high confidence bot detection, silently accept but don't process
      if (botCheck.confidence === 'high') {
        return NextResponse.json({
          success: true,
          message: 'Thank you! Your download will be sent to your email shortly.',
        });
      }

      // For medium confidence, return error
      return NextResponse.json(
        { error: 'Your submission could not be processed. Please try again or contact support.' },
        { status: 400 }
      );
    }

    try {
      // Configure the "to" field based on whether we're in sandbox mode
      const toEmail = isDomainVerified ? email : ACCOUNT_EMAIL;
      
      // Configure the "from" field based on whether we have a verified domain
      const fromEmail = isDomainVerified 
        ? `G.B. Sollie <newsletter@${VERIFIED_DOMAIN}>` 
        : 'onboarding@resend.dev';
        
      // The email content depends on whether we're in sandbox mode
      let subject, textContent, htmlContent;
      
      if (isDomainVerified) {
        // Production mode - send the Bible study guide directly to the user
        subject = 'Your Free Bible Study Guide from G.B. Sollie';
        textContent = `Hello ${name}, thank you for signing up at gbsollie.com. Your Bible Study Guide is attached.`;
        htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1e40af;">Thank You for Signing Up!</h1>
            <p>Dear ${name},</p>
            <p>Thank you for signing up at gbsollie.com. We're excited to have you join our community!</p>
            <p>As promised, I've attached your free Bible study guide. I hope you find it insightful and enriching.</p>
            <p>If you have any questions or feedback, please don't hesitate to reach out.</p>
            <p>Warm regards,<br>G.B. Sollie</p>
          </div>
        `;
      } else {
        // Sandbox mode - send user information to the account owner
        subject = `New Bible Study Guide Request from ${name}`;
        textContent = `New signup from: ${name} (${email}) in ${city}. In production, they would receive the Bible Study Guide.`;
        htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1e40af;">New Bible Study Guide Request</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>City:</strong> ${city}</p>
            <hr>
            <p>This is a sandbox mode email. In production, this user would receive the Bible Study Guide directly.</p>
            <p><strong>IMPORTANT:</strong> To send emails directly to subscribers, please verify a domain at 
            <a href="https://resend.com/domains">resend.com/domains</a>, then update your .env file to include:</p>
            <pre>VERIFIED_DOMAIN=yourdomain.com</pre>
            <p>Then change the "from" address in this API route to use your verified domain.</p>
          </div>
        `;
      }
      
      // Include the Bible study PDF when domain is verified
      const attachments = isDomainVerified
        ? [{
            content: fs.readFileSync(path.join(process.cwd(), 'public', 'biblestudy.pdf')).toString('base64'),
            filename: 'biblestudy.pdf',
            content_type: 'application/pdf',
          }]
        : [];
      const result = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        subject: subject,
        text: textContent,
        html: htmlContent,
        attachments,
      });
      
      // Check if the result contains an error
      if (result.error) {
        throw new Error(`Resend API error: ${result.error.message}`);
      }
      
      // In production mode, also send a notification email to Greg with the user's info
      if (isDomainVerified) {
        const notificationResult = await resend.emails.send({
          from: fromEmail,
          to: [ACCOUNT_EMAIL],
          subject: `New Bible Study Guide Request from ${name}`,
          text: `New signup from: ${name} (${email}) in ${city}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #1e40af;">New Bible Study Guide Request</h1>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>City:</strong> ${city}</p>
              <hr>
              <p>This person has been sent the Bible Study Guide automatically.</p>
            </div>
          `,
        });
        
        // Log if notification fails, but don't fail the main request
        if (notificationResult.error) {
          console.error('Failed to send notification to site owner:', notificationResult.error);
        }
      }
      
      // Return success response
      return NextResponse.json({ 
        success: true, 
        data: result,
        sandboxMode: !isDomainVerified,
        message: isDomainVerified
          ? "Success! The Bible study guide has been sent to your email."
          : "Your information has been submitted. During development, emails are sent to the site owner only."
      });
    } catch (emailError) {
      // Special handling for sandbox mode errors
      if (emailError instanceof Error && 
          (emailError.message.includes("verify a domain") || 
           emailError.message.includes("testing emails"))) {
        return NextResponse.json({
          sandboxMode: true,
          message: "Your information has been received. In development mode: emails are sent to the site owner only.",
          error: "Email API is in sandbox mode. To send emails to subscribers, verify a domain in Resend."
        }, { status: 200 }); // Return 200 to avoid alarming users during development
      }
      
      return NextResponse.json(
        { error: `Failed to send email: ${emailError instanceof Error ? emailError.message : 'Unknown error'}` },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
} 