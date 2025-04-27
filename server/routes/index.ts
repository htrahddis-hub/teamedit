import express, { Router } from "express";
import { signup, login, verify, createRoom, verifymiddleware } from "../controller/auth";
import { fetchFiles, saveFile, createFileSocket, deleteFile, renameFile, shareFile, fetchFileById } from "../controller/file";
import { fetchRedis, saveRedis } from "../redis";

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

router.get('/fetchfiles', verifymiddleware, async function (req, res, next) {
    const message: string = await fetchFiles(req.body.data.email);
    res.send(message);
});

router.post('/savefile', verifymiddleware, async function (req, res, next) {
    const message: string = await saveFile(req.body.content, req.body.fileId);
    res.send(message);
});

router.post('/createfile', verifymiddleware, async function (req, res, next) {
    const message: string = await createFileSocket(req.body.fileName, req.body.data.id);
    res.send(message);
});

router.post('/deletefile', verifymiddleware, async function (req, res, next) {
    const message: string = await deleteFile(req.body.data.id);
    res.send(message);
});

router.post('/renamefile', verifymiddleware, async function (req, res, next) {
    const message: string = await renameFile(req.body.data.name, req.body.data.id);
    res.send(message);
});

router.post('/sharefile', verifymiddleware, async function (req, res, next) {
    const message: string = await shareFile(req.body.userId, req.body.fileId);
    res.send(message);
});

router.get('/fetchfilebyid/:id', verifymiddleware, async function (req, res, next) {
    const message: string = await fetchFileById(req.body.data.id, parseInt(req.params.id));
    res.send(message);
});

router.post('/setredis', async function (req, res, next) {
    const message: string = await saveRedis(req.body.key, req.body.value);
    res.send(message);
});

router.get('/getredis/:id', async function (req, res, next) {
    const message: string = await fetchRedis(req.params.id);
    res.send(message);
});

export default router;