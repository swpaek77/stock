var express = require('express');
var axios = require('axios');
var numeral = require('numeral');
var moment = require('moment');

var app = express();
var port = process.env.PORT || 5000;

app.use(express.json());
app.set('view engine','ejs');
app.get('/', function(req, res){
  
  // var ItemId = '2361a77a5f2b6ae99df226bde7044c40' // [4월] 고황증
  var ItemId = '6f093418c284466a55402a4784394d97' // 순황증
  axios.get(`https://api.neople.co.kr/df/auction?itemId=${ItemId}&sort=unitPrice:asc&wordType=front&limit=400&apikey=72eLZQKp2yMb14nq4FGgzyv4SUsMTqNX`)
    .then(response => {
      // console.log(response.data);
      // res.send('최저가 : ' + response.data.rows[0].currentPrice);
      var WonPrice = 7500;
      if(req.query.price){
        WonPrice = req.query.price
      }
      var currentCount = 0;

      response.data.rows.forEach(function(r){
        currentCount += r.count;
      })

      var minGoldPrice = response.data.rows[0].unitPrice;
      var spentWonPrice = 518500;
      var spentWonPrice2 = 135750;
      var spentWonPrice3 = 70000;

      var returnWonPrice = 75000;
      var totalSpentWonPrice = spentWonPrice + spentWonPrice2 + spentWonPrice3;

      var spentGoldPrice = 457233333;
      var ownGoldPrice = 310000000;
      var gohwangItemCount = 11;

      var spentPirodo = 11627 + 3686 + 6729;      
      var spentTime = 18 * 3;

      var currencyRate = 10000000 / WonPrice;

      var resultData = {
        curTime: moment(new Date()).utcOffset(9).format("YYYY-MM-DD HH:mm:ss"),
        currencyRate: currencyRate,
        currentCount: numeral(currentCount),

        WonPrice: numeral(WonPrice),
        minGoldPrice: numeral(minGoldPrice),
        spentWonPrice: numeral(spentWonPrice),
        spentWonPrice2: numeral(spentWonPrice2),
        spentWonPrice3: numeral(spentWonPrice3),
        returnWonPrice: numeral(returnWonPrice),
        totalSpentWonPrice: numeral(totalSpentWonPrice),
        spentGoldPrice: numeral(spentGoldPrice),
        gohwangItemCount: numeral(gohwangItemCount),
        
        ownGoldPrice: numeral(ownGoldPrice),
        resultGoldPrice: numeral(minGoldPrice * gohwangItemCount * 0.97),

        breakEvenPoint: numeral((spentGoldPrice * 100) / 97),
        spentPirodo: numeral(spentPirodo),
        spentTime: numeral(spentTime),

        gainLossPrice: numeral(minGoldPrice * gohwangItemCount * 0.97),
        gainLossList: {
          _4200: numeral(42000000 * gohwangItemCount * 0.97),
          _4300: numeral(43000000 * gohwangItemCount * 0.97),
          _4400: numeral(44000000 * gohwangItemCount * 0.97),
          _4500: numeral(45000000 * gohwangItemCount * 0.97),
          _4600: numeral(46000000 * gohwangItemCount * 0.97),
          _4700: numeral(47000000 * gohwangItemCount * 0.97),
          _4800: numeral(48000000 * gohwangItemCount * 0.97),
          _4900: numeral(49000000 * gohwangItemCount * 0.97),
          _5000: numeral(50000000 * gohwangItemCount * 0.97),
        },



        moment: moment,
        numeral: numeral,
      }

      res.render('../min1.ejs', resultData)
    })
});


app.get('/all', function(req, res){
  // var ItemId = '2361a77a5f2b6ae99df226bde7044c40' // [4월] 고황증
  var ItemId = '6f093418c284466a55402a4784394d97' // 순황증
  axios.get(`https://api.neople.co.kr/df/auction?itemId=${ItemId}&sort=unitPrice:asc&wordType=front&limit=400&apikey=72eLZQKp2yMb14nq4FGgzyv4SUsMTqNX`)
    .then(response => {
      res.send(response.data.rows);
    })
});


app.listen(port, () => console.log(`Server Listening on Port ${port}`));
