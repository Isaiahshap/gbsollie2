import Section from '@/components/ui/Section';

export default function TermsOfServicePage() {
  return (
    <>
      <Section 
        className="bg-primary text-white"
        id="terms-hero"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">Terms of Service</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90">
            Guidelines and rules for using our website and services
          </p>
        </div>
      </Section>

      <Section
        className="bg-white"
        id="terms-content"
      >
        <div className="prose prose-lg max-w-4xl mx-auto text-black">
          <h2>Terms of Service</h2>
          <p className="text-black">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <p className="text-black">
            Welcome to G.B. Sollie&apos;s website. By accessing or using this website, you agree to be bound by these Terms of Service.
          </p>

          <h3>Website Use</h3>
          <p className="text-black">
            This website and its content are owned by G.B. Sollie. You may use the website for personal, 
            non-commercial purposes only. You may not modify, copy, distribute, transmit, display, 
            perform, reproduce, publish, license, create derivative works from, transfer, or sell 
            any information or content obtained from this website without written permission.
          </p>

          <h3>Intellectual Property</h3>
          <p className="text-black">
            All content on this website, including text, graphics, logos, images, audio clips, 
            and software, is the property of G.B. Sollie and is protected by copyright laws.
          </p>

          <h3>Links to Other Websites</h3>
          <p className="text-black">
            Our website may contain links to third-party websites. We are not responsible for 
            the content or practices of these websites.
          </p>

          <h3>Changes to Terms</h3>
          <p className="text-black">
            We reserve the right to modify these Terms of Service at any time. Your continued 
            use of the website constitutes acceptance of the updated terms.
          </p>

          <h3>Contact Us</h3>
          <p className="text-black">
            If you have any questions about these Terms of Service, please contact us at contact@gbsollie.com.
          </p>
        </div>
      </Section>
    </>
  );
} 