import { StudentCard,
    SocialLinks,
    ContactInfo , 
    GalleryPic,
    UnionMembers,
    User 
} from "@prisma/client";

type safeListing = StudentCard&SocialLinks

export type SafeStudent = Omit<safeListing,"createdAt"> & {
  Year: number,
  createdAt: string;
};

export type SafeContactInfo = Omit<ContactInfo, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeGallery = Omit<GalleryPic, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeUnionMember = Omit<UnionMembers, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};