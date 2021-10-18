export interface IUser{
    id:string
    first_name:string,
    last_name:string,
    email:string,
    username:string,
    password:string,
    title:string,
    role:string
}

export interface CustomerBooking{
    names:string,
    email:string,
    phone_number:string,
    date_id:string // choosing date 
}

export interface IMessage{ // contact us
    names:string,
    email:string,
    phone_number:string,
    message:string
}
export interface IVisit{
    title:string,
    date:Date
}
export interface IJob{
    position:string,
    overview:string,
    file:string,
    job_link:string
}
export interface INewsEvent{
    featured_image:string,
    title:string,
    content:string
}
export interface IResidenceProfile{
    profile_image:string,
    names:string,
    content:string
}