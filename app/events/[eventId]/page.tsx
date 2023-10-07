import prismadb from "@/lib/prismadb";

import { EventForm } from "./eventForm";

const EventPage = async ({
    params
}: {
    params: { eventId: string }
}) => {
 
    let event=null;
    if (params.eventId !== 'new') {
        // To find if Picture already exits or not , if not then we create upload a new Picture
        event = await prismadb.unionMembers.findUnique({
          where: {
            id: params.eventId
          }
        });
      }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <EventForm
                    initialData={event} />
            </div>
        </div>
    );
}

export default EventPage;