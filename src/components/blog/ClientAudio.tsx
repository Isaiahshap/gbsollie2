'use client';

import { useState, useEffect } from 'react';
import AudioPlayer from '@/components/ui/AudioPlayer';

interface ClientAudioProps {
  audioUrl: string;
}

export default function ClientAudio({ audioUrl }: ClientAudioProps) {
  const [isClient, setIsClient] = useState(false);
  
  // Prevent hydration mismatch by only rendering on client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return <div className="h-12 bg-gray-100 rounded animate-pulse"></div>;
  }
  
  return (
    <AudioPlayer 
      src={audioUrl} 
      className="rounded-lg bg-gray-50 p-2" 
    />
  );
} 