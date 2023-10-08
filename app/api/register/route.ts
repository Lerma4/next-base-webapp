import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { log } from "console";

const prisma = new PrismaClient();

class User {
    name: string = '';
    surname: string = '';
    email: string = '';
    password: string = '';
}

export async function POST(request: any) {

    try {

        const body = await request.json();
        const user: User = body.data;
        log(body);
        log(user);
        const exist = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        })

        if (exist)
            return new NextResponse("Esiste già un utente con questa e-mail", { status: 400 })

        const hashedPassword = await bcrypt.hash(user.password, 10)

        const newUser = await prisma.user.create({
            data: {
                name: user.name,
                surname: user.surname,
                email: user.email,
                password: hashedPassword
            }
        })

        return new NextResponse();
    } catch (e) {
        log(e)
        return new NextResponse("Errore di tipo generico durante la registrazione", { status: 500 })
    }
}