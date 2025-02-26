import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function BooksPage() {
  return (
    <>
      <Section 
        className="bg-primary text-white"
        id="books-hero"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">Explore My Books</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90">
            Embark on magical adventures through the pages of G.B. Sollie&apos;s captivating stories for young readers.
          </p>
        </div>
      </Section>
      
      <Section
        className="bg-white"
        id="book-list"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Link href="/cat-luker-dark-clock" className="group">
            <div className="rounded-whimsical bg-gray-50 p-6 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-all duration-300">
              <div className="w-full md:w-1/3 flex-shrink-0">
                <div className="relative w-full aspect-[2/3] rounded-whimsical overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Image 
                    src="/images/book-cover.jpg" 
                    alt="Cat Luker: The Swamp Witch Chronicles" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl text-primary font-bold mb-3 group-hover:text-accent transition-colors">Cat Luker: The Swamp Witch Chronicles</h3>
                <p className="text-gray-700 mb-4">
                  Set in 1930s rural Alabama during the Great Depression, this compelling tale follows three young friends as they band together to confront the mysterious Swamp Witch.
                </p>
                <div className="text-accent font-medium group-hover:underline">
                  Read more →
                </div>
              </div>
            </div>
          </Link>
          
          <div className="rounded-whimsical bg-gray-50 p-6 flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl text-primary font-bold mb-3">More Books Coming Soon</h3>
            <p className="text-gray-700 mb-4">
              Stay tuned for more exciting adventures from G.B. Sollie.
            </p>
            <Button href="/contact">
              Join the Newsletter
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
} 