import {Router} from "express";
import {getPostsListHandler} from "./handlers/get-post-list.handler";
import {idValidation} from "../../core/middlewares.validation/params-id.validation-middleware";
import {getPostHandler} from "./handlers/get-post.handler";
import {inputValidationResultMiddleware} from "../../core/middlewares.validation/input-validation-result.middleware";
import {createPostHandler} from "./handlers/create-post.handler";
import {superAdminGuardMiddleware} from "../../auth/admin.guard-middleware";
import {updatePostHandler} from "./handlers/update-post.handler";
import {deletePostHandler} from "./handlers/delete-post.handler";
import {postInputDtoValidation} from "../validation/post.input-validation.middleware";



export const postsRouter = Router({});

postsRouter.get('', getPostsListHandler);

postsRouter.get('/:id', idValidation, inputValidationResultMiddleware, getPostHandler);

postsRouter.post('', superAdminGuardMiddleware, postInputDtoValidation, inputValidationResultMiddleware ,createPostHandler, );

postsRouter.put('/:id', idValidation, postInputDtoValidation,superAdminGuardMiddleware, inputValidationResultMiddleware, updatePostHandler);

postsRouter.delete('/:id', idValidation, superAdminGuardMiddleware, inputValidationResultMiddleware, deletePostHandler);

