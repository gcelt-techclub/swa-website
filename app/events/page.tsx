// import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

// const BillboardsPage = async ({
//     params
// }: {
//     params: { storeId: string }
// }) => {

// Local imports
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import Heading from "@/app/components/ui/Heading";
import Container from "@/app/components/Container";
import Filter from "@/app//components/customUi/filter/Filter";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getEventsData , { EventListingParam } from "@/app/actions/getEventsData";

import EventClient from "./eventClient";





interface VerifyProps {
    searchParams: EventListingParam
};

const GalleryPage = async ({ searchParams }: VerifyProps) => {
    const currentUser = await getCurrentUser();
    const events = await getEventsData(searchParams);

    if (events.length === 0) {
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
            <div>
                <img className="w-full h-1/3 lg:h-[40rem] object-cover" src={"/images/assets/hero_img.jpg"} />
            </div>
            <div className={`bg-gradient-to-b from-cyan-700 via-cyan-900 to-cyan-950
            w-full pt-4 pb-2 px-10 transition-all delay-500 text-white flex flex-row`}>
                <Heading title="WELCOME" />
                <div className="w-1 ml-10 border-solid border-r-2 border-white"> </div>
                <div className="w-1 border-solid border-r-2 border-white"> </div>
            </div>
            <Container>
                <span className="mt-10 mb-10 flex flex-col justify-center items-center">
                    <p className="font-black text-4xl whitespace-pre p-3">OUR EVENTS</p>
                    <hr className="w-full  border-t border-neutral-400 dark:border-muted-foreground" />
                    <p className="text-sm whitespace-pre p-3">ORGANIZED BY- STUDENTS' WELFARE ASSOCIATION</p>
                </span>
                {/* <Filter/> */}
                <EventClient
                    imgList={events}
                    currentUser={currentUser}
                />
            </Container>
            <br className="mb-10" />
        </ClientOnly>
    );
}

export default GalleryPage;