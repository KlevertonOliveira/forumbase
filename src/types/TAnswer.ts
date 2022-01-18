export type TAnswer = {
    id?: string;
    index?: number;
    content: string;
    createdAt: number;
    creatorId: string;
    creatorEmail: string;
    creatorPhotoURL: string | null;
}