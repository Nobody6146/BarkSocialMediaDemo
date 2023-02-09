export interface UserDto {
    userId:string;
    username:string;
    emailAddress:string;
    firstName:string;
    lastName:string;
    image:string;
}

export interface PostDto {
    id:string;
    user:UserDto;
    date:string;
    text:string;
}