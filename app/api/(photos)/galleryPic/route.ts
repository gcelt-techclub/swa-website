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
        const { label, imageUrl, Year, type } = body;

        // if current user does not exist throw error with status code 403
        if (!currentUser) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        // if current user does not exist throw error with status code 403
         if (currentUser.role !== 'admin') {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // if label does not exist throw error with status code 400
        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }

        // if imageurl does not exist throw error with status code 400
        if (!imageUrl) {
            return new NextResponse("Image URL is required", { status: 400 });
        }

        // if Year does not exist throw error with status code 400
        if (!Year) {
            return new NextResponse("Year of this Photo is required", { status: 400 });
        }

        // if Category / type does not exist throw error with status code 400
        if (!type) {
            return new NextResponse("Category is required", { status: 400 });
        }

        // if found then 
        //for the current user under the existing store
        const galleryPicture = await prismadb.galleryPic.create({
            data: {
                label,
                imageUrl,
                Year: parseInt(Year, 10),
                type,
                createdBy: currentUser.id
            }
        });

        // return with new creation confirmation
        return NextResponse.json(galleryPicture);
    } catch (error) {
        console.log('[PICTURE_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
) {
    try {

        // get all gallery pictures
        const allPictures = await prismadb.galleryPic.findMany();

        // if found return with all the pictures confirmation
        return NextResponse.json(allPictures);
    } catch (error) {
        console.log('[GALLERY_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};