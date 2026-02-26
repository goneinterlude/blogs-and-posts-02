import { Request, Response} from "express";
import { PostInputDTO} from "../../dto/posts-input.dto";
import { HttpStatus } from "../../../core/types/http-statuses";
import { db } from "../../../db/in-memory.db";
import { Post} from "../../types/post";
import {postsRepository} from "../../repositories/posts.repository";
import {blogsRepository} from "../../../blogs/repositories/blog.repository";
import {createErrorMessages} from "../../../core/utils/error.utils";

export function createPostHandler(
    req: Request<{}, {}, PostInputDTO>,
    res: Response,) {
    const blogId = req.body.blogId;
    const blog = blogsRepository.findById(blogId);

    if (!blog) {
        return res.sendStatus(HttpStatus.BadRequest)
    }
    const lastId = db.posts.length ? Number(db.posts[db.posts.length - 1].id) : 0;
    const newId = String(lastId + 1)
    const newPost: Post = {
        id: newId,
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: blogId,
        blogName: blog.name,

    }
    postsRepository.create(newPost);
    res.status(HttpStatus.Created).send(newPost);
}