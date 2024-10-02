import Delta from "quill-delta";
import { prisma } from "../prisma";

var i = 1;
var serverDelta = new Delta();

export function setServerDelta(delta: Delta): void {
  serverDelta = serverDelta.compose(delta);
  console.log(serverDelta.ops);
  // getDelta(4);
  if (i == 10) {
    saveServerDelta();
    i = 1;
  }
  i++;
}

export async function saveServerDelta() {
  const save = JSON.stringify(serverDelta);
  const File = await prisma.file.update({
    where: {
      id: 4,
    },
    data: {
      content: save,
    },
  });
  console.log(File);
}


export async function getDelta(fileId: number):Promise<Delta> {
  const File = await prisma.file.findUnique({
    where: {
      id: fileId,
    }
  })
  console.log(File?.content);
  var delta;
  if (File?.content)
    delta = JSON.parse(File?.content);
  console.log(delta);
  const delta1 = new Delta(delta.ops);
  console.log(delta1);
  return delta1;
}
