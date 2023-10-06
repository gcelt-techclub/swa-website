import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";

export async function PATCH(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    // Check if current user exist or not
    if (!currentUser) {
        return NextResponse.error();
    }
    try {
        // Retrieve the userId passed as parameters
        // from the body , we retrieve the provided address , email , phone no details
        const body = await request.json();
        const {  
            address,
            email,
            contactName1,
            PhoneNum1,
            contactName2,
            PhoneNum2 
        } = body;


        const matchedContact = await prismadb.contactInfo.findFirst({
            where: {
                email: email,
            },
        });


        if (!matchedContact) {
            console.log('inside not matched')
            return new NextResponse("Details  not matched", { status: 400 });
        }

        const updatedContact = await prismadb.contactInfo.update({
            data: {
                address: address,
                email: email,
                contactName1: contactName1,
                PhoneNum1: String(PhoneNum1),
                contactName2: contactName2,
                PhoneNum2: String(PhoneNum2) 
            },
            where: {
                id: matchedContact.id,
            },
        });

        return NextResponse.json(updatedContact);
    }
    catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
}


export async function POST(
    request: Request,
) {

    try {
        // Retrieve the userId passed as parameters
        // from the body , we retrieve the provided address , email , phone no details
        const body = await request.json();
        const {  
            Name,
            email,
            message
        } = body;

        const newReview = await prismadb.review.create({
            data: {
                Name,
                email,
                message 
            },
        });
        return NextResponse.json(newReview);
    }
    catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
}