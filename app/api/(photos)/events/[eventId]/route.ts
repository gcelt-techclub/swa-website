import { NextResponse } from "next/server";

//Local imports
import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

// HTTPS GET REQUEST
export async function GET(
    req: Request,
    { params }: { params: { eventId: string } }
) {
    try {
        // if eventId not exists inside params
        if (!params.eventId) {
            return new NextResponse("Event id is required", { status: 400 });
        }

        // with Event id , find the particular Event details
        const Event = await prismadb.event.findUnique({
            where: {
                id: params.eventId
            },
            include: {
                images: true,
            }
        });

        // return with the details of Event
        return NextResponse.json(Event);
    } catch (error) {
        console.log('[EVENT_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

// HTTPS DELETE REQUEST
export async function DELETE(
    req: Request,
    { params }: { params: { eventId: string } }
) {
    try {
        // get the currentUser currently in the session
        const currentUser = await getCurrentUser();

        // if current user doesn not exist throw error with status code 403
        if (!currentUser) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        // from params get eventId and if does not exist then throw error
        if (!params.eventId) {
            return new NextResponse("Event id is required", { status: 400 });
        }

        // if found , then delete the existing Event for the store
        const Event = await prismadb.event.delete({
            where: {
                id: params.eventId,
            }
        });

        // return with deleted confirmation
        return NextResponse.json(Event);
    } catch (error) {
        console.log('[EVENT_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

// HTTPS PATCH REQUEST
export async function PATCH(
    req: Request,
    { params }: { params: { eventId: string } }
) {
    try {
        // get the currentUser currently in the session
        const currentUser = await getCurrentUser();

        // retrieve the data requested for action from the file
        const body = await req.json();

        // spread the body and store in variables
        const {
            label,
            date,
            Description,
            images,
            Featured,
        } = body;

        // if current user does not exist throw error with status code 403
        if (!currentUser) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        // if label does not exist throw error with status code 400
        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }

        // if date does not exist throw error with status code 400
        if (!date) {
            return new NextResponse("Date is required", { status: 400 });
        }

        // if Description does not exist throw error with status code 400
        if (!Description) {
            return new NextResponse("Description id is required", { status: 400 });
        }

        // if images does not exist throw error with status code 400
        if (!images || !images.length) {
            return new NextResponse("Image URL is required", { status: 400 });
        }

        // if Featured does not exist throw error with status code 400
        if (!Featured) {
            return new NextResponse("Featured id is required", { status: 400 });
        }

        // if found , then update the existing Event with relevant details as requested
        await prismadb.event.update({
            where: {
                id: params.eventId,
            },
            data: {
                label,
                date,
                Description,
                Featured,
                images: {
                    deleteMany: {}
                }
            }
        });

        const Event = await prismadb.event.update({
            where: {
                id: params.eventId,
            },
            data: {
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        });

        // return with updatation confirmation
        return NextResponse.json(Event);
    } catch (error) {
        console.log('[EVENT_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};