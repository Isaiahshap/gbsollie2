'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  className?: string;
}

export default function AudioPlayer({ src, className = '' }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previousVolumeRef = useRef(volume);

  useEffect(() => {
    if (audioRef.current) {
      // Set initial volume
      audioRef.current.volume = volume;

      // Event listeners
      const audio = audioRef.current;
      
      // Update buffered amount
      const updateBuffered = () => {
        if (audio.buffered.length > 0) {
          const bufferedEnd = audio.buffered.end(audio.buffered.length - 1);
          const duration = audio.duration;
          if (duration > 0) {
            setBuffered((bufferedEnd / duration) * 100);
          }
        }
      };

      const onProgress = () => {
        updateBuffered();
      };
      
      const onLoadedMetadata = () => {
        setDuration(audio.duration);
        setIsLoading(false);
      };
      
      const onTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
        const progress = (audio.currentTime / audio.duration) * 100;
        setProgress(progress);
      };
      
      const onEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        audio.currentTime = 0;
      };
      
      const onError = () => {
        setHasError(true);
        setIsLoading(false);
      };
      
      const onCanPlay = () => {
        setIsLoading(false);
      };
      
      const onLoadedData = () => {
        setIsLoading(false);
      };
      
      const onWaiting = () => {
        setIsLoading(true);
      };

      // Add event listeners
      audio.addEventListener('progress', onProgress);
      audio.addEventListener('loadedmetadata', onLoadedMetadata);
      audio.addEventListener('timeupdate', onTimeUpdate);
      audio.addEventListener('ended', onEnded);
      audio.addEventListener('error', onError);
      audio.addEventListener('canplay', onCanPlay);
      audio.addEventListener('loadeddata', onLoadedData);
      audio.addEventListener('waiting', onWaiting);

      // Cleanup function
      return () => {
        audio.removeEventListener('progress', onProgress);
        audio.removeEventListener('loadedmetadata', onLoadedMetadata);
        audio.removeEventListener('timeupdate', onTimeUpdate);
        audio.removeEventListener('ended', onEnded);
        audio.removeEventListener('error', onError);
        audio.removeEventListener('canplay', onCanPlay);
        audio.removeEventListener('loadeddata', onLoadedData);
        audio.removeEventListener('waiting', onWaiting);
      };
    }
  }, [src, volume]);

  // Handle src changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(false);
    
    // Check if the source URL is valid
    if (!src || src === '') {
      console.error('Invalid audio source URL:', src);
      setHasError(true);
      setIsLoading(false);
      return;
    } 
    
    console.log('Loading audio from:', src);
    
    // Check if URL is actually valid
    try {
      new URL(src);
    } catch {
      console.error('Invalid URL format:', src);
      setHasError(true);
      setIsLoading(false);
    }
  }, [src]);

  const togglePlayPause = () => {
    if (!audioRef.current || hasError) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true); // Set loading state when starting to play
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false); // Clear loading state on successful play
        })
        .catch(err => {
          console.error('Error playing audio:', err);
          setHasError(true);
          setIsLoading(false);
        });
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || hasError) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const newTime = (percentage / 100) * duration;
    
    audioRef.current.currentTime = newTime;
    setProgress(percentage);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = previousVolumeRef.current;
      setVolume(previousVolumeRef.current);
    } else {
      previousVolumeRef.current = volume;
      audioRef.current.volume = 0;
      setVolume(0);
    }
    
    setIsMuted(!isMuted);
  };

  const skipBackward = () => {
    if (!audioRef.current) return;
    const newTime = Math.max(0, currentTime - 10);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const skipForward = () => {
    if (!audioRef.current) return;
    const newTime = Math.min(duration, currentTime + 10);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <audio 
        ref={audioRef} 
        src={src} 
        preload="auto" 
        onLoadStart={() => setIsLoading(true)}
        onCanPlayThrough={() => setIsLoading(false)}
      />
      
      <div className="flex flex-col space-y-3">
        {/* Main Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={skipBackward}
            disabled={hasError || isLoading}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50 transition-colors"
            aria-label="Skip 10 seconds backward"
          >
            <SkipBack size={16} />
          </button>
          
          <button
            onClick={togglePlayPause}
            disabled={isLoading || hasError}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${
              hasError ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 
              'bg-primary text-white hover:bg-primary/90'
            }`}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            ) : isPlaying ? (
              <Pause size={22} />
            ) : (
              <Play size={22} className="ml-1" />
            )}
          </button>
          
          <button
            onClick={skipForward}
            disabled={hasError}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50 transition-colors"
            aria-label="Skip 10 seconds forward"
          >
            <SkipForward size={16} />
          </button>
          
          <div className="flex-1 ml-2">
            <div 
              className={`h-2 bg-gray-200 rounded-full cursor-pointer relative overflow-hidden ${hasError ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={hasError ? undefined : handleProgressClick}
            >
              {/* Buffered progress */}
              <div 
                className="absolute top-0 left-0 h-full bg-gray-300 transition-all duration-100"
                style={{ width: `${buffered}%` }}
              />
              {/* Playback progress */}
              <div 
                className="absolute top-0 left-0 h-full bg-primary transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="flex justify-between text-xs mt-1 text-gray-600">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Volume Control */}
          <div className="hidden sm:flex items-center space-x-2">
            <button 
              onClick={toggleMute} 
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX size={18} />
              ) : (
                <Volume2 size={18} />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-gray-300 rounded-lg appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
          </div>
        </div>
      </div>
      
      {hasError && (
        <div className="mt-2 text-sm text-red-500">
          Error loading audio. Please check the file and try again.
        </div>
      )}
    </div>
  );
} 