const http = require("http");
const fs = require('fs');
const mysql=require('mysql')
const qs = require("querystring")
const webSocket = require("ws");
const dayjs = require('dayjs')

const hostname = "127.0.0.1"; //主机号
const port = 5050; //端口号
let userWs = {}; // websocket连接用户
let online = 0; // websocket当前在线人数
let onlineUser = [] //websocket当前在线用户名

var sqlDb=mysql.createConnection({
    host:hostname,
    user:'root',
    password:'525952',
    database:'chatroom'
})
sqlDb.connect((err)=>{
    if(err){
        console.log('数据库连接失败：'+err);
    }else{
        console.log(' -- Database connection succeeded');
    }
});

/**
 * 消息存入数据库
 * @param {msg} callback 
 * @returns 
 */
const saveMessageToDataBase = (msg) => {
    let sql=`INSERT INTO allmsgs (msg,time,type,user,target,isread) VALUES ('${msg.msg}','${msg.time}','${msg.type}','${msg.user}','${msg.target}','${msg.read}');`
    console.log(sql)
    sqlDb.query(sql,(err,data)=>{
        if(err)throw err
        console.log(data)
    })
}
/**从本地Json读取所有聊天记录
 * @params callback(error,data) 
 */
const fsReadAlllog = (callback) => fs.readFile('./AllMsgs.json', 'utf-8', callback)
/**
 * 将消息写入本地聊天记录Json
 * @params message
 */
const fsSaveMsgsLog = (msg) => fsReadAlllog((err, data) => {
    if (err) {
        return console.error(err);
    }
    var allMsgs = data.toString(); //将二进制的数据转换为字符串
    allMsgs = JSON.parse(allMsgs); //将字符串转换为json对象
    allMsgs.push(msg); //将传来的对象push进数组对象中
    var strAllMsgs = JSON.stringify(allMsgs, null, "\t"); //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile('./AllMsgs.json', strAllMsgs, function (err) {
        // 此处回调函数主要用于返回写入文件时的结果。error代表一个错误对象。
        if (err) {
            console.error(err);
        }
    })
})
/**从本地用户Json读取所有记录
 * @params callback(error,data) 
 */
const fsReadUsers = (callback) => fs.readFile('./Account.json', 'utf-8', callback)
/**
 * 将用户写入本地用户Json
 * @params message
 */
const fsSaveUser = (user) => fsReadUsers((err, data) => {
    if (err) {
        return console.error(err);
    }
    var users = data.toString(); //将二进制的数据转换为字符串
    users = JSON.parse(users); //将字符串转换为json对象
    users.push(user); //将传来的对象push进数组对象中
    var strUsers = JSON.stringify(users, null, "\t"); //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    fs.writeFile('./Account.json', strUsers, function (err) {
        // 此处回调函数主要用于返回写入文件时的结果。error代表一个错误对象。
        if (err) {
            console.error(err);
        }
    })
})

/**
 * @http
 * Server
 */
