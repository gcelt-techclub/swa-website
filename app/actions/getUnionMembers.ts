import prisma from "@/lib/prismadb";

export interface MemberListingsParams {
    id: string;
    imageUrl?: string;
    label?: string;
    gender?: string;
    role?: string;
    batch?: string;
    fromYear?: number;
    ToYear?: number;
}

export default async function getUnionMembers(
    params: MemberListingsParams
) {
    try {
        const {
            id,
            imageUrl,
            label,
            gender,
            role,
            batch,
            fromYear,
            ToYear
        } = params;

        let query: any = {};
        // to check whether
        if (id) {
            query.id = id;
        }
        if (label) {
            query.Name = label;
        }
        if (role) {
            query.role = role;
        }
        if (gender) {
            query.role = gender;
        }
        if (batch) {
            query.Year = Number(batch);
        }
        // if(verified){
        //   query.verified === false ;
        // }

        const unionMemberList = await prisma.unionMembers.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });


        const safeListings = unionMemberList.map((members) => ({
            ...members,
            createdAt: members.createdAt.toISOString(),
            updatedAt: members.updatedAt.toISOString(),
        }));

        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}