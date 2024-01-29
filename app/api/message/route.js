import db from "../../../lib/db";
import Message from "../../../models/message";

export const GET = async (request) => {
    await db.connect();

    const randomM = await Message.aggregate([{ $sample: { size: 1 } }]).exec();
    const message = randomM[0].message;

    return Response.json(message);
}

export const POST = async (request) => {
    await db.connect();
    const data = await request.json();
    // console.log(data)
    const newMessage = new Message({message: data});
    await newMessage.save();

    return new Response("success");
}