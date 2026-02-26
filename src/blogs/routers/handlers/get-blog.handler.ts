import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { blogsRepository } from "../../repositories/blog.repository";

export function getBlogHandler(req: Request<{id: string}>, res: Response) {
    const id = req.params.id
    const blog = blogsRepository.findById(id)
    if (!blog) {
        res
            .status(HttpStatus.NotFound)
            .send(
                createErrorMessages([{field: "id", message: "No blog found"}]),
            );
        return;
    }
    return res.status(HttpStatus.Ok).send(blog);
}