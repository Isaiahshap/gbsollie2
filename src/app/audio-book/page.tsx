import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export default function AudioBookPage() {
  return (
    <Section 
      className="bg-primary text-white"
      fullHeight
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">Audio Book</h1>
        <p className="text-xl max-w-2xl mx-auto text-white/90 mb-8">
          Coming soon - Listen to the adventures narrated by G.B. Sollie himself.
        </p>
        <Button href="/" variant="primary">
          Return Home
        </Button>
      </div>
    </Section>
  );
} 