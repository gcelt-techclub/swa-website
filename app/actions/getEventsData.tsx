import prismadb from "@/lib/prismadb";

export interface EventListingParam {
    id: string;
    label?: string;
    date?: string;
    featured?: string,
}

export default async function getEventsData(
    params: EventListingParam
) {
    try {
        const {
            id,
            label,
            date,
            featured,
        } = params;

        let query: any = {};
        // to check whether
        if (id) {
            query.id = id;
        }
        if (label) {
            query.label = label;
        }
        if (date) {
            query.date = date;
        }
        if (featured) {
            query.featured = featured;
        }
        
        const eventist = await prismadb.event.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = eventist.map((event) => ({
            ...event,
            createdAt: event.createdAt.toISOString(),
            updatedAt: event.createdAt.toISOString(),
        }));
        
        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}