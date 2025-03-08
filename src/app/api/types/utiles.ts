import { ReactNode } from "react";

export type PostType = {
    id: ReactNode;
      name: string;
      data: ReactNode;
      image?: string;
    createdAt?: Date;
    }