import { prisma } from "../prisma";
import { MiddlewareOptions, Types } from "mongoose";

interface IFile {
  name: string;
  content: string;
  author?: number[];
  createdAt?:Date;
  UpdatedAt?:Date;
}


export async function createFileSocket(filename: string, user: string): Promise<string> {
  try {
    const User = await prisma.user.findUnique({
      where: {
        email: user,
      },
    });
    if (User) {
      const File = await prisma.file.create({
        data: {
          name: filename,
          content: "",
          author: {
            connect: [{ id: User.id }]
          },

        },
        include: {
          author: true, // Include all posts in the returned object
        },
      });
      if (File) {
        const updateUser = await prisma.user.update({
          where: {
            id: User.id,
          },
          data: {
            Files: {
              connect: [{ id: File.id }]
            }
          },
        });
        return JSON.stringify({ filename: File.name, message: "successful" });
      }
    }
    return JSON.stringify({ filename: "", message: "failure" });
  }
  catch (err) {
    console.log(err);

    return JSON.stringify({ email: "", message: "failure" });
  }
}

export async function fetchFiles(email: string): Promise<IFile[]> {
  try {
    const User = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        Files: true,
      }
    });
    console.log(User?.Files);
    if (User?.Files)
      return User?.Files;
    else
      return [];
  } catch (err) {
    console.log(err);
    return [];
  }
}