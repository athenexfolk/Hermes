# api

## How to start server

### On Local Computer

1. install dependencies

```bash
npm install
```

1. start server

```bash
# for dev [live change by nodemon]
npm run dev

# for production
npm start
```

### On Docker just for live server

1. start container

```bash
docker-compose up
```

If you change or install new npm packages or change docker file you can run `docker-compose up -d --no-deps --build <service name | let it empty>` to rebuild docker

## APIs design

### Authentication

- `POST` /account/register

```Typescript
let body :{
    id: string,
    displayName: string,
    password: string,
    avatar: string,
}
```

- `GET` /account/login

```typescript
// [EX] GET /account/login?username=areya&password=1234 HTTP/1.1
let query :{
   username : string,
   password: string? ,
}

let response :{
    tokenType : string,
    accessToken: string,
    refreshToken: string,
    expiresIn: number | string
}
```

- `GET` /account/token/refresh

```typescript
// [EX] GET /account/token/refresh?token=[jwt] HTTP/1.1
let query :{
   token:string
}

let response :{
    tokenType : string,
    accessToken: string,
    refreshToken: string,
    expiresIn: number | string
}
```

### Profiles

- `GET` /profile/:id

parameter `:id` for user id

```typescript
let response :{
    username: string,
    avatar: string,
    displayName: string
}
```

- `GET` /profile

Attach Header `Authorization` : `Bearer [jwt]`

```typescript
let response : {
    userid: string,
    username: string,
    avatar: string,
    displayName: string
}
```

- `PATCH` /profile/displayname/:displayname

Attach Header `Authorization` : `Bearer [jwt]`

`displayname` : New display name

- `PATCH` /profile/avatar

Attach Header `Authorization` : `Bearer [jwt]`

```Typescript
let body :{
    ["b64-img"]: string
}
```

### Chat

- `GET` /chats

Attach Header `Authorization` : `Bearer [jwt]`

```typescript
let response : [
    {
        type: "group"|"private",
        chatID: string,
        chatName: string,
        image: string,
        colour: string,
        lastMassage: any
    }
]
```

- `GET` /chats/:ref

pagenation query chat history

attach Header `Authorization` : `Bearer [jwt]`

```javascript
// params
// ref=[messageID | chatID] to load more chat before ref message
// ex. /chat/messageID mean load chat history before ref message

// Response
let response: [
    {
        chatId:string,
        messageId:string,
        sender:string,
        timestamp:Date
        chatContent:any
    }
]

```

- `POST` /chats

Add new conversation

Attach Header `Authorization` : `Bearer [jwt]`

```Typescript
let body : {
    type: "private" | "group",
    to : string[], //
    chatName: string,
    image: string,
    color: string
}

let response:{
        type: "group"|"private",
        chatID: string,
        chatName: string,
        image: string,
        colour: string,
        lastMassage: any
    }
```

- `WS` /chat

Attach Header `Authorization` : `Bearer [jwt]`

```typescript
// On message:send
// Get sended message from client
let context : {
    chatId:string,
    chatContent:{}
}

// Emit message
// Boadcast message to dest client
let context : {
    chatId:string,
    messageId:string,
    sender:string,
    timestamp:Date,
    chatContent:any
}
```

<details>

  <summary>Example html and js client code</summary>

```html
<body>
    <script src="https://cdn.socket.io/3.1.3/socket.io.min.js"
        integrity="sha384-cPwlPLvBTa3sKAgddT6krw0cJat7egBga3DJepJyrLl4Q9/5WLra3rrnMcyTyOnh"
        crossorigin="anonymous"></script>

    <input type="text" id="namespace" placeholder="namespace" value="chat">
    <input type="text" id="token" placeholder="token" value="Bearer auth_token">
    <button id="connectbtn" onclick="connectSocket(token.value)">connectSocket</button>
    <input type="text" id="chatid" placeholder="chatid" value="6501f75c0af993316f6f2e30">
    <hr>

    <div id="chat">
        <button onclick="addMessageBlog({msg:'anirut'})" hidden>add</button>
    </div>
    <input type="text" id="message" placeholder="Enter your message">
    <button onclick="sendMessage({chatId:chatid.value,chatContent:message.value})">send</button>

</body>

<script>
    var socket;

    const connectSocket = token => {
        socket = io(`ws://localhost:3000/${namespace.value}`, {
            auth: (cb) => {
                cb({
                    token: token
                });
            }
        });
        socket.on("message",resiveMsg);
    };

    function resiveMsg(msg){
        addMessageBlog(msg);
    }

    function addMessageBlog(context){
        const msg = document.createElement("p");
        msg.innerHTML = JSON.stringify(context);
        chat.appendChild(msg);
    }

    function sendMessage(context){
        if(!socket) connectbtn.click();
        socket.emit("message:send",context);
    }
</script>

```

</details>

### Error response

```typescript
response : {
    error: string,
    msg: string
}
```
