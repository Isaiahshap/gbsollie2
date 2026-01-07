const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.co',
      },
      {
        protocol: 'https',
        hostname: 'yeshayas.sg-host.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googletagmanager.com https://ssl.google-analytics.com https://connect.facebook.net https://googleads.g.doubleclick.net https://www.google.com https://www.googleadservices.com",
              "connect-src 'self' https://yeshayas.sg-host.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://googletagmanager.com https://ssl.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://connect.facebook.net https://www.facebook.com https://www.google.com https://googleads.g.doubleclick.net https://www.googleadservices.com",
              "img-src 'self' data: https: https://www.google-analytics.com https://www.googletagmanager.com https://ssl.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com https://yeshayas.sg-host.com https://www.facebook.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "media-src 'self' https://yeshayas.sg-host.com",
              "frame-src 'self' https://a.co https://docs.google.com https://www.youtube.com https://youtube.com https://www.googletagmanager.com https://www.facebook.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://www.facebook.com"
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
