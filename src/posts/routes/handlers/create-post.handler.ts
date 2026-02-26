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
        return res.status(HttpStatus.BadRequest).send(
            createErrorMessages([{ message: "Blog not found", field: "blogId" }])
        );
    }

    const newPost: Post = {
        id: db.posts.length ? db.posts[db.posts.length - 1].id + 1 : 1,
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: blogId,
        blogName: blog.name,

    }
    postsRepository.create(newPost);
    res.status(HttpStatus.Created).send(newPost);
}