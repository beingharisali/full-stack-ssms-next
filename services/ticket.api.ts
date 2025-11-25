
import http from "./http";
import { ticket } from "@/types/ticket";
export async function create(
     category: string,
      title: string,
       desc: string,
       priority:string,
       status: string,
       price:string,
       
): 
Promise<{ticket : ticket; token:string}>{
    const res = await http.post("/create-ticket", {
        category,
        title,
        desc,
        priority,
        status,
        price,
    })
    return res.data;
}
export async function get(
     category: string,
      title: string,
       desc: string,
       priority:string,
       status: string,
       price:string,
       
): 
Promise<{ticket : ticket; token:string}>{
    const res = await http.get("/tickets", {
        params: {
            category,
            title,
            desc,
            priority,
            status,
            price,
        }
    })
    return res.data;
}
