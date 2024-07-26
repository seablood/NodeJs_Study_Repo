import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
    @Prop()
    id: string;

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    writer: string;

    @Prop()
    createdDate: Date;

    @Prop()
    updatedDate: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);