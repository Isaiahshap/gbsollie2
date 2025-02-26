import Section from '@/components/ui/Section';

export default function CookiePolicyPage() {
  return (
    <>
      <Section 
        className="bg-primary text-white"
        id="cookie-hero"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">Cookie Policy</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90">
            How we use cookies and similar technologies
          </p>
        </div>
      </Section>

      <Section
        className="bg-white"
        id="cookie-content"
      >
        <div className="prose prose-lg max-w-4xl mx-auto text-black">
          <h2>Cookie Policy</h2>
          <p className="text-black">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <p className="text-black">
            This Cookie Policy explains how G.B. Sollie uses cookies and similar technologies 
            to recognize you when you visit our website. It explains what these technologies are 
            and why we use them, as well as your rights to control our use of them.
          </p>

          <h3>What Are Cookies?</h3>
          <p className="text-black">
            Cookies are small data files that are placed on your computer or mobile device when 
            you visit a website. Cookies are widely used by website owners to make their websites 
            work, or to work more efficiently, as well as to provide reporting information.
          </p>

          <h3>Types of Cookies We Use</h3>
          <p className="text-black">We use the following types of cookies:</p>
          <ul>
            <li className="text-black">
              <strong>Essential cookies:</strong> Necessary for the website to function properly
            </li>
            <li className="text-black">
              <strong>Preference cookies:</strong> Enable the website to remember information that changes the way the website behaves or looks
            </li>
            <li className="text-black">
              <strong>Statistics cookies:</strong> Help us understand how visitors interact with the website
            </li>
            <li className="text-black">
              <strong>Marketing cookies:</strong> Used to track visitors across websites to display relevant advertisements
            </li>
          </ul>

          <h3>Your Choices</h3>
          <p className="text-black">
            Most web browsers allow some control of most cookies through the browser settings. 
            To find out more about cookies, including how to see what cookies have been set, 
            visit <a href="https://www.allaboutcookies.org" className="text-primary hover:text-primary-dark" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
          </p>

          <h3>Contact Us</h3>
          <p className="text-black">
            If you have any questions about our use of cookies, please contact us at contact@gbsollie.com.
          </p>
        </div>
      </Section>
    </>
  );
} 