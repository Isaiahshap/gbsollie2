import Section from '@/components/ui/Section';

export default function AccessibilityPage() {
  const lastUpdated = "June 16, 2025";

  return (
    <>
      <Section 
        className="bg-primary text-white"
        id="accessibility-hero"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">Accessibility Statement</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90">
            Our commitment to improving digital accessibility over time
          </p>
        </div>
      </Section>

      <Section
        className="bg-white"
        id="accessibility-content"
      >
        <div className="prose prose-lg max-w-4xl mx-auto text-black">
          <h2>Accessibility Statement for G.B. Sollie</h2>
          <p className="text-black"><strong>Effective Date:</strong> {lastUpdated}</p>
          
          <p className="text-black">
            G.B. Sollie is committed to improving digital accessibility for people with disabilities. 
            We recognize that our website is currently not fully accessible and we are working to 
            improve the experience for all users over time.
          </p>

          <h3>1. Our Current Status</h3>
          <p className="text-black">
            We are honest about where we stand: our website does not currently meet WCAG 2.1 
            Level AA standards. We are in the early stages of improving accessibility and are 
            committed to making gradual, meaningful improvements.
          </p>

          <h3>2. Current Accessibility Features</h3>
          <p className="text-black">
            Our website currently includes some basic accessibility features:
          </p>
          
          <ul>
            <li className="text-black">Basic focus indicators on form fields</li>
            <li className="text-black">Some alternative text on images</li>
            <li className="text-black">Responsive design that works on mobile devices</li>
            <li className="text-black">Basic semantic HTML structure with headings</li>
            <li className="text-black">Keyboard-accessible form elements</li>
          </ul>

          <h3>3. Known Accessibility Issues</h3>
          <p className="text-black">
            We acknowledge the following accessibility limitations that we are working to address:
          </p>
          <ul>
            <li className="text-black">Insufficient color contrast in some areas</li>
            <li className="text-black">Missing or incomplete alternative text on some images</li>
            <li className="text-black">Limited keyboard navigation support</li>
            <li className="text-black">No skip links to main content</li>
            <li className="text-black">Some animations cannot be paused or disabled</li>
            <li className="text-black">Interactive elements may not all be properly labeled</li>
            <li className="text-black">Content has not been tested with screen readers</li>
          </ul>

          <h3>4. Our Improvement Plan</h3>
          <p className="text-black">
            We are committed to making accessibility improvements over time. Our planned improvements include:
          </p>
          <ul>
            <li className="text-black">Conducting professional accessibility audits</li>
            <li className="text-black">Improving color contrast throughout the site</li>
            <li className="text-black">Adding comprehensive alternative text to all images</li>
            <li className="text-black">Implementing proper skip links</li>
            <li className="text-black">Testing with screen readers and assistive technologies</li>
            <li className="text-black">Training our team on accessibility best practices</li>
          </ul>

          <h3>5. Third-Party Content</h3>
          <p className="text-black">
            Some content on our website is provided by third parties (Google Forms, social media widgets, etc.). 
            We cannot guarantee the accessibility of third-party content, but we work to choose 
            more accessible options when possible.
          </p>

          <h3>6. Books and Content</h3>
          <p className="text-black">
            We are working to make our content more accessible:
          </p>

          <h4>Audio Books</h4>
          <p className="text-black">
            We offer audio versions of our books to provide an alternative format for those 
            who may have difficulty reading text.
          </p>

          <h4>Digital Formats</h4>
          <ul>
            <li className="text-black">E-books are available in standard formats</li>
            <li className="text-black">We are working to ensure better compatibility with assistive technologies</li>
          </ul>

          <h3>7. Getting Help</h3>
          <p className="text-black">
            If you are having difficulty accessing any content on our website or need assistance 
            with any of our digital offerings, please contact us. We are committed to providing 
            the information you need in an alternative format.
          </p>

          <h3>8. Feedback and Contact</h3>
          <p className="text-black">
            We welcome your feedback about accessibility barriers you encounter. Your input 
            helps us prioritize improvements. Please contact us at:
          </p>
          <ul>
            <li className="text-black"><strong>Email:</strong> greg.sollie@gmail.com</li>
            <li className="text-black"><strong>Subject Line:</strong> Accessibility Feedback</li>
            <li className="text-black"><strong>Address:</strong> Georgia, United States</li>
          </ul>

          <p className="text-black">
            When reporting accessibility issues, please include:
          </p>
          <ul>
            <li className="text-black">The specific page or feature causing difficulty</li>
            <li className="text-black">The assistive technology you are using (if any)</li>
            <li className="text-black">A description of the problem you encountered</li>
          </ul>

          <h3>9. Response Timeline</h3>
          <p className="text-black">
            We will respond to accessibility feedback within 5 business days. While we work 
            on long-term improvements, we will do our best to provide alternative ways to 
            access the information you need.
          </p>

          <h3>10. Standards and Guidelines</h3>
          <p className="text-black">
            We are working toward conformance with the Web Content Accessibility Guidelines (WCAG) 2.1 
            Level AA standards. We understand this is an ongoing process and are committed to 
            making steady progress.
          </p>

          <h3>11. Legal Compliance</h3>
          <p className="text-black">
            We strive to comply with applicable accessibility laws, including the Americans with 
            Disabilities Act (ADA). We recognize that accessibility is both a legal requirement 
            and the right thing to do.
          </p>

          <p className="text-black text-sm">
            <strong>Note:</strong> This accessibility statement reflects our current status 
            and genuine commitment to improvement. We believe in transparency about our current 
            limitations while working steadily toward better accessibility for all users.
          </p>
        </div>
      </Section>
    </>
  );
} 