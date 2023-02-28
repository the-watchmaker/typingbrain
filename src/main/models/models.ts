export type TCreatedOrigin = 'APP' | 'WEB' | 'MOB';

export interface IPractice {
  id?: number;
  title: string;
  authorId: number;
  text: string;
  tags: string;
  folderId?: number;
  createdOrigin?: string;
  language?: string;
  metaData: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  deleted?: number;
}
