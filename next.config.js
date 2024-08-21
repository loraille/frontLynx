/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "www.denvercenter.org",
      "images.unsplash.com",
      "mrcas.edu.in",
      "www.avalokita.net",
      "www.laboiteverte.fr",
      "www.elegantthemes.com",
      "preview.free3d.com",
      "api.kemperhosting.com",
    ],
  },
};

module.exports = nextConfig;
