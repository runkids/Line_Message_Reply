var express =require('express');
var bodyParser =require( 'body-parser');
var request =require( 'request');
var config =require( '../config');

const app = express();

//透過Heroku隨機取得的PORT 
var port = process.env.PORT || 8080;

//從config.js取個參數值
const [CHANNEL_ID, CHANNEL_SERECT, Channel_Access_Token ,FIXIE_URL] = [config['CHANNEL_ID'],config['CHANNEL_SERECT'],config['Channel_Access_Token'],config['FIXIE_URL']];

//api url
const LINE_API = 'https://api.line.me/v2/bot/message/reply';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/callback', (req, res) => {
  const eventsVal = req.body.events;
  
  for(let i=0; i<eventsVal.length; i++){
    
    const data = eventsVal[i]['message'];

    if(data.type=="text"){
      if(data.text=='沒錯'||data.text=='是'||data.text=='嗯'||data.text=='對'||data.text=='嗯嗯'){
        let mes=["","恩恩 ^＿^","好喔～","A_A"]
        sendTextMessage(eventsVal[i]['replyToken'],shuffleArray(mes),data.type);
      }else if (data.text===undefined){
        sendTextMessage(eventsVal[i]['replyToken'], "抱歉...我不知道啥意思ＱＱ",data.type);
      }else if (data.text.toUpperCase()=='EGG'||data.text.toUpperCase()+"?"=='EGG?'){
        sendTextMessage(eventsVal[i]['replyToken'], "我就是Egg,Egg就是我啊!",data.type);
      }else if (data.text=="?"){
        sendTextMessage(eventsVal[i]['replyToken'],"?",data.type);
      }else{
        let mes=["",data.text+" O.O？","71","你剛是說' "+data.text+" '嗎??"]
        sendTextMessage(eventsVal[i]['replyToken'],shuffleArray(mes),data.type);
      }
    }else{
      sendTextMessage(eventsVal[i]['replyToken'],"",data.type);
    }
  }
});

app.listen(port, () => console.log(`listening on port ${port}`));

function sendTextMessage(sender, text ,type) {
  var stickerIdVal = ["","520","524","163","18","154","153","151","152","521","165","167"]
  var qq=["","150","149"]
  var data;
if(type=='text'){
    if (text=="71"){
      data = {
        replyToken: sender,
        messages: [{
          type:"text",
          text:"先別提其它了,不覺得結依太犯規了嗎？><"
        },
        {
          type: "image",
          originalContentUrl: "https://images.gamme.com.tw/news2/2016/35/50/qZqZnqWdk6Weq6Q.jpg",
          previewImageUrl: "https://images.gamme.com.tw/news2/2016/35/50/qZqZnqWdk6Weq6Q.jpg"
        }]
      };
    }else if (text=="?"){
      data = {
        replyToken: sender,
        messages: [{
          type:"sticker",
          packageId: "2",
          stickerId: shuffleArray(qq)
        }]
      };
    }else{
      data = {
        replyToken: sender,
        messages: [{
          type:"text",
          text:text
        }]
      };
    }
}else{
   data = {
    replyToken: sender,
    messages: [{
      type:"sticker",
      packageId: "2",
      stickerId: shuffleArray(stickerIdVal)
    }]
  };
}

  console.log('send: ', data);

  request({
    url: LINE_API,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      // 'X-Line-ChannelID': CHANNEL_ID,
      // 'X-Line-ChannelSecret': CHANNEL_SERECT,
      // 'X-Line-Trusted-User-With-ACL': Channel_Access_Token,
      'Authorization': 'Bearer <'+Channel_Access_Token+'>'
    },
    proxy : process.env.FIXIE_URL,
    method: 'POST',
    body: JSON.stringify(data) 
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
    console.log('send response: ', body);
  });
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return temp;
}
