import { Blog } from '../types/blog'
import { db } from "../../db/in-memory.db";
import {BlogInputDTO} from "../dto/blog.input-dto";

export const blogsRepository = {
    findAll(): Blog[] {
        return db.blogs;
    },
    findById(id: number): Blog | null {
        return db.blogs.find((d) => d.id === id) ?? null; // Если результат поиска равно null или undefined, то вернем null.
    },
    create(newBlog: Blog): Blog {
        db.blogs.push(newBlog);
        return newBlog;
    },
    update(id: number, dto: BlogInputDTO): void {
        const blog = db.blogs.find((d) => d.id === id);

        if (!blog) {
            throw new Error("blog not found");
        }
        blog.name = dto.name;
        blog.description = dto.description;
        blog.websiteUrl = dto.websiteUrl;

        return;
    },
    delete(id: number): void {
        const index = db.blogs.findIndex((d) => d.id === id);

        if (index === -1) {
            throw new Error("blog not found");
        }
        db.blogs.splice(index, 1);
        return;
    }
}