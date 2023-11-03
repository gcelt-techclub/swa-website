
//Global import
import Image from "next/image";
import { format } from "date-fns";

// Local imports
import Carousel from "@/app/components/Carousel";
import { SafeEvent } from "@/app/types";
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";

//actions
import getCurrentUser from "@/app/actions/getCurrentUser";
import getEventsData from "@/app/actions/getEventsData";

//client
import EventClient from "./eventClient";


const EventPage = async () => {
    const currentUser = await getCurrentUser();
    const events = await getEventsData();
    
    const formattedEvents: SafeEvent[] = events.map((item) => ({
        id: item.id,
        label: item.label,
        date: item.date,
        Description: item.Description,
        Featured: item.Featured,
        createdAt: format(item.createdAt, 'MMMM do, yyyy'),
        updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
    }));



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
            {/* Carousel */}
            <Carousel/>           

            <Container>
                <span className="mt-10 mb-10 flex flex-col justify-center items-center">
                    <p className="font-black text-4xl whitespace-pre p-3">OUR EVENTS</p>
                    <hr className="w-full  border-t border-neutral-400 dark:border-muted-foreground" />
                    <p className="text-sm whitespace-pre p-3">ORGANIZED BY- STUDENTS&apos; WELFARE ASSOCIATION</p>
                </span>
                {/* <Filter/> */}
                <EventClient
                    imgList={formattedEvents}
                    currentUser={currentUser}
                />
            </Container>
            <br className="mb-10" />
        </ClientOnly>
    );
}

export default EventPage;