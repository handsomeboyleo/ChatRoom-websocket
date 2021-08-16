const http = require("http");
const fs = require('fs');
const querystring = require("querystring")
const webSocket = require("ws");
const dayjs = require('dayjs')

const hostname = "127.0.0.1"; //主机号
const port = 8000; //端口号
let userWs = {}; // websocket连接用户
let online = 0; // websocket当前在线人数
let onlineUser = [] //websocket当前在线用户名

/**
 * 将消息写入本地记事本
 * @params message
 */
const fsSaveMsgsLog = (msg) => fs.appendFile('./allMsgs.txt', msg, function (error) {
    // 此处回调函数主要用于返回写入文件时的结果。error代表一个错误对象。
    if (error) {
        console.log(error);
        return console.log('内容写入失败！');
    }
})
/**从本地记事本读取所有记录
 * @params callback(error,data) 
 */
const fsReadAlllog = (callback) => fs.readFile('./allMsgs.txt', 'utf-8', callback)

/**
 * @http
 * Server
 */
const httpServer = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //可设置允许跨域地址
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,X_Requested_With,Content-Type"); // 允许post请求
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("Content-Type", "application/json;charset=utf-8");

    console.log('http请求 ' + req.url);
    // 匹配路由
    if (req.url == '/getAllMessagesList') {
        fsReadAlllog(function (error, data) {
            if (error) {
                console.log('错误信息：');
                throw error;
            }
            const body = JSON.stringify({
                code: '200',
                data: JSON.parse(`[${data}]`),
                status: 'success'
            })
            res.end(body, () => {})
        })
    }
    if (req.url == "/getOnlineUsers") {
        const body = JSON.stringify({
            code: '200',
            data: onlineUser,
            status: 'success'
        })
        res.end(body, () => {})
    }
    if(req.url=='/getRecentMessages'){
        let body=''
        req.on('data',(chunk)=>{
            body+=chunk
        })
        req.on('end',()=>{
            body = querystring.parse(body);
            console.log(body.name)
        })
        res.end()
    }
});
httpServer.listen(port, hostname, () => {
    console.log(` -- %chttpServer : http://${hostname}:${port}/`, 'color:blue');
});

/**
 * @websocket
 *  Server
 */
const websocketServer = new webSocket.Server({
    port: port,
    maxPayload:60000
}, () => {
    console.log(` -- %cwebsocketServer : http://${hostname}:${port}/ `, 'color:blue');
});
/**
 * 广播消息（所有人）
 * @param  message  
 */
const broadcast = (message) => {
    websocketServer.clients.forEach(each=(client)=> {
        if (client.readyState === webSocket.OPEN) {
            client.send(message);
        }
    });
};
websocketServer.on("connection",  (ws, req) =>{
    online = websocketServer._server._connections;
    const currentUser = decodeURI(req.url.match(/(?<=\?)[^:]+?(?=:|$)/)); //提取此次连接是谁,这部分代码只有第一次连接的时候运行,如果后面连接的m值相同,前面的连接会被覆盖身份
    if (currentUser) {
        userWs[currentUser] = ws;
        onlineUser.push(currentUser);
        onlineUser = [...new Set(onlineUser)]
    }
    console.log("ws在线 " + online + "人");
    broadcast(
        JSON.stringify({
            type: 'OPERATION',
            from: "WebsocketServer",
            msg: currentUser + " 上线了 " + "当前在线 " + online,
            to: "everyone",
            time: dayjs().format('YYYY-MM-DD HH:mm:ss')
        })
    );
    ws.on("message", function (msg) {
        const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss') // 当前消息时间
        const reqMsg = JSON.parse(msg); // 解析msg
        const targetUser = reqMsg.to;
        // 当前消息体
        const message = JSON.stringify({
            type: 'MESSAGE',
            from: currentUser,
            msg: reqMsg.msg,
            to: targetUser,
            time: currentTime
        });
        console.log("ws新消息 " + message);
        fsSaveMsgsLog(',' + message)
        if (targetUser === "everyone") {
            broadcast(JSON.stringify({
                type: 'MESSAGE',
                from: currentUser,
                msg: reqMsg.msg,
                to: "everyone",
                time: currentTime
            })); //广播
        } else {
            if (userWs[targetUser]) {
                if (userWs[targetUser].readyState === 1) {
                    userWs[targetUser].send(message);
                    ws.send(message);
                } else {
                    // ws.send("对方掉线");
                }
            } else {
                // ws.send("找不到对象");
            }
        }
    });
    if (online != websocketServer._server._connections) {
        online = websocketServer._server._connections;
        ws.send(
            JSON.stringify({
                type: 'OPERATION',
                from: 'WebsocketServer',
                msg: "当前在线" + online + "个连接",
                to: "everyone",
                time: dayjs().format('YYYY-MM-DD HH:mm:ss')
            })
        );
    }
});
websocketServer.on('close',(ws)=>{
     broadcast(
        JSON.stringify({
            type: 'OPERATION',
            from: "WebsocketServer",
            msg: ws + " 下线 " + "当前在线 " + online,
            to: "everyone",
            time: dayjs().format('YYYY-MM-DD HH:mm:ss')
        })
    );
    console.log(ws,下线了)
})