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
        Files: {
          select: {
            id: true,
            updatedAt: true,
            name: true
          },
          orderBy: {
            updatedAt: 'desc'
          }
        },
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

export async function deleteFile(fileId: number): Promise<string> {
  try {
    const File = await prisma.file.delete({
      where: {
        id: fileId,
      }
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

export async function renameFile(fileName: string, fileId: number): Promise<string> {
  try {
    const File = await prisma.file.update({
      where: {
        id: fileId,
      },
      data: {
        name: fileName,
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

export async function shareFile(userId: number, fileId: number): Promise<string> {
  try {
    const User = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        Files: {
          connect: [{ id: fileId }]
        }
      },
    });
    if (User) {
      return JSON.stringify({ user: User, message: "successful" });
    }
    return JSON.stringify({ filename: "", message: "failure" });
  }
  catch (err) {
    console.log(err);
    return JSON.stringify({ email: "", message: "failure" });
  }
}

export async function fetchFileById(userId: number, fileId: number): Promise<string> {
  try {
    const File = await prisma.file.findUnique({
      where: {
        id: fileId,
      },
      include: {
        author: {
          where: {
            id: userId
          },
          select: {
            email: true,
            id: true,
            firstname:true,
            lastname:true
          },
        }
      }
    });
    if (File?.author[0] && File?.author[0].id===userId) {
      return JSON.stringify({ value: File, message: "successful" });
    }
    return JSON.stringify({ filename: "", message: "failure" });
  }
  catch (err) {
    console.log(err);
    return JSON.stringify({ email: "", message: "failure" });
  }
}