import Section from '@/components/ui/Section';

export default function AccessibilityPage() {
  return (
    <>
      <Section 
        className="bg-primary text-white"
        id="accessibility-hero"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">Accessibility</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90">
            Our commitment to making content accessible to all users
          </p>
        </div>
      </Section>

      <Section
        className="bg-white"
        id="accessibility-content"
      >
        <div className="prose prose-lg max-w-4xl mx-auto text-black">
          <h2>Accessibility Statement</h2>
          <p className="text-black">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <p className="text-black">
            G.B. Sollie is committed to making our website accessible to all visitors, 
            including those with disabilities. We are continuously working to improve 
            the accessibility and usability of our website.
          </p>

          <h3>Our Efforts</h3>
          <p className="text-black">
            We strive to conform to level AA of the World Wide Web Consortium (W3C) 
            Web Content Accessibility Guidelines 2.1. These guidelines help make web 
            content more accessible to people with disabilities.
          </p>

          <h3>Accessibility Features</h3>
          <p className="text-black">Our website includes the following accessibility features:</p>
          <ul>
            <li className="text-black">Text alternatives for non-text content</li>
            <li className="text-black">Keyboard accessibility</li>
            <li className="text-black">Clear headings and labels</li>
            <li className="text-black">Sufficient color contrast</li>
            <li className="text-black">Resizable text</li>
          </ul>

          <h3>Feedback</h3>
          <p className="text-black">
            We welcome your feedback on the accessibility of our website. Please let us know 
            if you encounter accessibility barriers by emailing us at contact@gbsollie.com.
          </p>

          <h3>Audio Books</h3>
          <p className="text-black">
            We are proud to offer audio versions of our books to make our stories accessible 
            to those with visual impairments or reading difficulties.
          </p>
        </div>
      </Section>
    </>
  );
} 