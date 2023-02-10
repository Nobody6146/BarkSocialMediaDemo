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
}

export interface PostLikeDto {
    likeId:string;
    user:UserDto;
}