import { prisma } from "../prisma";

interface IFile {
  name: string;
  content: string;
  author?: number[];
  createdAt?:Date;
  UpdatedAt?:Date;
}


export async function createFileSocket(fileName: string, user: string): Promise<string> {
  try {
    const User = await prisma.user.findUnique({
      where: {
        email: user,
      },
    });
    if (User) {
      const File = await prisma.file.create({
        data: {
          name: fileName,
          content: "",
          author: {
            connect: [{ id: User.id }]
          },

        },
        include: {
          author: true,
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

export async function fetchFiles(email: string): Promise<string> {
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
      return JSON.stringify({ files: User?.Files, message: "successful" });
    else
      return JSON.stringify({ files: [], message: "failed" });
  } catch (err) {
    console.log(err);
    return JSON.stringify({ files: [], message: "failed" });
  }
}