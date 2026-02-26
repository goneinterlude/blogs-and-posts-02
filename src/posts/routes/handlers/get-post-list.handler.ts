import {Request, Response} from "express";
import { postsRepository } from "../../repositories/posts.repository";

export function getPostsListHandler(req: Request, res: Response) {
    const blogs = postsRepository.findAll();
    res.send(blogs);
}