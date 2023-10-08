import prisma from "@/lib/prismadb";

export default async function getallComplaints() {
  try {
    
    const complaintlist = await prisma.complaint.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    });


    return complaintlist ;
  } catch (error: any) {
    throw new Error(error);
  }
}