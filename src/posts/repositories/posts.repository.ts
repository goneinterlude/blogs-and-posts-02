import { Post } from '../types/post'
import { db} from "../../db/in-memory.db";
import {PostUpdateDTO} from "../dto/posts-input.dto";

export const postsRepository = {
    findAll(): Post[] {
        return db.posts;
    },
    findById(id: number): Post | null {
        return db.posts.find((d) => d.id === id) ?? null; // Если результат поиска равно null или undefined, то вернем null.
    },
    create(newPost: Post): Post {
        db.posts.push(newPost);
        return newPost;
    },
    update(id: number, dto: PostUpdateDTO, blogName: string): boolean {
        const post = db.posts.find(p => p.id === id);
        if (!post) return false;

        post.title = dto.title;
        post.shortDescription = dto.shortDescription;
        post.content = dto.content;
        post.blogId = dto.blogId;
        post.blogName = blogName;

        return true;
    },
    delete(id: number): void {
        const index = db.posts.findIndex((d) => d.id === id);

        if (index === -1) {
            throw new Error("post not found");
        }
        db.posts.splice(index, 1);
        return;
    }
}