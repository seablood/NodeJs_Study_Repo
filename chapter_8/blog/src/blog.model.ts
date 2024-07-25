export interface PostDTO {
    id: string; 
    title: string; 
    content: string; 
    writer: string; 
    createdDate: Date; 
    updatedDate?: Date; 
}