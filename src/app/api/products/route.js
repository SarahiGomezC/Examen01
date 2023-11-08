import {NextResponse} from "next/server";
import {conn } from "@/libs/mysql";

export  async function GET(){
    try {
        const results=await conn.query("SELECT * FROM propiedades");
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(
            {message:error.message},
            {status:500}
        );
    }
}

export async function POST(request){
    try {
        const {nombre, direccion, caracteristicas, estado, precio}= await request.json();
        const result = await conn.query("INSERT INTO propiedades SET ?",{
            nombre,
            direccion,
            caracteristicas,
            estado,
            precio
        });
        return NextResponse.json({
            id:result.insertId,
            nombre,
            direccion,
            caracteristicas,
            estado,
            precio
        })

    } catch(error){
        return NextResponse.json(
            {message:error.message},
            {status:500}
        );
    }
}

/*export function GET(){
    return NextResponse.json({message: "Hola"});
}

}*/