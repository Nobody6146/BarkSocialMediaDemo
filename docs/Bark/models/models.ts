
export interface BarkLogin {
    id:string;
    username:string;
    emailAddress:string;
    password:string;
}

export interface BarkProfile {
    id:string;
    loginId:string;
    firstName:string;
    lastName:string;
    image:string;
}

export interface BarkPost {
    id:string;
    loginId:string;
    date:string;
    text:string;
}

export interface BarkComment {
    id:string;
    loginId:string;
    date:string;
    text:string;
}

export interface BarkPostLike {
    id:string;
    postId:string;
    loginId:string;
}

export interface BarkCommentLike {
    id:string;
    loginId:string;
    commentId:string;
}