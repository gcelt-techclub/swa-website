import { NextResponse } from "next/server";

//Local imports
import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

// HTTPS GET REQUEST
export async function GET(
    req: Request,
    { params }: { params: { galleryPicId: string } }
) {
    try {
        // if galleryPicId not exists inside params
        if (!params.galleryPicId) {
            return new NextResponse("Gallery Picture id is required", { status: 400 });
        }

        // with picture id , find the particular picture details
        const getPicture = await prismadb.galleryPic.findUnique({
            where: {
                id: params.galleryPicId
            }
        });

        // return with the details of Photo inside Gallery
        return NextResponse.json(getPicture);
    } catch (error) {
        console.log('[PICTURE_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};




// HTTPS DELETE REQUEST
export async function DELETE(
    req: Request,
    { params }: { params: { galleryPicId: string } }
) {
    try {

        // get the currentUser currently in the session
        const currentUser = await getCurrentUser();

        // if current user doesn not exist throw error with status code 403
        if (!currentUser) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        // from params get galleryPicId and if does not exist then throw error
        if (!params.galleryPicId) {
            return new NextResponse("Billboard id is required", { status: 400 });
        }

        // if found , then delete the existing Picture inside Gallery
        const deletePicture = await prismadb.galleryPic.delete({
            where: {
                id: params.galleryPicId,
            }
        });

        // return with deleted confirmation
        return NextResponse.json(deletePicture);
    } catch (error) {
        console.log('[PICTURE_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};





// HTTPS PATCH REQUEST
export async function PATCH(
    req: Request,
    { params }: { params: { galleryPicId: string } }
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

        // from params get galleryPicId and if does not exist then throw error
        if (!params.galleryPicId) {
            return new NextResponse("GalleryPic id is required", { status: 400 });
        }

        // if Year does not exist throw error with status code 400
        if (!Year) {
            return new NextResponse("Year of this Photo is required", { status: 400 });
        }

        // if Category / type does not exist throw error with status code 400
        if (!type) {
            return new NextResponse("Category is required", { status: 400 });
        }

        // if found , then update the existing Picture in Gallery with relevant details as requested
        const billboard = await prismadb.galleryPic.update({
            where: {
                id: params.galleryPicId,
            },
            data: {
                label,
                imageUrl,
                Year,
                type
            }
        });

        // return with updatation confirmation
        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[PICTURE_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};