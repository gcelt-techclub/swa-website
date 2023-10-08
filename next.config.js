/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental :{
        appDir: true,
    },
    images:{
        domains: [
            'avatars.githubusercontent.com',
            'lh3.googleusercontent.com',
            'res.cloudinary.com',
            'gcelt.gov.in',
            'photos.wikimapia.org'
        ]
    }
}

module.exports = nextConfig