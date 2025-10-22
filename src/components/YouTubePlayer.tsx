import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface YouTubePlayerProps {
  videoId: string;
  title?: string;
  className?: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ 
  videoId, 
  title = "YouTube Video",
  className = ""
}) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Extract video ID from various YouTube URL formats
  const extractVideoId = (url: string): string => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    return url; // Return as-is if no pattern matches (assume it's already a video ID)
  };

  const actualVideoId = extractVideoId(videoId);

  useEffect(() => {
    // Inject CSS to hide all YouTube UI elements
    const style = document.createElement('style');
    style.id = 'youtube-cleanup-styles';
    style.textContent = `
      /* Hide all YouTube player UI elements */
      .ytp-chrome-top,
      .ytp-chrome-bottom,
      .ytp-show-cards-title,
      .ytp-watermark,
      .ytp-impression-link,
      .ytp-title,
      .ytp-chrome-controls,
      .ytp-progress-bar-container,
      .ytp-time-display,
      .ytp-volume-panel,
      .ytp-settings-button,
      .ytp-fullscreen-button,
      .ytp-miniplayer-button,
      .ytp-size-button,
      .ytp-pause-overlay,
      .ytp-endscreen-content,
      .ytp-cards-teaser,
      .ytp-ce-element,
      .ytp-videowall-still,
      .ytp-suggested-action,
      .ytp-remote,
      .ytp-remote-button,
      .ytp-remote-clipboard-button,
      .ytp-branding,
      .ytp-branding-logo,
      .ytp-branding-text,
      .ytp-branding-icon,
      .ytp-overflow-panel,
      .ytp-popup,
      .ytp-popup-animation,
      .ytp-popup-content,
      .ytp-endscreen-element,
      .ytp-ce-element,
      .ytp-suggested-action,
      .ytp-videowall-still,
      .ytp-cards-teaser,
      .ytp-show-cards-title,
      .ytp-impression-link,
      .ytp-watermark,
      .ytp-chrome-top,
      .ytp-chrome-bottom,
      .ytp-chrome-controls,
      .ytp-progress-bar-container,
      .ytp-time-display,
      .ytp-volume-panel,
      .ytp-settings-button,
      .ytp-fullscreen-button,
      .ytp-miniplayer-button,
      .ytp-size-button,
      .ytp-pause-overlay,
      .ytp-endscreen-content,
      .ytp-cards-teaser,
      .ytp-ce-element,
      .ytp-videowall-still,
      .ytp-suggested-action,
      .ytp-remote,
      .ytp-remote-button,
      .ytp-remote-clipboard-button,
      .ytp-branding,
      .ytp-branding-logo,
      .ytp-branding-text,
      .ytp-branding-icon,
      .ytp-overflow-panel,
      .ytp-popup,
      .ytp-popup-animation,
      .ytp-popup-content {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        height: 0 !important;
        width: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        border: none !important;
        background: none !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
      
      /* Hide any remaining overlays */
      .ytp-overflow-panel,
      .ytp-popup,
      .ytp-popup-animation,
      .ytp-popup-content,
      .ytp-popup-content-container,
      .ytp-popup-content-container:hover,
      .ytp-popup-content:hover,
      .ytp-popup:hover,
      .ytp-popup-animation:hover,
      .ytp-overflow-panel:hover {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      
      /* Ensure video container is clean */
      iframe[src*="youtube.com"] {
        border: none !important;
        outline: none !important;
      }
    `;
    
    // Only add if not already present
    if (!document.getElementById('youtube-cleanup-styles')) {
      document.head.appendChild(style);
    }

    // Load YouTube IFrame API if not already loaded
    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);

      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }

    return () => {
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
      }
    };
  }, [actualVideoId]);

  const initializePlayer = () => {
    if (!playerRef.current || !window.YT) return;

    playerInstanceRef.current = new window.YT.Player(playerRef.current, {
      height: '100%',
      width: '100%',
      videoId: actualVideoId,
      playerVars: {
        controls: 0,           // Hide all controls
        modestbranding: 1,     // Hide YouTube logo
        rel: 0,               // Hide related videos
        showinfo: 0,           // Hide video info
        fs: 0,                // Hide fullscreen button
        cc_load_policy: 0,    // Hide closed captions
        iv_load_policy: 3,    // Hide annotations
        autohide: 1,          // Auto-hide controls
        disablekb: 1,         // Disable keyboard controls
        playsinline: 1,       // Play inline on mobile
        enablejsapi: 1,       // Enable JavaScript API
        origin: window.location.origin
      },
      events: {
        onReady: (event: any) => {
          setIsReady(true);
          setShowControls(true);
          
          // Additional cleanup after player is ready
          setTimeout(() => {
            cleanupYouTubeElements();
          }, 100);
        },
        onStateChange: (event: any) => {
          const state = event.data;
          if (state === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            setShowControls(false);
            // Clean up elements when playing
            setTimeout(() => {
              cleanupYouTubeElements();
            }, 100);
          } else if (state === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
            setShowControls(true);
          } else if (state === window.YT.PlayerState.ENDED) {
            setIsPlaying(false);
            setShowControls(true);
          }
        }
      }
    });
  };

  const cleanupYouTubeElements = () => {
    // Find and hide any remaining YouTube elements
    const elementsToHide = [
      '.ytp-chrome-top',
      '.ytp-chrome-bottom',
      '.ytp-show-cards-title',
      '.ytp-watermark',
      '.ytp-impression-link',
      '.ytp-title',
      '.ytp-chrome-controls',
      '.ytp-progress-bar-container',
      '.ytp-time-display',
      '.ytp-volume-panel',
      '.ytp-settings-button',
      '.ytp-fullscreen-button',
      '.ytp-miniplayer-button',
      '.ytp-size-button',
      '.ytp-pause-overlay',
      '.ytp-endscreen-content',
      '.ytp-cards-teaser',
      '.ytp-ce-element',
      '.ytp-videowall-still',
      '.ytp-suggested-action',
      '.ytp-remote',
      '.ytp-remote-button',
      '.ytp-remote-clipboard-button',
      '.ytp-branding',
      '.ytp-branding-logo',
      '.ytp-branding-text',
      '.ytp-branding-icon',
      '.ytp-overflow-panel',
      '.ytp-popup',
      '.ytp-popup-animation',
      '.ytp-popup-content',
      '.ytp-endscreen-element',
      '.ytp-ce-element',
      '.ytp-suggested-action',
      '.ytp-videowall-still',
      '.ytp-cards-teaser',
      '.ytp-show-cards-title',
      '.ytp-impression-link',
      '.ytp-watermark',
      '.ytp-chrome-top',
      '.ytp-chrome-bottom',
      '.ytp-chrome-controls',
      '.ytp-progress-bar-container',
      '.ytp-time-display',
      '.ytp-volume-panel',
      '.ytp-settings-button',
      '.ytp-fullscreen-button',
      '.ytp-miniplayer-button',
      '.ytp-size-button',
      '.ytp-pause-overlay',
      '.ytp-endscreen-content',
      '.ytp-cards-teaser',
      '.ytp-ce-element',
      '.ytp-videowall-still',
      '.ytp-suggested-action',
      '.ytp-remote',
      '.ytp-remote-button',
      '.ytp-remote-clipboard-button',
      '.ytp-branding',
      '.ytp-branding-logo',
      '.ytp-branding-text',
      '.ytp-branding-icon',
      '.ytp-overflow-panel',
      '.ytp-popup',
      '.ytp-popup-animation',
      '.ytp-popup-content'
    ];

    elementsToHide.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.style.display = 'none';
          element.style.visibility = 'hidden';
          element.style.opacity = '0';
          element.style.pointerEvents = 'none';
          element.style.height = '0';
          element.style.width = '0';
          element.style.margin = '0';
          element.style.padding = '0';
          element.style.border = 'none';
          element.style.background = 'none';
          element.style.position = 'absolute';
          element.style.left = '-9999px';
          element.style.top = '-9999px';
        }
      });
    });
  };

  const togglePlayPause = () => {
    if (!playerInstanceRef.current || !isReady) return;

    if (isPlaying) {
      playerInstanceRef.current.pauseVideo();
    } else {
      playerInstanceRef.current.playVideo();
    }
  };

  const handleMouseEnter = () => {
    if (!isPlaying) {
      setShowControls(true);
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  return (
    <div 
      className={`relative bg-black rounded-lg overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* YouTube Player Container */}
      <div 
        ref={playerRef}
        className="w-full h-full"
        style={{ aspectRatio: '16/9' }}
      />
      
      {/* Custom Play/Pause Button */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={togglePlayPause}
      >
        <button
          className={`
            flex items-center justify-center w-20 h-20 rounded-full 
            bg-black/50 backdrop-blur-sm text-white
            hover:bg-black/70 transition-all duration-200
            transform hover:scale-110 active:scale-95
            ${!isReady ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          disabled={!isReady}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 ml-1" />
          ) : (
            <Play className="w-8 h-8 ml-1" />
          )}
        </button>
      </div>

      {/* Loading Overlay */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center gap-3 text-white">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <p className="text-sm">Loading video...</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default YouTubePlayer;
