import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

interface IParams {
    complaintId?: string | undefined | null;
}

export async function PATCH(
    request: Request,
    { params }: { params: IParams }
) {

    const currentUser = await getCurrentUser();

    // Check if current user exist or not
    if (!currentUser) {
        return NextResponse.error();
    }

    // check if role of current user is admin
    if (currentUser?.role === "admin") {

        // Retrieve the complaintId passed as parameters
        const { complaintId } = params;

        // If Valid complaintId Provided or not
        if (!complaintId || typeof complaintId !== "string") {
            throw new Error("Invalid ID");
        }

        const body = await request.json();
        const { 
            verify
        } = body;

        // Get the data of complaint from datatable whose complaintId is provided
        const markedComplaint = await prisma.complaint.findFirst({
            where: {
                id: complaintId,
            },
        });

        // If we don't get the complaint details from database return null
        if (!markedComplaint) {
            return null;
        }

        const verifiedStudent = await prisma.complaint.update({
            data: {
                verified: verify,
            },
            where: {
                id: markedComplaint.id,
            },
        });

        //And Return the response
        return NextResponse.json(verifiedStudent);
    }
}