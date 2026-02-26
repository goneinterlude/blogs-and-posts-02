import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { blogsRepository } from "../../repositories/blog.repository";


export function deleteBlogHandler(req: Request<{id: string}>, res: Response) {
    const id = req.params.id;
    const blog = blogsRepository.findById(id);

    try {
        blogsRepository.delete(id);
        return res.sendStatus(HttpStatus.NoContent);
    } catch (e) {
        return res.sendStatus(HttpStatus.NotFound);
    }
}