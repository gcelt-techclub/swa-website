import prismadb from "@/lib/prismadb";

import { NewPictureForm } from "./newPictureForm";

const GalleryPicPage = async ({
  params
}: {
  params: { galleryPicId: string }
}) => {

  let Picture=null;

  if (params.galleryPicId !== 'new') {
    // To find if Picture already exits or not , if not then we create upload a new Picture
    Picture = await prismadb.galleryPic.findUnique({
      where: {
        id: params.galleryPicId
      }
    });
  }
  return (
    <div className="flex-col lg:mt-28">
      <div className="flex-1 space-y-2 p-8 pt-6">
        <NewPictureForm initialData={Picture} />
      </div>
    </div>
  );
}

export default GalleryPicPage;