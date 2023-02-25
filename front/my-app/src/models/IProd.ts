export interface IProd  {
    id: Number
    category:string
    currency:string
    description:string
    title:string
    image:string
    price:number
}

export interface IProds{
    prods:IProd[]
}
