import express, { Express } from "express";
import {BLOGS_PATH, POSTS_PATH} from "./core/path/paths";
import {blogsRouter} from "./blogs/routers/blog.rounter";
import {postsRouter} from "./posts/routes/posts.route";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    // основной роут
    app.get("/", (req, res) => {
        res.status(200).send("Hello world!");
    });

    app.use(BLOGS_PATH, blogsRouter);
    app.use(POSTS_PATH, postsRouter)

    return app;
};