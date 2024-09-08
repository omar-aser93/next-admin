/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {                        //because we don't have home page, we redirect '/' to '/dashboard
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ];
  },
  images: {                                  //allows images 3rd party uploads
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
  webpack: (config) => {                     //fixes some error message 
    config.resolve.fallback = {
      "mongodb-client-encryption": false ,
      "aws4": false
    };
    return config;
  }
};

module.exports = nextConfig;
