/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react"],
  async redirects() {
    return [
      {
        source: "/ecommerce-management",
        destination: "/services/ecommerce",
        permanent: true,
      },
      {
        source: "/amazon-account-management",
        destination: "/services/amazon-account-management",
        permanent: true,
      },
      {
        source: "/flipkart-account-management",
        destination: "/services/flipkart-account-management",
        permanent: true,
      },
      {
        source: "/amazon-ppc-management",
        destination: "/services/amazon-ppc-management",
        permanent: true,
      },
      {
        source: "/ecommerce-catalog-management",
        destination: "/services/ecommerce-catalog-management",
        permanent: true,
      },
      {
        source: "/website-development",
        destination: "/services/web-development",
        permanent: true,
      },
      {
        source: "/graphic-designing",
        destination: "/services/graphic-design",
        permanent: true,
      },
      {
        source: "/graphic-design",
        destination: "/services/graphic-design",
        permanent: true,
      },
      {
        source: "/services/graphic-designing",
        destination: "/services/graphic-design",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/our-work",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
