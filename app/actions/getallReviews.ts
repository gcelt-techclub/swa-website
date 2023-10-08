import prisma from "@/lib/prismadb";

export default async function getallReviews() {
  try {
    
    const Reviewtlist = await prisma.review.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    });


    return Reviewtlist ;
  } catch (error: any) {
    throw new Error(error);
  }
}