const httpServer = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //可设置允许跨域地址
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,X_Requested_With,Content-Type"); // 允许post请求
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("Content-Type", "application/json;charset=utf-8");

    console.log('http: ' + req.url);
    // 匹配路由
    if (req.url == '/register') {
        let reqbody = ''
        req.on('data', function (chunk) {
            reqbody += chunk
        })
        req.on('end', function () {
            if(reqbody!==''){
                reqbody = JSON.parse(reqbody);
            }
        })
        fsReadUsers(function (error, data) {
            if (error) {
                console.log('错误信息：');
                throw error;
            }
            var users = JSON.parse(data.toString()); //将二进制的数据转换为字符串再转换为JSON对象
            const existUserName=users.some((user)=>(user.userName===reqbody.userName))
            const existEmail=users.some((user)=>(user.email===reqbody.email))
            const existMobile=users.some((user)=>(user.mobile===reqbody.mobile))
            const exist=existUserName||existEmail||existMobile
            const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss') // 当前消息时间
            if(exist){
                 const body = JSON.stringify({
                    code: '200',
                    data: false,
                    message:existUserName&&'existUserName'||existEmail&&'existEmail'||existMobile&&'existMobile',
                    status: 'success'
                })
                res.end(body, () => {})
            }else{
                fsSaveUser({
                    userId:users[users.length-1].userId+1,
                    ...reqbody,
                    createTime:currentTime,
                    type:'USER'
                })
                const body = JSON.stringify({
                    code: '200',
                    data: true,
                    status: 'success'
                })
                res.end(body, () => {})
               
            }
        })
    }
    if (req.url == '/login') {
        let reqbody = ''
        req.on('data', function (chunk) {
            reqbody += chunk
        })
        req.on('end', function () {
            if(reqbody!==''){
                reqbody = JSON.parse(reqbody);
            }
        })
        fsReadUsers(function (error, data) {
            if (error) {
                console.log('错误信息：');
                throw error;
            }
            var users = JSON.parse(data.toString()); //将二进制的数据转换为字符串再转换为JSON对象
            const isLogin=users.some((user)=>(user.email===reqbody.account&&user.password===reqbody.password))
            const current =isLogin&& users.find((user)=>(user.email===reqbody.account))
            const body = JSON.stringify({
                code: '200',
                data: isLogin?{
                            userName:current.userName,
                        }:false,
                status: 'success'
            })
            res.end(body, () => {})
        })
    }
    if (req.url == '/getAllMessagesList') {
        fsReadAlllog(function (error, data) {
            if (error) {
                console.log('错误信息：');
                throw error;
            }
            var allMsgs = data.toString(); //将二进制的数据转换为字符串
            const body = JSON.stringify({
                code: '200',
                data: JSON.parse(allMsgs),
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
    if (req.url == '/getRecentMessages') {
        var reqbody = ''
        req.on('data', function (chunk) {
            reqbody += chunk
        })
        req.on('end', function () {
            // if(reqbody!==''){
            //     reqbody = JSON.parse(reqbody);
            // }
            var o=JSON.stringify(qs.parse(reqbody))
            reqbody=JSON.parse(o)
            console.log(o)
              let sql=`SELECT * FROM chatroom.allmsgs where user='${reqbody.name}' and target='${reqbody.target}';`
            console.log(sql)
            sqlDb.query(sql,(err,data)=>{
                if(err) throw err
                console.log(data)
                const body = JSON.stringify({ 
                    code: '200',
                    data: data,
                    status: 'success'
                })
                res.end(body, () => {})
            })

        })
      
        // fsReadAlllog(function (error, data) {
        //     if (error) {
        //         console.log('错误信息：');
        //         throw error;
        //     }
        //     var allMsgs = JSON.parse(data.toString()); //将二进制的数据转换为字符串再转换为JSON对象
        //     allMsgs=allMsgs.filter((msg) =>
        //     (
        //         msg.user === reqbody.name && msg.target === reqbody.target
        //         || msg.user===reqbody.target && msg.target === reqbody.name
        //     ))
        //     const body = JSON.stringify({ 
        //         code: '200',
        //         data: allMsgs,
        //         status: 'success'
        //     })
        //     res.end(body, () => {})
        // })
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
    maxPayload: 60000
}, () => {
    console.log(` -- %cwebsocketServer : http://${hostname}:${port}/ `, 'color:blue');
});
/**
 * 广播消息（所有人）
 * @param  message  
 */
const broadcast = (message) => {
    websocketServer.clients.forEach((client) => {
        if (client.readyState === webSocket.OPEN) {
            client.send(message);
        }
    });
};
//前端用户创建连接
websocketServer.on("connection", (ws, req) => {
    online = websocketServer._server._connections;
    const currentUser = decodeURI(req.url.match(/(?<=\?)[^:]+?(?=:|$)/)); //提取此次连接是谁,这部分代码只有第一次连接的时候运行,如果后面连接的m值相同,前面的连接会被覆盖身份
    if (currentUser) {
        userWs[currentUser] = ws;
        onlineUser.push(currentUser);
        onlineUser = [...new Set(onlineUser)]
    }
    console.log("ws: " + online);
    broadcast(
        JSON.stringify({
            type: 'OPERATION',
            from: "WebsocketServer",
            to: "everyone",
            time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            msg: currentUser + " 上线了 " + "当前在线 " + online
        })
    );
    //当前用户下线
    ws.on('close', () => {
        console.log(currentUser, '下线了')
        delete userWs[currentUser]
        onlineUser=  onlineUser.filter((user)=>(user!==currentUser))
        console.log(onlineUser)
        ws.close()
        online = websocketServer._server._connections;
    })
    //接受前端信息
    ws.on("message", function (msg) {
        const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss') // 当前消息时间
        const reqMsg = JSON.parse(msg); // 解析msg
        const targetUser = reqMsg.target;
        // 当前消息体
        const originMessage = {
            type: 'MESSAGE',
            user: currentUser,
            target: targetUser,
            time: currentTime,
            msg: reqMsg.msg ,
            read: 0
        }
        const message = JSON.stringify(originMessage);
        saveMessageToDataBase(originMessage)
        fsSaveMsgsLog(originMessage)
        console.log("ws: " + message);
        if (targetUser === "everyone") {
            broadcast(JSON.stringify({
                type: 'MESSAGE',
                user: currentUser,
                target: "everyone",
                time: currentTime,
                msg: reqMsg.msg
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
                user: 'WebsocketServer',
                target: "everyone",
                time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                msg: "当前在线" + online + "个连接"
            })
        );
    }
});