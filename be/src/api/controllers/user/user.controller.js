const responseUtil = require('../../../utils/responseUtil');
const path = require("path");
const {param} = require("express/lib/router");
const api = require('express').Router();
const fakedata = require("../../../../fakedata.json")
const {SERVICE_CODE, TOKEN_SECRET} = require("../../../config/vars");

const {authenticateJWT} = require("../../auth.middleware");
const jwt = require("jsonwebtoken");

const createAxios = require('../../../utils/customAxios')
const axios = createAxios()

api.post('/login', async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const users = fakedata.users;
        for (let i = 0; i < users.length; i++) {
            const serviceUsername = `${SERVICE_CODE}${users[i].username}`;
            if (serviceUsername === username && users[i].password === password.toString()) {
                const accessToken = jwt.sign(serviceUsername, TOKEN_SECRET);
                return responseUtil.success(res, 200, {
                    token: accessToken,
                    status: "AUTH.SUCCESS"
                });
            }
        }
        return responseUtil.error(res, 200, {
            status: "AUTH.FAILED"
        });
    } catch (err) {
        console.log(err);
        return responseUtil.error(res, 400, err);
    }
});

api.get('/data', async (req, res, next) => {
    try {
        const {message} = req.query;
        let valid = false;
        let user = '';
        await axios.get(`/medichain/sharing/validate?message=${message}`).then(r => {
            console.log(r.data);
            const {code, data} = r.data;
            if (code === 200 && data.Sharing.status === "accepted") {
                valid = true;
                user = data.Owner.serviceUserId;
            }
        }).catch(err => {
            console.log(err);
        })
        if (valid) {
            const data = fakedata.data;
            const users = fakedata.users;
            for (let i = 0; i < data.length; i++) {
                const serviceUsername = `${SERVICE_CODE}${users[i].username}`;
                if (serviceUsername === user) {
                    return responseUtil.success(res, 200, {
                        data: `${serviceUsername} data`,
                        status: "GET.SUCCESS",
                    });
                }
            }
            return responseUtil.success(res, 200, {
                status: "GET.NOT_FOUND",
            });
        }
        return responseUtil.success(res, 200, {
            status: "AUTH.FAILED",
        });
    } catch (err) {
        console.log(err);
        return responseUtil.error(res, 400, err);
    }
});

api.post('/link', authenticateJWT, async (req, res, next) => {
    try {
        const {message} = req.query;
        await axios.post(`/medichain/service/user?message=${message}&serviceUser=${req.user}`).then(r => {
            console.log(r.data);
            const {code, data} = r.data;
            if (code === 200 && data.tx_response.code === undefined && data.tx_response.logs !== null) {
                return responseUtil.success(res, 200, {
                    data,
                    status: "LINK.SUCCESS"
                });
            }
            return responseUtil.error(res, 200, {
                status: "LINK.FAILED"
            });
        }).catch(err => {
            console.log(err.message);
            return responseUtil.error(res, 500, 'SERVER.ERROR');
        })
    } catch (err) {
        console.log(err.message);
        return responseUtil.error(res, 500, 'SERVER.ERROR');
    }
});

module.exports = api;
