import express, { Router } from "express";
import { signup, login, verify , createRoom } from "../controller/auth";

const router: Router = express.Router();

router.post('/signup', async function (req, res, next) {
    const message: string = await signup(req.body);
    res.send(message);
});

router.post('/login', async function (req, res, next) {
    const message: string = await login(req.body);
    res.send(message);
});

router.post('/verify', async function (req, res, next) {
    const message: string = await verify(req.headers?.authorization as string);
    res.send(message);
});

router.get('/room/:name', async function (req, res, next) {
    const message: string = await createRoom(req.params.name);
    res.send(message);
});

export default router;