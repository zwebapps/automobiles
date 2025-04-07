import { ReactNode } from "react";

export type SocialType = {
  id: ReactNode;
  name: string;
  data: object;
}

export type PostType = {
    id: ReactNode;
      name: string;
      data: ReactNode;
      image?: string;
    createdAt?: Date;
    }


  export type UserType = {
      id: ReactNode;
      firstName: string;
      lastName: string;
      userName: string;
      email: string;
      password: string;
      data: ReactNode;
      createdAt?: Date;
    };