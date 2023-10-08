import prisma from "@/lib/prismadb";

export interface MemberListingsParams {
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
            label,
            gender,
            role,
            batch,
            fromYear,
            ToYear
        } = params;

        let query: any = {};
        // to check whether

        if (label) {
            query.label = label;
        }
        if (role) {
            query.role = role;
        }
        if (gender) {
            query.gender = gender;
        }
        if (batch) {
            query.batch = Number(batch);
        }
        // if(verified){
        //   query.verified === false ;
        // }

        const unionMemberList = await prisma.unionMembers.findMany({
            where: { AND: [query] },
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