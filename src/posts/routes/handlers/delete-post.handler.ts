import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { postsRepository } from "../../repositories/posts.repository";


export function deletePostHandler(req: Request<{id: string}>, res: Response) {
    const id = req.params.id;
    const blog = postsRepository.findById(id);

    if (!blog) {
        res
            .status(HttpStatus.NotFound)
            .send(
                createErrorMessages([{ field: 'id', message: 'Post not found' }]),
            );
        return;
    }
    postsRepository.delete(id);
    res.sendStatus(HttpStatus.NoContent);
}