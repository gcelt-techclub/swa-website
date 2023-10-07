import { NextResponse } from "next/server";

//Local imports
import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    req: Request,
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

        // if found , then create a new event with relevant details as requested
        //for the current user under the existing store
        const event = await prismadb.event.create({
            data: {
                label,
                date,
                Description,
                Featured,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        });

        // return with new creation confirmation
        return NextResponse.json(event);
    } catch (error) {
        console.log('[EVENTS_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};



export async function GET(
    req: Request,
) {
    try {
        // find the all events under a particular store get all gallery pictures
        const allevents = await prismadb.galleryPic.findMany();

        // if found return with all the events confirmation
        return NextResponse.json(allevents);
    } catch (error) {
        console.log('[EVENTS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};