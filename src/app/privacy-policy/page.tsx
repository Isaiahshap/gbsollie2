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
          <h1 className="text-4xl md:text-5xl font-display mb-6">Privacy Policy</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90">
            How we collect, use, and protect your information
          </p>
        </div>
      </Section>

      <Section 
        className="bg-white"
        id="privacy-content"
      >
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="lead text-xl">
            Last Updated: August 1, 2023
          </p>
          
          <h2>Introduction</h2>
          <p>
            G.B. Sollie (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting it through our compliance with this policy. This Privacy Policy describes the types of information we may collect from you or that you may provide when you visit our website (gbsollie.com) and our practices for collecting, using, maintaining, protecting, and disclosing that information.
          </p>
          
          <h2>Information We Collect</h2>
          <p>
            We may collect several types of information from and about users of our website, including:
          </p>
          <ul>
            <li>Personal information (such as your name, email address, mailing address, and phone number) that you voluntarily provide to us when subscribing to our newsletter, filling out contact forms, or ordering products</li>
            <li>Information about your internet connection, the equipment you use to access our website, and usage details</li>
            <li>Non-personal information about your interactions with our website, collected through cookies and similar technologies</li>
          </ul>
          
          <h2>How We Use Your Information</h2>
          <p>
            We use information that we collect about you or that you provide to us:
          </p>
          <ul>
            <li>To present our website and its contents to you</li>
            <li>To provide you with information, products, or services that you request from us</li>
            <li>To fulfill any other purpose for which you provide it</li>
            <li>To send you newsletters and updates about new books, events, and other information</li>
            <li>To improve our website and present its contents to you</li>
            <li>For any other purpose with your consent</li>
          </ul>
          
          <h2>Disclosure of Your Information</h2>
          <p>
            We may disclose personal information that we collect or you provide as described in this privacy policy:
          </p>
          <ul>
            <li>To contractors, service providers, and other third parties we use to support our business</li>
            <li>To comply with any court order, law, or legal process</li>
            <li>To protect the rights, property, or safety of G.B. Sollie, our customers, or others</li>
          </ul>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except as described above.
          </p>
          
          <h2>Data Security</h2>
          <p>
            We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. However, the transmission of information via the internet is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted to our website.
          </p>
          
          <h2>Children&apos;s Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are under 13, do not provide any information on this website or through any of its features.
          </p>
          
          <h2>Changes to Our Privacy Policy</h2>
          <p>
            We may update our privacy policy from time to time. If we make material changes to how we treat our users&apos; personal information, we will post the new privacy policy on this page with a notice that the privacy policy has been updated.
          </p>
          
          <h2>Contact Information</h2>
          <p>
            To ask questions or comment about this privacy policy and our privacy practices, contact us at:
          </p>
          <p>
            <strong>Email:</strong> privacy@gbsollie.com<br />
            <strong>Address:</strong> G.B. Sollie, P.O. Box 12345, Birmingham, AL 35201
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