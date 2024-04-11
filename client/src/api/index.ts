import axios from "axios";
import { Socket } from "socket.io-client";

const url: string = "http://localhost:3000/socket/";

export async function test(socket: Socket): Promise<string | any> {
	try {

		socket.emit('join room', { room: "file.txt" });
		const { data } = await axios.get(url + 'room/name');
		return data;

	} catch (error) {

	}

}

