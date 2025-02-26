import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export default function NewsPage() {
  return (
    <Section 
      className="bg-primary text-white"
      fullHeight
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">News & Updates</h1>
        <p className="text-xl max-w-2xl mx-auto text-white/90 mb-8">
          Coming soon - Stay updated with the latest news, events, and book releases.
        </p>
        <Button href="/" variant="primary">
          Return Home
        </Button>
      </div>
    </Section>
  );
} 