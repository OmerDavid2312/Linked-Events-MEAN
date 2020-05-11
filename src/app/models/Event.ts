export interface EventData {
    _id?:string,
    creator?:string,
    name:string,
    description:string,
    maxparticipants:number,
    category:string,
    link:string,
    participants?:[],
    eventdate:Date
}
