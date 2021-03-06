import { EPageSection, EStatus } from "./enums";

export interface IUser{
    id:string
    first_name:string,
    last_name:string,
    email:string,
    password:string,
    title:string,
    role:string,
    status:EStatus
}

export interface ICustomerBooking{
    id:string
    names:string,
    email:string,
    phone_number:string,
    visit_id:string // choosing date 
    read_by:string[],
    status:EStatus
}

export interface IMessage{ // contact us
    id:string
    names:string,
    email:string,
    phone_number:string,
    message:string,
    read_by:string[],
    status:EStatus
}
export interface IVisit{
    id:string
    title:string,
    date:Date
    status:EStatus
}
export interface IJob{
    id:string
    position:string,
    overview:string,
    file:string,
    job_link:string
    status:EStatus
}
export interface INewsEvent{
    id:string
    file_link:string,
    title:string,
    content:string
    status:EStatus
}
export interface IResidenceProfile{
    id:string
    file_link:string,
    names:string,
    content:string
    status:EStatus
}

export interface IProject{
    id:string
    file_link:string,
    name:string,
    content:string
    status:EStatus
}
export interface ISitePage{
    id:string
    file_link:string,
    title:string,
    content:string
    section:EPageSection
    status:EStatus
}
