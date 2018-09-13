# Line Message Reply 2016/12/18
可參考 [Line 官方文件](https://devdocs.line.me/en/?shell#reply-message)

## 使用

```
git clone https://github.com/runkids/Line-Api-Test.git
```

把 `config.js` 裡面的CHANNEL_ID, CHANNEL_SERECT, Channel_Access_Token, FIXIE_URL換成自己的

專案中加入  `Procfile` 裡面加入喚醒node.js的重要指令

再來先裝必要的套件

```
npm install
```
最後部署至Heroku https://dashboard.heroku.com/

## 教學
1.至 https://business.line.me/zh-hant/ 申請Message API帳號


2.至 https://admin-official.line.me/ 帳號設定>ＢＯＴ設定 
  Webhook傳訊 “允許”打勾

  至 https://developers.line.me/ba Basic information 取得 CHANNEL_ID, CHANNEL_SERECT, Channel_Access_Token


3.至 https://dashboard.heroku.com/ 申請帳號 建立新app

  於resources中新增Add-ons : Fixie 並到Account 取得 Proxy URL ＆ Outbound IPs

  Proxy URL：line_message_reply.js >> 回傳時設置 proxy : process.env.FIXIE_URL 就會有固定的ＩＰ 不需要一直到LINE developers設定IP白名單

  Outbound IPs : 把IP設為白名單 https://developers.line.me/ba  Server IP Whitelist

  
  接下來到Heroku的app介面的Deploy

  Deployment method : 選擇GITHUB 並部署上去

  部署後會取得ＵＲＬ：https://{YOUR_HEROKU_SERVER_ID}.herokuapp.com

  把此ＵＲＬ設在 https://developers.line.me/ba Basic information 的 Webhook URL


4.如何看Heroku的Log呢？
  需要在本機環境下載Heroku官方提供的client

  打開terminal然後先下以下指令，然後輸入自己在heroku上的信箱及密碼


  ```
  $ heroku login
  ```
  用GITHUB部署請輸入
  
  ```
  heroku logs -a {YOUR_APP_NAME} --tail
  ```
  詳細請參考[Heroku 官方文件] (https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction) 
