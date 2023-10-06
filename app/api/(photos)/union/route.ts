import { NextResponse } from "next/server";

//Local imports
import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    req: Request,
) {
    try {
        console.log('Here')
        // get the currentUser currently in the session
        const currentUser = await getCurrentUser();

        // retrieve the data requested for action from the file
        const body = await req.json();
        console.log(body);
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
        const newmemberPicture = await prismadb.unionMembers.create({
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
        return NextResponse.json(newmemberPicture);
    } catch (error) {
        console.log('[MEMBER_PICTURE_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function GET(
    req: Request,
) {
    try {

        // get all union members pictures
        const allPictures = await prismadb.unionMembers.findMany();

        // if found return with all the pictures confirmation
        return NextResponse.json(allPictures);
    } catch (error) {
        console.log('[UNION_MEMBER_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};