import Section from '@/components/ui/Section';

export default function CookiePolicyPage() {
  const lastUpdated = "December 21, 2024";

  return (
    <>
      <Section 
        className="bg-primary text-white"
        id="cookie-hero"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">Cookie Policy</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90">
            How we use cookies and similar tracking technologies
          </p>
        </div>
      </Section>

      <Section
        className="bg-white"
        id="cookie-content"
      >
        <div className="prose prose-lg max-w-4xl mx-auto text-black">
          <h2>Cookie Policy</h2>
          <p className="text-black"><strong>Effective Date:</strong> {lastUpdated}</p>
          
          <p className="text-black">
            This Cookie Policy explains how G.B. Sollie uses cookies and similar technologies 
            when you visit our website gbsollie.com. It explains what these technologies are, 
            why we use them, and your rights to control our use of them.
          </p>

          <h3>1. What Are Cookies?</h3>
          <p className="text-black">
            Cookies are small text files that are placed on your computer or mobile device when 
            you visit a website. They are widely used to make websites work more efficiently 
            and to provide information to website owners about how visitors use their sites.
          </p>

          <h3>2. Types of Cookies We Use</h3>
          
          <h4>Essential Cookies (Strictly Necessary)</h4>
          <p className="text-black">
            These cookies are necessary for the website to function properly and cannot be 
            switched off in our systems. They are usually only set in response to actions 
            made by you which amount to a request for services.
          </p>
          <ul>
            <li className="text-black">Session management cookies</li>
            <li className="text-black">Security cookies</li>
            <li className="text-black">Load balancing cookies</li>
          </ul>

          <h4>Preference Cookies (Functional)</h4>
          <p className="text-black">
            These cookies enable the website to provide enhanced functionality and personalization. 
            They may be set by us or by third-party providers whose services we have added to our pages.
          </p>
          <ul>
            <li className="text-black">Language preferences</li>
            <li className="text-black">Region selection</li>
            <li className="text-black">User interface customization</li>
          </ul>

          <h4>Analytics Cookies (Performance)</h4>
          <p className="text-black">
            These cookies allow us to count visits and traffic sources so we can measure and 
            improve the performance of our site. They help us understand which pages are most 
            and least popular and see how visitors move around the site.
          </p>
          <ul>
            <li className="text-black">Google Analytics (if implemented)</li>
            <li className="text-black">Page view tracking</li>
            <li className="text-black">User behavior analytics</li>
          </ul>

          <h4>Marketing Cookies (Targeting)</h4>
          <p className="text-black">
            These cookies may be set through our site by our advertising partners. They may be 
            used by those companies to build a profile of your interests and show you relevant 
            adverts on other sites.
          </p>
          <ul>
            <li className="text-black">Social media sharing buttons</li>
            <li className="text-black">Third-party advertising cookies</li>
            <li className="text-black">Retargeting cookies</li>
          </ul>

          <h3>3. Third-Party Cookies</h3>
          <p className="text-black">
            We may use third-party services that place cookies on your device. These include:
          </p>
          <ul>
            <li className="text-black"><strong>Google Analytics:</strong> For website analytics and performance measurement</li>
            <li className="text-black"><strong>Social Media Platforms:</strong> For social sharing functionality</li>
            <li className="text-black"><strong>Payment Processors:</strong> For secure payment processing</li>
            <li className="text-black"><strong>Email Services:</strong> For newsletter and communication services</li>
          </ul>

          <h3>4. Cookie Duration</h3>
          <p className="text-black">Cookies can be classified by duration:</p>
          <ul>
            <li className="text-black"><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
            <li className="text-black"><strong>Persistent Cookies:</strong> Remain on your device for a set period or until manually deleted</li>
          </ul>

          <h3>5. Your Cookie Choices and Rights</h3>
          <p className="text-black">
            You have several options for managing cookies:
          </p>

          <h4>Browser Settings</h4>
          <p className="text-black">
            Most web browsers allow you to control cookies through their settings. You can:
          </p>
          <ul>
            <li className="text-black">Block all cookies</li>
            <li className="text-black">Block third-party cookies</li>
            <li className="text-black">Delete existing cookies</li>
            <li className="text-black">Get notified when cookies are set</li>
          </ul>

          <h4>Opt-Out Tools</h4>
          <p className="text-black">
            You can opt out of certain cookies using these tools:
          </p>
          <ul>
            <li className="text-black">Google Analytics Opt-out: <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:text-primary-dark" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
            <li className="text-black">Network Advertising Initiative: <a href="https://www.networkadvertising.org/choices/" className="text-primary hover:text-primary-dark" target="_blank" rel="noopener noreferrer">NAI Opt-out</a></li>
            <li className="text-black">Digital Advertising Alliance: <a href="https://www.aboutads.info/choices/" className="text-primary hover:text-primary-dark" target="_blank" rel="noopener noreferrer">DAA Opt-out</a></li>
          </ul>

          <h3>6. Impact of Disabling Cookies</h3>
          <p className="text-black">
            Please note that disabling cookies may affect the functionality of our website:
          </p>
          <ul>
            <li className="text-black">Some features may not work properly</li>
            <li className="text-black">User preferences may not be saved</li>
            <li className="text-black">You may see less relevant content</li>
            <li className="text-black">Website performance may be impacted</li>
          </ul>

          <h3>7. Mobile Device Identifiers</h3>
          <p className="text-black">
            When you use our website on a mobile device, we may collect and use advertising 
            identifiers (such as Apple&apos;s IDFA or Google&apos;s Advertising ID) for similar purposes 
            as cookies on computers.
          </p>

          <h3>8. Updates to This Cookie Policy</h3>
          <p className="text-black">
            We may update this Cookie Policy from time to time to reflect changes in our 
            practices or for other operational, legal, or regulatory reasons. We will post 
            the updated policy on this page with a new effective date.
          </p>

          <h3>9. More Information About Cookies</h3>
          <p className="text-black">
            To learn more about cookies and how they work, visit:
          </p>
          <ul>
            <li className="text-black"><a href="https://www.allaboutcookies.org" className="text-primary hover:text-primary-dark" target="_blank" rel="noopener noreferrer">All About Cookies</a></li>
            <li className="text-black"><a href="https://cookiepedia.co.uk" className="text-primary hover:text-primary-dark" target="_blank" rel="noopener noreferrer">Cookiepedia</a></li>
            <li className="text-black"><a href="https://www.youronlinechoices.com" className="text-primary hover:text-primary-dark" target="_blank" rel="noopener noreferrer">Your Online Choices</a></li>
          </ul>

          <h3>10. Contact Us</h3>
          <p className="text-black">
            If you have any questions about our use of cookies or this Cookie Policy, 
            please contact us at:
          </p>
          <p className="text-black">
            <strong>Email:</strong> greg.sollie@gmail.com<br />
            <strong>Subject Line:</strong> Cookie Policy Inquiry<br />
            <strong>Address:</strong> Georgia, United States
          </p>

          <p className="text-black text-sm">
            <strong>Note:</strong> This policy is designed to comply with GDPR, CCPA, and other 
            applicable privacy regulations. We are committed to transparency about our use of 
            tracking technologies.
          </p>
        </div>
      </Section>
    </>
  );
} 