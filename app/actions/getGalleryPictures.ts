import prisma from "@/lib/prismadb";

export interface GalleryListingParams {
    id: string;
    imageUrl?:string;
    label?: string;
    type?: string;
    Year?: number;
}

export default async function getGalleyPictures(
    params: GalleryListingParams
) {
    try {
        const {
            id,
            imageUrl,
            label,
            type,
            Year,
        } = params;

        let query: any = {};
        // to check whether
        if (id) {
            query.id = id;
        }
        if (label) {
            query.Name = label;
        }
        if (type) {
            query.email = type;
        }
        if (Year) {
            query.Year = Number(Year);
        }
        // if(verified){
        //   query.verified === false ;
        // }

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