/**
 * Meta (Facebook) Pixel Event Tracking
 * For retargeting campaigns on Facebook & Instagram
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

/**
 * Track custom events in Meta Pixel
 */
export const trackMetaEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, eventParams);
  } else {
    console.log('Meta Pixel Event:', eventName, eventParams);
  }
};

/**
 * Track custom events (for retargeting)
 */
export const trackMetaCustomEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, eventParams);
  }
};

/**
 * Track page views
 */
export const trackMetaPageView = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

/**
 * Track when someone views a product (book page)
 */
export const trackMetaViewContent = (
  contentName: string,
  contentCategory: string,
  value?: number
) => {
  trackMetaEvent('ViewContent', {
    content_name: contentName,
    content_category: contentCategory,
    content_type: 'product',
    value: value || 0,
    currency: 'USD',
  });
};

/**
 * Track when someone clicks to Amazon (purchase intent)
 * This is crucial for retargeting people who showed purchase intent
 */
export const trackMetaAmazonClick = (
  productName: string,
  buttonLocation: string,
  value: number = 15.99
) => {
  // Track as InitiateCheckout - Meta's standard event for purchase intent
  trackMetaEvent('InitiateCheckout', {
    content_name: productName,
    content_category: 'Book',
    content_type: 'product',
    value: value,
    currency: 'USD',
    button_location: buttonLocation,
  });

  // Also track as custom event for granular retargeting
  trackMetaCustomEvent('AmazonClick', {
    product_name: productName,
    button_location: buttonLocation,
    page_path: window.location.pathname,
  });
};

/**
 * Track newsletter signups (Lead event)
 */
export const trackMetaLead = (
  leadType: string,
  signupLocation: string
) => {
  trackMetaEvent('Lead', {
    lead_type: leadType,
    signup_location: signupLocation,
    content_name: 'Newsletter Signup',
    value: 1.00, // Assign value to leads for optimization
    currency: 'USD',
  });
};

/**
 * Track form starts (for retargeting people who started but didn't finish)
 */
export const trackMetaFormStart = (formName: string) => {
  trackMetaCustomEvent('FormStart', {
    form_name: formName,
    page_path: window.location.pathname,
  });
};

/**
 * Track modal opens (for retargeting engaged users)
 */
export const trackMetaModalOpen = (modalName: string, trigger: string) => {
  trackMetaCustomEvent('ModalOpen', {
    modal_name: modalName,
    trigger_element: trigger,
    page_path: window.location.pathname,
  });
};

/**
 * Track funnel page views for retargeting specific audiences
 */
export const trackMetaFunnelView = (
  funnelName: string,
  funnelStep: string
) => {
  trackMetaCustomEvent('FunnelView', {
    funnel_name: funnelName,
    funnel_step: funnelStep,
    page_path: window.location.pathname,
  });

  // Also track as ViewContent for broader retargeting
  trackMetaViewContent(funnelName, 'Funnel Page');
};

/**
 * Track scroll depth for engagement-based retargeting
 */
export const trackMetaScrollDepth = (percentage: number) => {
  // Only track significant milestones
  if (percentage >= 75) {
    trackMetaCustomEvent('DeepEngagement', {
      scroll_percentage: percentage,
      page_path: window.location.pathname,
    });
  }
};

