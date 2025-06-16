import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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
    const { name, email, city } = await req.json();

    // Validation
    if (!name || !email || !city) {
      return NextResponse.json(
        { error: 'Name, email, and city are required' },
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
        // Production mode - send the Cat Luker sample directly to the user
        subject = 'Your Free Cat Luker Sample + Bible Study Guide from G.B. Sollie';
        textContent = `Hello ${name}, thank you for signing up at gbsollie.com. Your Cat Luker sample chapter and Bible Study Guide are attached.`;
        htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1e40af;">Thank You for Signing Up!</h1>
            <p>Dear ${name},</p>
            <p>Thank you for signing up at gbsollie.com. We're excited to have you join our community!</p>
            <p>As promised, I've attached your free Cat Luker sample chapter along with the companion Bible Study Guide. This is perfect for introducing your youth group to Cat's magical adventure and the spiritual lessons within.</p>
            <p>The attached PDF includes:</p>
            <ul style="margin: 16px 0; padding-left: 20px;">
              <li>The first 22 pages of Cat Luker: The Swamp Witch Chronicles</li>
              <li>A matching Bible Study Guide lesson</li>
              <li>Discussion questions perfect for youth groups</li>
            </ul>
            <p>I hope you and your youth group find this sample engaging and spiritually enriching. If you decide to continue the journey with Cat Luker, you can find the full book and additional resources at <a href="https://gbsollie.com" style="color: #1e40af;">gbsollie.com</a>.</p>
            <p>If you have any questions or feedback, please don't hesitate to reach out.</p>
            <p>Blessings and adventure await,<br>G.B. Sollie</p>
          </div>
        `;
      } else {
        // Sandbox mode - send user information to the account owner
        subject = `New Cat Luker Sample Request from ${name}`;
        textContent = `New signup from: ${name} (${email}) in ${city}. In production, they would receive the Cat Luker sample and Bible Study Guide.`;
        htmlContent = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1e40af;">New Cat Luker Sample Request</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>City:</strong> ${city}</p>
            <hr>
            <p>This is a sandbox mode email. In production, this user would receive the Cat Luker sample chapter and Bible Study Guide directly.</p>
            <p><strong>IMPORTANT:</strong> To send emails directly to subscribers, please verify a domain at 
            <a href="https://resend.com/domains">resend.com/domains</a>, then update your .env file to include:</p>
            <pre>VERIFIED_DOMAIN=yourdomain.com</pre>
            <p>Then change the "from" address in this API route to use your verified domain.</p>
          </div>
        `;
      }
      
      // Include the Cat Luker sample PDF when domain is verified
      const attachments = isDomainVerified
        ? [{
            content: fs.readFileSync(path.join(process.cwd(), 'public', 'Cat_Luker_BookWithGuide_Sample.pdf')).toString('base64'),
            filename: 'Cat_Luker_BookWithGuide_Sample.pdf',
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
      
      // Return success response
      return NextResponse.json({ 
        success: true, 
        data: result,
        sandboxMode: !isDomainVerified,
        message: isDomainVerified
          ? "Success! The Cat Luker sample and Bible Study Guide have been sent to your email."
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