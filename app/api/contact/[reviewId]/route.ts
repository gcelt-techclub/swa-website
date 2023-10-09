import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

interface IParams {
    reviewId?: string | undefined | null;
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

        // Retrieve the reviewId passed as parameters
        const { reviewId } = params;

        // If Valid reviewId Provided or not
        if (!reviewId || typeof reviewId !== "string") {
            throw new Error("Invalid ID");
        }

        const body = await request.json();
        const { 
            verify
        } = body;

        // Get the data of review from datatable whose reviewId is provided
        const markedReview = await prisma.review.findFirst({
            where: {
                id: reviewId,
            },
        });

        // If we don't get the Review details from database return null
        if (!markedReview) {
            return null;
        }

        const verifiedStudent = await prisma.review.update({
            data: {
                verified: verify,
            },
            where: {
                id: markedReview.id,
            },
        });

        //And Return the response
        return NextResponse.json(verifiedStudent);
    }
}