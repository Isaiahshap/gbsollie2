import Section from '@/components/ui/Section';

export default function TermsOfServicePage() {
  const lastUpdated = "December 21, 2024";
  
  return (
    <>
      <Section 
        className="bg-primary text-white"
        id="terms-hero"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">Terms of Service</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90">
            Legal terms and conditions for using our website and services
          </p>
        </div>
      </Section>

      <Section
        className="bg-white"
        id="terms-content"
      >
        <div className="prose prose-lg max-w-4xl mx-auto text-black">
          <h2>Terms of Service</h2>
          <p className="text-black"><strong>Effective Date:</strong> {lastUpdated}</p>
          
          <p className="text-black">
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website operated by 
            G.B. Sollie (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) located at gbsollie.com and any related services 
            (collectively, the &quot;Service&quot;). By accessing or using our Service, you agree to be bound 
            by these Terms. If you disagree with any part of these terms, then you may not access the Service.
          </p>

          <h3>1. Acceptance of Terms</h3>
          <p className="text-black">
            By accessing and using this website, you accept and agree to be bound by the terms and 
            provision of this agreement. If you do not agree to abide by the above, please do not 
            use this service.
          </p>

          <h3>2. Description of Service</h3>
          <p className="text-black">
            Our Service provides information about G.B. Sollie&apos;s books, author services, and related 
            content. We may also offer book sales, newsletter subscriptions, and contact forms for 
            author visits and speaking engagements.
          </p>

          <h3>3. User Accounts and Registration</h3>
          <p className="text-black">
            When you create an account with us or subscribe to our newsletter, you must provide 
            information that is accurate, complete, and current at all times. You are responsible 
            for safeguarding any passwords or credentials and for all activities that occur under 
            your account.
          </p>

          <h3>4. Acceptable Use</h3>
          <p className="text-black">
            You may use our Service only for lawful purposes and in accordance with these Terms. 
            You agree not to use the Service:
          </p>
          <ul>
            <li className="text-black">To violate any applicable local, state, national, or international law or regulation</li>
            <li className="text-black">To transmit, or procure the sending of, any advertising or promotional material, or any other form of similar solicitation (spam)</li>
            <li className="text-black">To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity</li>
            <li className="text-black">To engage in any other conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Service</li>
          </ul>

          <h3>5. Intellectual Property Rights</h3>
          <p className="text-black">
            The Service and its original content, features, and functionality are and will remain 
            the exclusive property of G.B. Sollie and its licensors. The Service is protected by 
            copyright, trademark, and other laws. Our trademarks and trade dress may not be used 
            in connection with any product or service without our prior written consent.
          </p>

          <h3>6. User-Generated Content</h3>
          <p className="text-black">
            Our Service may allow you to post, link, store, share and otherwise make available 
            certain information, text, graphics, or other material (&quot;Content&quot;). You are responsible 
            for the Content that you post to the Service, including its legality, reliability, and 
            appropriateness. By posting Content to the Service, you grant us the right and license 
            to use, modify, publicly perform, publicly display, reproduce, and distribute such Content.
          </p>

          <h3>7. Privacy Policy</h3>
          <p className="text-black">
            Your privacy is important to us. Please review our Privacy Policy, which also governs 
            your use of the Service, to understand our practices.
          </p>

          <h3>8. Purchases and Payment</h3>
          <p className="text-black">
            If you wish to purchase any product or service made available through the Service, you 
            may be asked to supply certain information relevant to your Purchase including, without 
            limitation, your credit card number, billing address, and shipping information. All 
            information that you provide in connection with a Purchase will be accurate, complete, 
            and current.
          </p>

          <h3>9. Refunds and Returns</h3>
          <p className="text-black">
            Digital products (e-books, audiobooks) are generally non-refundable due to their nature. 
            Physical books may be returned within 30 days of purchase if in original condition. 
            Shipping costs are non-refundable unless the return is due to our error.
          </p>

          <h3>10. Third-Party Links</h3>
          <p className="text-black">
            Our Service may contain links to third-party websites or services that are not owned 
            or controlled by G.B. Sollie. We have no control over, and assume no responsibility for, 
            the content, privacy policies, or practices of any third-party websites or services.
          </p>

          <h3>11. Disclaimers</h3>
          <p className="text-black">
            The information on this website is provided on an &quot;as is&quot; basis. To the fullest extent 
            permitted by law, this Company excludes all representations, warranties, conditions and 
            terms (whether express or implied, whether by statute, common law, custom, usage or 
            otherwise) not expressly set out in these terms and conditions.
          </p>

          <h3>12. Limitation of Liability</h3>
          <p className="text-black">
            In no event shall G.B. Sollie, nor its directors, employees, partners, agents, suppliers, 
            or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
            damages, including without limitation, loss of profits, data, use, goodwill, or other 
            intangible losses, resulting from your use of the Service.
          </p>

          <h3>13. Indemnification</h3>
          <p className="text-black">
            You agree to defend, indemnify, and hold harmless G.B. Sollie and its licensee and 
            licensors, and their employees, contractors, agents, officers and directors, from and 
            against any and all claims, damages, obligations, losses, liabilities, costs or debt, 
            and expenses (including but not limited to attorney&apos;s fees).
          </p>

          <h3>14. Termination</h3>
          <p className="text-black">
            We may terminate or suspend your account immediately, without prior notice or liability, 
            for any reason whatsoever, including without limitation if you breach the Terms. Upon 
            termination, your right to use the Service will cease immediately.
          </p>

          <h3>15. Governing Law</h3>
          <p className="text-black">
            These Terms shall be interpreted and governed by the laws of the State of Georgia, 
            United States, without regard to conflict of law provisions. Our failure to enforce 
            any right or provision of these Terms will not be considered a waiver of those rights.
          </p>

          <h3>16. Changes to Terms</h3>
          <p className="text-black">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any 
            time. If a revision is material, we will try to provide at least 30 days notice prior 
            to any new terms taking effect. What constitutes a material change will be determined 
            at our sole discretion.
          </p>

          <h3>17. Severability</h3>
          <p className="text-black">
            If any provision of these Terms is held to be unenforceable or invalid, such provision 
            will be changed and interpreted to accomplish the objectives of such provision to the 
            greatest extent possible under applicable law and the remaining provisions will continue 
            in full force and effect.
          </p>

          <h3>18. Contact Information</h3>
          <p className="text-black">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <p className="text-black">
            Email: greg.sollie@gmail.com<br />
            Address: Georgia, United States
          </p>

          <p className="text-black text-sm">
            <strong>Note:</strong> These terms of service are designed to protect both our rights 
            and yours. They are legally binding when you use our website or services. Please read 
            them carefully and contact us if you have any questions.
          </p>
        </div>
      </Section>
    </>
  );
} 