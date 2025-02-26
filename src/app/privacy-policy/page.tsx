import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Section 
        className="bg-primary text-white"
        id="privacy-hero"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">Privacy Policy</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90">
            How we handle and protect your personal information
          </p>
        </div>
      </Section>

      <Section
        className="bg-white"
        id="privacy-content"
      >
        <div className="prose prose-lg max-w-4xl mx-auto text-black">
          <h2>Privacy Policy for G.B. Sollie</h2>
          <p className="text-black">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <p className="text-black">
            Thank you for visiting G.B. Sollie&apos;s website. We are committed to protecting your privacy and 
            providing a safe online experience. This Privacy Policy outlines how we collect, use, and safeguard 
            your personal information.
          </p>

          <h3>Information We Collect</h3>
          <p className="text-black">
            We collect information that you voluntarily provide when subscribing to our newsletter, 
            contacting us, or making purchases. This may include your name, email address, 
            mailing address, and phone number.
          </p>

          <h3>How We Use Your Information</h3>
          <p className="text-black">We use your information to:</p>
          <ul>
            <li className="text-black">Send newsletters and updates about new books and events</li>
            <li className="text-black">Respond to your inquiries</li>
            <li className="text-black">Process and fulfill orders</li>
            <li className="text-black">Improve our website and services</li>
          </ul>

          <h3>Cookie Policy</h3>
          <p className="text-black">
            Our website uses cookies to enhance your browsing experience. For more information, 
            please see our <a href="/cookie-policy" className="text-primary hover:text-primary-dark">Cookie Policy</a>.
          </p>

          <h3>Third-Party Services</h3>
          <p className="text-black">
            We may use third-party services such as payment processors and analytics tools. 
            These services have their own privacy policies.
          </p>

          <h3>Contact Us</h3>
          <p className="text-black">
            If you have any questions about this Privacy Policy, please contact us at contact@gbsollie.com.
          </p>
        </div>
      </Section>

      <Section 
        className="bg-gray-50"
        id="privacy-cta"
      >
        <div className="text-center">
          <h2 className="text-primary mb-6">Questions About Our Privacy Policy?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            If you have any questions or concerns about our privacy practices, please don&apos;t hesitate to contact us.
          </p>
          <Button href="/contact" variant="secondary">
            Contact Us
          </Button>
        </div>
      </Section>
    </>
  );
} 