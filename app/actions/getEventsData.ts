import prismadb from "@/lib/prismadb";

export default async function getEventsData() {
    try {
        const eventist = await prismadb.event.findMany({
            orderBy: {
                createdAt: 'asc'
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