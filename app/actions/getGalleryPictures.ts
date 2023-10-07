import prisma from "@/lib/prismadb";


export default async function getGalleyPictures() {
    try {
        const galleryPicList = await prisma.galleryPic.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });


        const safeListings = galleryPicList.map((PictureCard) => ({
            ...PictureCard,
            createdAt: PictureCard.createdAt.toISOString(),
        }));

        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}