/**
 * Google Analytics 4 Event Tracking
 * Tracks user interactions, conversions, and funnel performance
 */

// Type definitions for GA4 events
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Track custom events in GA4
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  } else {
    console.log('GA4 Event:', eventName, eventParams);
  }
};

/**
 * Track button clicks (Buy on Amazon, CTA buttons, etc.)
 */
export const trackButtonClick = (
  buttonName: string,
  buttonLocation: string,
  destinationUrl?: string
) => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: buttonLocation,
    destination_url: destinationUrl,
    page_path: window.location.pathname,
  });
};

/**
 * Track outbound link clicks (Amazon, external sites)
 */
export const trackOutboundLink = (
  linkUrl: string,
  linkText: string,
  linkLocation: string
) => {
  trackEvent('click', {
    event_category: 'outbound_link',
    event_label: linkText,
    link_url: linkUrl,
    link_location: linkLocation,
    page_path: window.location.pathname,
  });
};

/**
 * Track Amazon purchase clicks specifically
 */
export const trackAmazonClick = (
  productName: string,
  buttonLocation: string,
  productPrice?: string
) => {
  // Track as custom event
  trackEvent('amazon_click', {
    product_name: productName,
    button_location: buttonLocation,
    product_price: productPrice,
    page_path: window.location.pathname,
  });

  // Also track as conversion event
  trackEvent('purchase_intent', {
    product_name: productName,
    value: productPrice ? parseFloat(productPrice) : 0,
    currency: 'USD',
  });
};

/**
 * Track newsletter signup
 */
export const trackNewsletterSignup = (
  signupLocation: string,
  leadType: string = 'newsletter'
) => {
  trackEvent('generate_lead', {
    lead_type: leadType,
    signup_location: signupLocation,
    page_path: window.location.pathname,
  });
};

/**
 * Track modal opens
 */
export const trackModalOpen = (modalName: string, trigger: string) => {
  trackEvent('modal_open', {
    modal_name: modalName,
    trigger_element: trigger,
    page_path: window.location.pathname,
  });
};

/**
 * Track form starts (when user begins filling out a form)
 */
export const trackFormStart = (formName: string) => {
  trackEvent('form_start', {
    form_name: formName,
    page_path: window.location.pathname,
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmit = (
  formName: string,
  success: boolean,
  errorMessage?: string
) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
    error_message: errorMessage,
    page_path: window.location.pathname,
  });

  if (success) {
    trackEvent('conversion', {
      conversion_type: 'form_submission',
      form_name: formName,
    });
  }
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll', {
    scroll_depth: percentage,
    page_path: window.location.pathname,
  });
};

/**
 * Track page engagement (time spent)
 */
export const trackEngagement = (timeInSeconds: number) => {
  trackEvent('user_engagement', {
    engagement_time_msec: timeInSeconds * 1000,
    page_path: window.location.pathname,
  });
};

/**
 * Track video plays (for your demo videos)
 */
export const trackVideoPlay = (videoName: string, videoUrl: string) => {
  trackEvent('video_start', {
    video_title: videoName,
    video_url: videoUrl,
    page_path: window.location.pathname,
  });
};

/**
 * Track video completion
 */
export const trackVideoComplete = (videoName: string, watchTime: number) => {
  trackEvent('video_complete', {
    video_title: videoName,
    watch_time_seconds: watchTime,
    page_path: window.location.pathname,
  });
};

/**
 * Track funnel page views
 */
export const trackFunnelPageView = (
  funnelName: string,
  funnelStep: string,
  stepNumber: number
) => {
  trackEvent('funnel_view', {
    funnel_name: funnelName,
    funnel_step: funnelStep,
    step_number: stepNumber,
    page_path: window.location.pathname,
  });
};

/**
 * Track traffic source on page load
 */
export const trackTrafficSource = () => {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  const referrer = document.referrer;

  if (utmSource || utmMedium || utmCampaign || referrer) {
    trackEvent('traffic_source', {
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      referrer: referrer,
      page_path: window.location.pathname,
    });
  }
};

/**
 * Initialize scroll tracking
 */
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  const scrollDepths = [25, 50, 75, 90, 100];
  const trackedDepths = new Set<number>();

  const handleScroll = () => {
    const scrollPercentage = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    scrollDepths.forEach((depth) => {
      if (scrollPercentage >= depth && !trackedDepths.has(depth)) {
        trackedDepths.add(depth);
        trackScrollDepth(depth);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => window.removeEventListener('scroll', handleScroll);
};

/**
 * Initialize engagement time tracking
 */
export const initEngagementTracking = () => {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  let lastEngagementTime = 0;

  const trackEngagementInterval = () => {
    const currentTime = Math.floor((Date.now() - startTime) / 1000);
    
    // Track every 30 seconds
    if (currentTime >= lastEngagementTime + 30) {
      lastEngagementTime = currentTime;
      trackEngagement(currentTime);
    }
  };

  const interval = setInterval(trackEngagementInterval, 30000);

  // Track on page unload
  const handleUnload = () => {
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    trackEngagement(totalTime);
  };

  window.addEventListener('beforeunload', handleUnload);

  return () => {
    clearInterval(interval);
    window.removeEventListener('beforeunload', handleUnload);
  };
};

