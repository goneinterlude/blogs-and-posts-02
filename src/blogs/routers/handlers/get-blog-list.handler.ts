import {Request, Response} from "express";
import { blogsRepository} from "../../repositories/blog.repository";

export function getBlogsListHandler(req: Request, res: Response) {
    const blogs = blogsRepository.findAll();
    res.send(blogs);
}