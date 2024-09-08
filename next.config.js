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
  images: {                                  //allows cloudinary as 3rd party
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
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
