'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  className?: string;
}

export default function AudioPlayer({ src, className = '' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });

      audioRef.current.addEventListener('timeupdate', () => {
        const progress = (audioRef.current?.currentTime || 0) / (audioRef.current?.duration || 1) * 100;
        setProgress(progress);
      });

      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setProgress(0);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
        }
      });
    }
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      const newTime = (percentage / 100) * (audioRef.current.duration || 0);
      audioRef.current.currentTime = newTime;
      setProgress(percentage);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <audio ref={audioRef} src={src} preload="metadata" />
      
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlayPause}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        
        <div className="flex-1">
          <div 
            className="h-2 bg-gray-200 rounded-full cursor-pointer relative overflow-hidden"
            onClick={handleProgressClick}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm mt-1 text-gray-600">
            <span>{formatTime((progress / 100) * duration)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 