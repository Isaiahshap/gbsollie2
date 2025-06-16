import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export default function PrivacyPolicyPage() {
  const lastUpdated = "June 16, 2025";

  return (
    <>
      <Section 
        className="bg-primary text-white"
        id="privacy-hero"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">Privacy Policy</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90">
            How we collect, use, and protect your personal information
          </p>
        </div>
      </Section>

      <Section
        className="bg-white"
        id="privacy-content"
      >
        <div className="prose prose-lg max-w-4xl mx-auto text-black">
          <h2>Privacy Policy for G.B. Sollie</h2>
          <p className="text-black"><strong>Effective Date:</strong> {lastUpdated}</p>
          
          <p className="text-black">
            This Privacy Policy describes how G.B. Sollie collects, uses, and protects your personal 
            information when you visit our website gbsollie.com or use our services. We are committed 
            to protecting your privacy and being transparent about our data practices.
          </p>

          <h3>1. Information We Collect</h3>
          <h4>Personal Information You Provide</h4>
          <p className="text-black">
            We collect information you voluntarily provide to us, including:
          </p>
          <ul>
            <li className="text-black">Contact information (name, email address, phone number, mailing address)</li>
            <li className="text-black">Payment information when making purchases</li>
            <li className="text-black">Communication preferences for newsletters and updates</li>
            <li className="text-black">Messages and inquiries sent through our contact forms</li>
            <li className="text-black">Information provided during author visit requests</li>
          </ul>

          <h4>Automatically Collected Information</h4>
          <p className="text-black">
            When you visit our website, we may automatically collect:
          </p>
          <ul>
            <li className="text-black">IP address and general location information</li>
            <li className="text-black">Browser type and version</li>
            <li className="text-black">Device information and operating system</li>
            <li className="text-black">Pages visited and time spent on our site</li>
            <li className="text-black">Referring website information</li>
            <li className="text-black">Cookies and similar tracking technologies (see our Cookie Policy)</li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p className="text-black">We use the information we collect to:</p>
          <ul>
            <li className="text-black">Provide and improve our services</li>
            <li className="text-black">Process book orders and payments</li>
            <li className="text-black">Send newsletters and updates about new books and events (with your consent)</li>
            <li className="text-black">Respond to your inquiries and provide customer support</li>
            <li className="text-black">Schedule and coordinate author visits and speaking engagements</li>
            <li className="text-black">Analyze website usage to improve user experience</li>
            <li className="text-black">Comply with legal obligations</li>
            <li className="text-black">Protect against fraud and security threats</li>
          </ul>

          <h3>3. Legal Basis for Processing (GDPR)</h3>
          <p className="text-black">We process your personal information based on:</p>
          <ul>
            <li className="text-black"><strong>Consent:</strong> When you subscribe to newsletters or provide information voluntarily</li>
            <li className="text-black"><strong>Contract:</strong> When processing payments or fulfilling book orders</li>
            <li className="text-black"><strong>Legitimate Interest:</strong> For website analytics and security purposes</li>
            <li className="text-black"><strong>Legal Obligation:</strong> When required by law (tax records, etc.)</li>
          </ul>

          <h3>4. Information Sharing and Disclosure</h3>
          <p className="text-black">
            We do not sell, rent, or trade your personal information to third parties. We may share 
            your information only in the following circumstances:
          </p>
          <ul>
            <li className="text-black"><strong>Service Providers:</strong> With trusted third-party services that help us operate our website and business (payment processors, email services, web hosting)</li>
            <li className="text-black"><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
            <li className="text-black"><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            <li className="text-black"><strong>Protection:</strong> To protect our rights, property, or safety, or that of others</li>
          </ul>

          <h3>5. Third-Party Services</h3>
          <p className="text-black">Our website may use third-party services including:</p>
          <ul>
            <li className="text-black"><strong>Google Analytics:</strong> For website analytics (anonymized data)</li>
            <li className="text-black"><strong>Payment Processors:</strong> For secure payment processing</li>
            <li className="text-black"><strong>Email Services:</strong> For newsletter delivery and communications</li>
            <li className="text-black"><strong>Social Media Platforms:</strong> For social sharing features</li>
          </ul>
          <p className="text-black">
            These services have their own privacy policies, and we encourage you to review them.
          </p>

          <h3>6. Data Security</h3>
          <p className="text-black">
            We implement appropriate technical and organizational security measures to protect your 
            personal information against unauthorized access, alteration, disclosure, or destruction. 
            However, no method of transmission over the internet or electronic storage is 100% secure, 
            and we cannot guarantee absolute security.
          </p>

          <h3>7. Data Retention</h3>
          <p className="text-black">
            We retain your personal information only as long as necessary to fulfill the purposes 
            outlined in this Privacy Policy, unless a longer retention period is required or 
            permitted by law. Newsletter subscriptions are retained until you unsubscribe. 
            Purchase records may be retained for tax and legal compliance purposes.
          </p>

          <h3>8. Your Rights and Choices</h3>
          <p className="text-black">You have the following rights regarding your personal information:</p>
          <ul>
            <li className="text-black"><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
            <li className="text-black"><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
            <li className="text-black"><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
            <li className="text-black"><strong>Portability:</strong> Request transfer of your data in a machine-readable format</li>
            <li className="text-black"><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
            <li className="text-black"><strong>Object:</strong> Object to processing based on legitimate interests</li>
          </ul>
          <p className="text-black">
            To exercise these rights, please contact us using the information provided below.
          </p>

          <h3>9. Cookies and Tracking</h3>
          <p className="text-black">
            Our website uses cookies and similar technologies. For detailed information about our 
            use of cookies, please see our <a href="/cookie-policy" className="text-primary hover:text-primary-dark">Cookie Policy</a>.
          </p>

          <h3>10. Children&apos;s Privacy</h3>
          <p className="text-black">
            Our services are not directed to children under 13 years of age. We do not knowingly 
            collect personal information from children under 13. If we become aware that we have 
            collected such information, we will take steps to delete it promptly.
          </p>

          <h3>11. International Data Transfers</h3>
          <p className="text-black">
            Your information may be processed and stored in the United States or other countries 
            where our service providers are located. We ensure appropriate safeguards are in place 
            for international transfers as required by applicable law.
          </p>

          <h3>12. California Privacy Rights (CCPA)</h3>
          <p className="text-black">
            California residents have additional rights under the California Consumer Privacy Act:
          </p>
          <ul>
            <li className="text-black">Right to know what personal information is collected and how it is used</li>
            <li className="text-black">Right to request deletion of personal information</li>
            <li className="text-black">Right to opt-out of the sale of personal information (we do not sell personal information)</li>
            <li className="text-black">Right to non-discrimination for exercising these rights</li>
          </ul>

          <h3>13. Changes to This Privacy Policy</h3>
          <p className="text-black">
            We may update this Privacy Policy from time to time. We will notify you of any material 
            changes by posting the new Privacy Policy on this page and updating the effective date. 
            Your continued use of our services after such changes constitutes acceptance of the 
            updated policy.
          </p>

          <h3>14. Contact Information</h3>
          <p className="text-black">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our 
            data practices, please contact us at:
          </p>
          <p className="text-black">
            <strong>Email:</strong> greg.sollie@gmail.com<br />
            <strong>Subject Line:</strong> Privacy Inquiry<br />
            <strong>Address:</strong> Georgia, United States
          </p>

          <p className="text-black text-sm">
            <strong>Note:</strong> We are committed to addressing privacy concerns promptly and 
            transparently. We will respond to privacy-related inquiries within 30 days.
          </p>
        </div>
      </Section>

      <Section 
        className="bg-gray-50"
        id="privacy-cta"
      >
        <div className="text-center">
          <h2 className="text-primary mb-6">Questions About Our Privacy Practices?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            We believe in transparency and are committed to protecting your privacy. 
            If you have any questions or concerns, please reach out to us.
          </p>
          <Button href="/contact" variant="secondary">
            Contact Us
          </Button>
        </div>
      </Section>
    </>
  );
} 