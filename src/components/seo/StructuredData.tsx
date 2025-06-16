'use client';

import { usePathname } from 'next/navigation';

interface StructuredDataProps {
  type?: 'homepage' | 'book' | 'about' | 'contact';
  bookData?: {
    title: string;
    description: string;
    isbn?: string;
    image: string;
    datePublished?: string;
    genre: string[];
  };
}

export default function StructuredData({ type = 'homepage', bookData }: StructuredDataProps) {
  const pathname = usePathname();

  const authorData = {
    "@type": "Person",
    "@id": "https://gbsollie.com/#author",
    "name": "G.B. Sollie",
    "alternateName": "Gregory B. Sollie",
    "jobTitle": "Children's Author",
    "description": "Award-winning Christian children's book author specializing in fantasy adventure stories that strengthen faith and spark imagination for young readers ages 9-13.",
    "url": "https://gbsollie.com",
    "image": "https://gbsollie.com/images/author/gb-sollie.jpg",
    "sameAs": [
      "https://www.amazon.com/author/gbsollie",
      "https://www.goodreads.com/author/gbsollie"
    ],
    "knowsAbout": [
      "Children's Literature",
      "Christian Fiction",
      "Fantasy Writing",
      "Youth Ministry",
      "Character Development",
      "Faith-Based Storytelling"
    ],
    "award": [
      "Best Christian Children's Book 2023",
      "Rising Author Award"
    ],
    "birthPlace": "Georgia, United States",
    "nationality": "American",
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Author",
      "occupationLocation": {
        "@type": "Place",
        "name": "Georgia, United States"
      }
    }
  };

  const organizationData = {
    "@type": "Organization",
    "@id": "https://gbsollie.com/#organization",
    "name": "G.B. Sollie Books",
    "url": "https://gbsollie.com",
    "logo": "https://gbsollie.com/images/logo.png",
    "description": "Publisher of the best Christian books for kids, featuring the enchanting Cat Luker series and other faith-based children's literature.",
    "founder": {
      "@id": "https://gbsollie.com/#author"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "greg.sollie@gmail.com",
      "contactType": "Author Inquiries",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Georgia",
      "addressCountry": "United States"
    }
  };

  const websiteData = {
    "@type": "WebSite",
    "@id": "https://gbsollie.com/#website",
    "url": "https://gbsollie.com",
    "name": "G.B. Sollie - Best Christian Books for Kids",
    "description": "Discover the best Christian books for kids by G.B. Sollie. Enchanting fantasy adventures that strengthen faith and spark imagination for children ages 9-13.",
    "inLanguage": "en-US",
    "publisher": {
      "@id": "https://gbsollie.com/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://gbsollie.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const structuredData: Record<string, any> = {
    "@context": "https://schema.org",
    "@graph": [authorData, organizationData, websiteData]
  };

  // Add specific structured data based on page type
  switch (type) {
    case 'homepage':
      structuredData["@graph"].push({
        "@type": "WebPage",
        "@id": "https://gbsollie.com/#webpage",
        "url": "https://gbsollie.com",
        "name": "G.B. Sollie | Best Christian Books for Kids | Children's Fantasy Author",
        "description": "Discover the best Christian books for kids by G.B. Sollie. Enchanting fantasy adventures that strengthen faith and spark imagination for children ages 9-13.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "WebPage",
              "@id": "https://gbsollie.com",
              "name": "Home"
            }
          }]
        },
        "mainEntity": {
          "@id": "https://gbsollie.com/#author"
        }
      });
      break;

    case 'book':
      if (bookData) {
        structuredData["@graph"].push({
          "@type": "Book",
          "name": bookData.title,
          "description": bookData.description,
          "author": {
            "@id": "https://gbsollie.com/#author"
          },
          "publisher": {
            "@id": "https://gbsollie.com/#organization"
          },
          "image": bookData.image,
          "genre": bookData.genre,
          "inLanguage": "en-US",
          "bookFormat": "https://schema.org/Paperback",
          "isbn": bookData.isbn,
          "datePublished": bookData.datePublished,
          "audience": {
            "@type": "Audience",
            "audienceType": "Children",
            "suggestedMinAge": 9,
            "suggestedMaxAge": 13
          },
          "keywords": [
            "Christian children's books",
            "fantasy adventure",
            "faith-based literature",
            "middle grade fiction"
          ]
        });
      }
      break;

    case 'about':
      structuredData["@graph"].push({
        "@type": "AboutPage",
        "@id": `https://gbsollie.com${pathname}#webpage`,
        "url": `https://gbsollie.com${pathname}`,
        "name": "About G.B. Sollie - Christian Children's Book Author",
        "description": "Learn about G.B. Sollie, award-winning author of the best Christian books for kids, including the popular Cat Luker fantasy series.",
        "mainEntity": {
          "@id": "https://gbsollie.com/#author"
        }
      });
      break;

    case 'contact':
      structuredData["@graph"].push({
        "@type": "ContactPage",
        "@id": `https://gbsollie.com${pathname}#webpage`,
        "url": `https://gbsollie.com${pathname}`,
        "name": "Contact G.B. Sollie - Author Visits & Inquiries",
        "description": "Contact G.B. Sollie for author visits, book inquiries, speaking engagements, and general questions about his Christian children's books."
      });
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
} 