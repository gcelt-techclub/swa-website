import prismadb from "@/lib/prismadb";

export default async function getEventsData() {
    try {
        const eventist = await prismadb.event.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });
        
        return eventist;
    } catch (error: any) {
        throw new Error(error);
    }
}