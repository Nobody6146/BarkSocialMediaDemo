export interface UserDto {
    userId:string;
    username:string;
    emailAddress:string;
    firstName:string;
    lastName:string;
    image:string;
}

export interface PostDto {
    postId:string;
    user:UserDto;
    date:string;
    text:string;
    likes:PostLikeDto[];
    comments:CommentDto[];
}

export interface PostLikeDto {
    likeId:string;
    user:UserDto;
}

export interface CommentDto {
    commentId:string;
    post:PostDto;
    user:UserDto;
    date:string;
    text:string;
    likes:CommentLikeDto[];
}

export interface CommentLikeDto {
    likeId:string;
    user:UserDto;
}