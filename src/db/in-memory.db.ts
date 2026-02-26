import { Blog } from '../blogs/types/blog'
import { Post } from '../posts/types/post'

export const db = {
    blogs: <Blog[]>[
        {
            id: 1,
            name: 'Ponik',
            description: 'iam a cat',
            websiteUrl: 'https://www.ponik.com/',
        },
        {
            id: 2,
            name: 'Romanich',
            description: 'iam Roman i ch',
            websiteUrl: 'https://www.romaroma.com/',
        },
        {
            id: 3,
            name: 'Stus',
            description: 'Stus Sus',
            websiteUrl: 'https://www.stick.com/',
        },
    ],
    posts: <Post[]>[],
}