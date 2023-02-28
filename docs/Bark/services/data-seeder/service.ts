import { HydrateApp, HydrateAppService, HydrateAppServiceFactory } from "../../lib/hydrate/hydrate.js";
import { BarkComment, BarkCommentLike, BarkLogin, BarkPost, BarkPostLike, BarkProfile } from "../../models/models.js";
import { UuidService } from "../uuid/service.js";

interface SeedData {
    logins:BarkLogin[];
    profiles:BarkProfile[];
    posts:BarkPost[];
    postLikes:BarkPostLike[];
    comments:BarkComment[];
    commentLikes:BarkCommentLike[];
}

export class DataSeederService extends HydrateAppService
{
    #uuid:UuidService;

    constructor(hydrate:HydrateApp) {
        super();
        this.#uuid = hydrate.dependency(UuidService, this).instance;
    }

    seedData(): SeedData
    {  
        const logins:BarkLogin[]= [
            {
                id: this.#uuid.generateUUID(),
                emailAddress: "test1@email.com",
                password: "#Password123",
                username: "@johnnyboy11",
            },
            {
                id: this.#uuid.generateUUID(),
                emailAddress: "test2@email.com",
                password: "#Password123",
                username: "@themastertatertot",
            },
            {
                id: this.#uuid.generateUUID(),
                emailAddress: "test3",
                password: "#Password123",
                username: "@kawaiichief23",
            }
        ];

        const profiles:BarkProfile[] = [
            {
                id: this.#uuid.generateUUID(),
                firstName: "John",
                lastName: "Doe",
                image: "images/logo.png",
                loginId: logins[0].id
            },
            {
                id: this.#uuid.generateUUID(),
                firstName: "Matthew",
                lastName: "Smith",
                image: "images/logo.png",
                loginId: logins[1].id
            },
            {
                id: this.#uuid.generateUUID(),
                firstName: "Barbara",
                lastName: "Seller",
                image: "images/logo.png",
                loginId: logins[2].id
            }
        ];

        const dates = [
            new Date().toISOString(),
            "2021-12-31T04:00:00.751Z",
            "2022-02-09T21:15:00.751Z",
            "2022-05-21T17:57:00.751Z",
            "2023-01-01T01:55:00.751Z",
            "2023-02-14T12:23:00.751Z",
        ];
        const someLongText = "Yo, this is some really long text about a prompt I don't even know exists yet. There might be some day where I decide to do something different with my life but I don't think thtat today with be that day because I have no idea what I am even doing at the momment so I should probably stop...";
        const randomInt = function(max:number) {
            return Math.floor(Math.random() * max);
        }
        const randomValue = function<T>(array:T[]) {
            return array[randomInt(array.length)];
        }

        const posts:BarkPost[] = [];
        for(let i = 0; i < 30; i++)                     
            posts.push({
                id: this.#uuid.generateUUID(),
                date: randomValue(dates),
                loginId: randomValue(logins).id,
                text: someLongText.substring(0, randomInt(someLongText.length)),
            });

        const postLikes:BarkPostLike[] = [];
        for(let i = 0; i < posts.length/2 + randomInt(posts.length/2); i++)
        {
            const like:BarkPostLike = {
                id: this.#uuid.generateUUID(),
                postId: randomValue(posts).id,
                loginId: randomValue(logins).id
            }
            if(postLikes.find(x => x.postId === like.postId && x.loginId === like.loginId))
                continue;
            postLikes.push(like);
        }

        const comments:BarkComment[] = [];
        for(let i = 0; i < posts.length/2 + randomInt(posts.length/2); i++)
        {
            const comment:BarkComment = {
                id: this.#uuid.generateUUID(),
                postId: randomValue(posts).id,
                loginId: randomValue(logins).id,
                date: randomValue(dates),
                text: someLongText.substring(0, randomInt(someLongText.length)),
            }
            comments.push(comment);
        }

        const commentLikes:BarkCommentLike[] = [];
        for(let i = 0; i < comments.length/2 + randomInt(comments.length/2); i++)
        {
            const like:BarkCommentLike = {
                id: this.#uuid.generateUUID(),
                commentId: randomValue(comments).id,
                loginId: randomValue(logins).id
            }
            if(commentLikes.find(x => x.commentId === like.commentId && x.loginId === like.loginId))
                continue;
            commentLikes.push(like);
        }

        return {
            logins,
            profiles,
            posts,
            postLikes: postLikes,
            comments: comments,
            commentLikes: commentLikes
        }
    }
}

export let DataSeederServiceFactory:HydrateAppServiceFactory<DataSeederService> = function(hydrate:HydrateApp, source:any) {
    return new DataSeederService(hydrate);
}