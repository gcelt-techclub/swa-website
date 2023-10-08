import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(
    request: Request,
) {

    try {
        // Retrieve the userId passed as parameters
        // from the body , we retrieve the provided address , email , phone no details
        const body = await request.json();
        const {  
            Name,
            Complaint,
            Feedback,
            PhoneNum2
        } = body;

        const newComplaint = await prismadb.complaint.create({
            data: {
                Name,
                Complaint,
                Feedback,
            },
        });
        return NextResponse.json(newComplaint);
    }
    catch (error) {
        return new NextResponse("Internal error", { status: 500 });
    }
}