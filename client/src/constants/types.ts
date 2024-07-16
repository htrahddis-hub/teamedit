export interface IFile {
  content: string;
  name: string;
  updatedAt: Date;
  id: number;
}

export interface IStateF {
  value: IResponse
}

export interface IResponse {
  data: IFile[];
  isFetched: boolean;
  message: string;
}
