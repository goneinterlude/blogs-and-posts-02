import {Request, Response} from 'express';
import {BlogUpdateDTO} from "../../dto/blog.input-dto";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorMessages} from "../../../core/utils/error.utils";
import {blogsRepository} from "../../repositories/blog.repository";

export function updateBlogHandler(req: Request<{}, {}, BlogUpdateDTO>, res: Response) {
    const id = req.body.id;
    const blog = blogsRepository.findById(id);

    if (!blog) {
        res
        .status(HttpStatus.NotFound)
            .send(
                createErrorMessages([{ field: 'id', message: 'Blog not found' }]),
            );
        return;
    }
    blogsRepository.update(id, req.body);
    res.sendStatus(HttpStatus.NoContent);
}