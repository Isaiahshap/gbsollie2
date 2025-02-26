import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export default function AJourneyToTheLightPage() {
  return (
    <Section 
      className="bg-primary text-white"
      fullHeight
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">A Journey To The Light</h1>
        <p className="text-xl max-w-2xl mx-auto text-white/90 mb-8">
          Coming soon - The next adventure in the G.B. Sollie collection.
        </p>
        <Button href="/" variant="primary">
          Return Home
        </Button>
      </div>
    </Section>
  );
} 