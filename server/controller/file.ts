import { prisma } from "../prisma";

interface IFile {
  name: string;
  content: string;
  author?: number[];
  createdAt?: Date;
  UpdatedAt?: Date;
}

export async function createFileSocket(fileName: string, id: number): Promise<string> {
  try {
    const File = await prisma.file.create({
      data: {
        name: fileName,
        content: "",
        author: {
          connect: [{ id: id }]
        }
      },
    });
    if (File)
      return JSON.stringify({ file: File, message: "successful" });
    else
      return JSON.stringify({ file: {}, message: "failure" });
  }
  catch (err) {
    console.log(err);
    return JSON.stringify({ file: {}, message: "failure" });
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

export async function saveFile(content: string, fileId: number): Promise<string> {
  try {
    const File = await prisma.file.update({
      where: {
        id: fileId,
      },
      data: {
        content: content,
      },
    });
    if (File) {
      return JSON.stringify({ file: File, message: "successful" });
    }
    return JSON.stringify({ filename: "", message: "failure" });
  }
  catch (err) {
    console.log(err);
    return JSON.stringify({ email: "", message: "failure" });
  }
}
