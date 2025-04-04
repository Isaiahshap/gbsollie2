'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';

interface AboutAudioPlayerProps {
  filename: string;
  className?: string;
}

export default function AboutAudioPlayer({ filename, className = '' }: AboutAudioPlayerProps) {
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

  // Construct the full URL for the local audio file
  const audioUrl = `/recordings/${filename}`;

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
  }, [volume]);

  // Handle filename changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(false);
    
    // Check if the filename is valid
    if (!filename || filename === '') {
      console.error('Invalid audio filename:', filename);
      setHasError(true);
      setIsLoading(false);
    }
    
    console.log('Loading audio from:', audioUrl);
  }, [filename, audioUrl]);

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
        src={audioUrl} 
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
            disabled={hasError || isLoading}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50 transition-colors"
            aria-label="Skip 10 seconds forward"
          >
            <SkipForward size={16} />
          </button>
          
          <div className="flex-1 flex items-center gap-2">
            <span className="text-xs text-gray-600 min-w-[40px]">
              {formatTime(currentTime)}
            </span>
            
            <div 
              className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer relative"
              onClick={handleProgressClick}
            >
              {/* Buffered Progress */}
              <div 
                className="absolute h-full bg-gray-300"
                style={{ width: `${buffered}%` }}
              ></div>
              
              {/* Playback Progress */}
              <div 
                className="absolute h-full bg-primary"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <span className="text-xs text-gray-600 min-w-[40px]">
              {formatTime(duration)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-gray-600 hover:text-gray-900"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX size={20} />
              ) : (
                <Volume2 size={20} />
              )}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              aria-label="Volume"
            />
          </div>
        </div>
        
        {/* Error message */}
        {hasError && (
          <div className="text-red-500 text-sm mt-2">
            There was an error loading the audio file. Please try again later.
          </div>
        )}
      </div>
    </div>
  );
} 