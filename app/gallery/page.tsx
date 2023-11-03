// import { format } from "date-fns";

import Image from "next/image";
// const BillboardsPage = async ({
//     params
// }: {
//     params: { storeId: string }
// }) => {

// Local imports
import Carousel from "@/app/components/Carousel";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";

//actions
import getCurrentUser from "@/app/actions/getCurrentUser";
import getGalleyPictures from "@/app/actions/getGalleryPictures";

//client
import GalleryClient from "./galleryClient";



const GalleryPage = async () => {
    const currentUser = await getCurrentUser();
    const pictures = await getGalleyPictures();

    //<BillboardClient data={formattedBillboards} />


    if (pictures.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Photos found"
                    subtitle="Looks like No Photos Uploaded recently."
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            {/* Carousel */}
            <Carousel/>            

            <Container>
                <span className="mt-10 mb-10 flex flex-col justify-center items-center">
                    <p className="font-black text-4xl whitespace-pre p-3">GALLERY</p>
                    <hr className="w-full  border-t border-neutral-400 dark:border-muted-foreground" />
                </span>
                <GalleryClient
                    imgList={pictures}
                    currentUser={currentUser}
                />
            </Container>
            <br className="mb-10" />
        </ClientOnly>
    );
}

export default GalleryPage;