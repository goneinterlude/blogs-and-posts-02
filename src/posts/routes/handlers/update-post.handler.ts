import { Request, Response} from "express";
import {PostInputDTO, PostUpdateDTO} from "../../dto/posts-input.dto";
import { HttpStatus } from "../../../core/types/http-statuses";
import { db } from "../../../db/in-memory.db";
import { Post} from "../../types/post";
import {postsRepository} from "../../repositories/posts.repository";
import {blogsRepository} from "../../../blogs/repositories/blog.repository";
import {createErrorMessages} from "../../../core/utils/error.utils";

export function updatePostHandler(
    req: Request<{ id: string }, {}, PostInputDTO>,
    res: Response
) {
    const postId = req.params.id;

    const blogId = req.body.blogId; // number
    const blog = blogsRepository.findById(blogId);

    if (!blog) {
        return res.status(HttpStatus.BadRequest).send(
            createErrorMessages([{ message: "Blog not found", field: "blogId" }])
        );
    }

    const updated = postsRepository.update(postId, req.body, blog.name);

    if (!updated) {
        return res.sendStatus(HttpStatus.NotFound);
    }

    return res.sendStatus(HttpStatus.NoContent); // 204
}