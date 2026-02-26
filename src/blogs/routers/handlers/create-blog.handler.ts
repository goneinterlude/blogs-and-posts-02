import { Request, Response} from "express";
import { BlogInputDTO} from "../../dto/blog.input-dto";
import { HttpStatus } from "../../../core/types/http-statuses";
import { db } from "../../../db/in-memory.db";
import { Blog} from "../../types/blog";
import {blogsRepository} from "../../repositories/blog.repository";

export function createBlogHandler(
    req: Request<{}, {}, BlogInputDTO>,
    res: Response,) {

    const lastId = db.blogs.length ? Number(db.blogs[db.blogs.length - 1].id) : 0;
    const newId = String(lastId + 1);

    const newBlog: Blog = {
        id: newId,
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
    }
    blogsRepository.create(newBlog);
    res.status(HttpStatus.Created).send(newBlog);
}