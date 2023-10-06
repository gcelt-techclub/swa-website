import { NextResponse } from "next/server";

//Local imports
import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

// HTTPS GET REQUEST
export async function GET(
    req: Request,
    { params }: { params: { unionMembersId: string } }
) {
    try {
        // if unionMembersId not exists inside params
        if (!params.unionMembersId) {
            return new NextResponse("Gallery Picture id is required", { status: 400 });
        }

        // with picture id , find the particular picture details
        const getPicture = await prismadb.unionMembers.findUnique({
            where: {
                id: params.unionMembersId
            }
        });

        // return with the details of Union Members
        return NextResponse.json(getPicture);
    } catch (error) {
        console.log('[PICTURE_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};




// HTTPS DELETE REQUEST
export async function DELETE(
    req: Request,
    { params }: { params: { unionMembersId: string } }
) {
    try {

        // get the currentUser currently in the session
        const currentUser = await getCurrentUser();

        // if current user doesn not exist throw error with status code 403
        if (!currentUser) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        // from params get unionMembersId and if does not exist then throw error
        if (!params.unionMembersId) {
            return new NextResponse("unionMembersId id is required", { status: 400 });
        }

        // if found , then delete the existing Union Members
        const deletePicture = await prismadb.unionMembers.delete({
            where: {
                id: params.unionMembersId,
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
    { params }: { params: { unionMembersId: string } }
) {
    try {
        // get the currentUser currently in the session
        const currentUser = await getCurrentUser();

        // retrieve the data requested for action from the file
        const body = await req.json();

        // spread the body and store in variables
        const { label, gender, imageUrl, FromYear, ToYear, batch, role } = body;

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

        // if Gender does not exist throw error with status code 400
        if (!gender) {
            return new NextResponse("Gender is required", { status: 400 });
        }

        // if imageurl does not exist throw error with status code 400
        if (!imageUrl) {
            return new NextResponse("Image URL is required", { status: 400 });
        }

        // if from Year does not exist throw error with status code 400
        if (!FromYear) {
            return new NextResponse("Year of this Photo is required", { status: 400 });
        }

        // if to Year does not exist throw error with status code 400
        if (!ToYear) {
            return new NextResponse("Year of this Photo is required", { status: 400 });
        }

        // if batch does not exist throw error with status code 400
        if (!batch) {
            return new NextResponse("Batch is required", { status: 400 });
        }

        // if role / responsibility does not exist throw error with status code 400
        if (!role) {
            return new NextResponse("Responsibility is required", { status: 400 });
        }

        const ExistingYear = await prismadb.yearList.findFirst({
            where: { AND: [ { 
                fromYear: parseInt(FromYear, 10),
                toYear: parseInt(ToYear, 10), 
            }] },
        });

        if(!ExistingYear){
            await prismadb.yearList.create({
                data: { 
                    fromYear: parseInt(FromYear, 10),
                    toYear: parseInt(ToYear, 10),  
                },
            });
        }
        console.log(body);
        // if found then 
        //for the current user under the existing store
        const updateMemberPicture = await prismadb.unionMembers.update({
            where: {
                id: params.unionMembersId,
            },
            data: {
                label,
                gender,
                imageUrl,
                fromYear: parseInt(FromYear, 10),
                toYear: parseInt(ToYear, 10),
                batch,
                role
            }
        });

        // return with new creation confirmation
        return NextResponse.json(updateMemberPicture);
    } catch (error) {
        console.log('[MEMBER_PICTURE_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};