interface IType<T>{
    status:number,
    msg:string | null,
    data?:T
}

type Res<T> = Promise<IType<T>>;

export interface infoResponse{
    success:boolean,
    message?:string,
    data?:any
}

export default Res;