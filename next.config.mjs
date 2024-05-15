/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:
            [
                {
                    protocol: 'https',
                    hostname: 'loremflickr.com',
                    //   port: '',
                    //   pathname: '/account123/**',
                }, {
                    protocol: 'https',
                    hostname: 'images.unsplash.com',
                }, {
                    protocol: 'https',
                    hostname: 'www.gravatar.com',
                },
            ],

    },
};

export default nextConfig;