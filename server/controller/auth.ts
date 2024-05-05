// import { MongooseError } from "mongoose";
import UserModel from "../model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { io } from "..";
import { RequestHandler } from "express";
// import { totp } from "otplib";
// import nodemailer from "nodemailer";
// import { log } from "console";
// import SMTPTransport from "nodemailer/lib/smtp-transport";


interface IUser {
	email: string;
	password: string;
	Fname: string;
	Lname: string;
	otp?: string;
	token?: string;
}
interface ILogin {
	email: string;
	password: string;
	otp?: string;
	token?: string;
}

interface IToken {
	UserId: string;
}

function validateEmail(email: string): boolean {
	const regexp = new RegExp(
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
	return regexp.test(email);
};

function validatePassword(password: string): boolean {
	const regexp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
	return regexp.test(password);
}

function validateName(name: string): boolean {
	if (name.length > 0)
		return true;
	else
		return false;
}

export const verifymiddleware: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers?.authorization as string;

    if (token.startsWith("Bearer")) {

      const decoded: any = jwt.verify(token.substring(7), process.env.TOP_SECRET as string);
      const User = await UserModel.findById(decoded.User_Id);
      if (User?.token === token.substring(7))
        next();
      else
        res.status(401).send({ message: "unauthorized" });
    }
    else
      res.status(401).send({ message: "unauthorized" });
  }
  catch (err) {
    res.status(401).send({ message: "unauthorized" });
  }
}

export async function signup(user: IUser): Promise<string> {
	try {
		if (validateEmail(user.email)
			&& validatePassword(user.password)
			&& validateName(user.Fname)
			&& validateName(user.Lname)) {
			user.password = await bcrypt.hash(user.password, 10);
			const User = await UserModel.create(user);
			if (User)
				return "successful";
			else
				return "failed";
		}
		else
			return "not valid email or password";
	}
	catch (err) {
		console.log(err);
		return "User Already exist";
	}
}

export async function login(user: ILogin): Promise<string> {
	try {
		const User = await UserModel.findOne({ email: user.email });
		if (!User) {
			return JSON.stringify({ token: "", message: "emailId or password is invalid" });
		}

		const validate = await bcrypt.compare(user.password, User.password);
		if (!validate) {
			return JSON.stringify({ token: "", message: "emailId or password is invalid" });
		}

		const token = jwt.sign({ User_Id: User._id }, process.env.TOP_SECRET as string, {
			expiresIn: "48h"
		});
		User.token = token;

		User.save();
		const result: any = { token: User.token, message: "successful" }
		return JSON.stringify(result);

	}
	catch (err) {
		console.log(err);
		return JSON.stringify({ token: "", message: "Internal Server Error" });
	}
}

export async function verify(token: string): Promise<string> {
	try {
		console.log(token);

		if (token.startsWith("Bearer")) {

			const decoded: any = jwt.verify(token.substring(7), process.env.TOP_SECRET as string);
			const User = await UserModel.findById(decoded.User_Id);
			if (User?.token === token.substring(7))
				return JSON.stringify({ email: User.email, message: "successful" });
			else
				return JSON.stringify({ email: "", message: "failure" });
		}
		else
			return JSON.stringify({ email: "", message: "failure" });

	}
	catch (err) {
		return JSON.stringify({ email: "", message: "failure" });
	}
}

export async function createRoom(req: string): Promise<string> {
	try {
		console.log(req);
		const data = io.of('/').adapter.rooms;

		console.log(data);


		return "happy"

	}
	catch (err) {
		return "failure";
	}
}

// export async function forgot(email: string): Promise<string> {
// 	try {
// 		const User = await UserModel.findOne({ email: email }).lean();
// 		if (!User) {
// 			return "This email ID is not registered";
// 		}

// 		const token: string = totp.generate(process.env.TOP_SECRET as string);
// 		const html: string = `
//       <h3>Hello , </h3>
//       <p>Here is your OTP for resetting password of account ${email}.</p>
//       <p>Reset Link: ${token}</p>
//       <br/>
//       <p> If you didn't request this, please change your password, and check your account activity.</p>
//       <p>Thank You</p>
//       `

// 		const mailTransporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
// 			service: 'gmail',
// 			auth: {
// 				user: 'siddharthtest16@gmail.com',
// 				pass: process.env.PASSWORD
// 			}
// 		});

// 		const mailDetails = {
// 			from: 'no-reply siddharthtest16@gmail.com',
// 			to: email,
// 			subject: 'Password Change',
// 			html: html
// 		};

// 		await mailTransporter.sendMail(mailDetails);
// 		return "successful";
// 	}
// 	catch (err) {
// 		return "failure";
// 	}
// }

// export async function reset(user: IUser): Promise<string> {
// 	try {
// 		const { otp, password, email } = user;
// 		if (otp) {
// 			if (totp.check(otp, process.env.TOP_SECRET as string)) {
// 				const User = await UserModel.findOne({ email: email });
// 				if (!User) return 'invalid email ID';
// 				else {
// 					const hashedPassword = await bcrypt.hash(password, 10);
// 					User.password = hashedPassword;
// 					await User.save();
// 				}
// 				return "Successful";
// 			}
// 			return "Failed invalid OTP";
// 		}
// 		return "Failed invalid otp"
// 	}
// 	catch (err) {
// 		return "Failed";
// 	}
// }
