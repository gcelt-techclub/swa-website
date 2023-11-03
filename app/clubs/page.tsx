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
import getEventsData from "@/app/actions/getEventsData";



const ClubPage = async () => {
    const currentUser = await getCurrentUser();
    const events = await getEventsData();

    if (events.length !== 0) {
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
                    <p className="font-black text-4xl whitespace-pre p-3">OUR CLUBS</p>
                    <hr className="w-full  border-t border-neutral-400 dark:border-muted-foreground" />
                    <p className="text-sm whitespace-pre p-3">ORGANIZED BY- STUDENTS&apos; WELFARE ASSOCIATION</p>
                </span>
                {/* <Filter/> */}
            </Container>
            <br className="mb-10" />
        </ClientOnly>
    );
}

export default ClubPage;