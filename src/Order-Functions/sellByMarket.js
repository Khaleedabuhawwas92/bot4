const Binance = require("binance-api-node").default;
const {

} = require("../Serves-Funcations/allGetFuncations");
const client = Binance({
   apiKey: "9MDlaXiZ3v97EwANLckWfnEliYySPp4ejJYCw4XnH4bbUzi5F3PPK1Genx0Ym4vZ",
   apiSecret:
      "V7yf8DwR5Nw3hjW9pmge7nxlc0AK8WdIKIrq4YbfbLMQJao8t1pQYxdMyD5p3kF6",
});

async function SellMarket(symbol) {
   try {
      const trades = await client.myTrades({ symbol });

      const lastTrade = trades[trades.length - 1];
      const qty = lastTrade.qty - (Math.round(lastTrade.qty * 0.001)).toFixed(2);

      SellOrderMarket(symbol, qty);
   } catch (error) {
      console.error("Error retrieving last order:", error);
   }
}

const SellOrderMarket = (symbol, quoteOrderQty) => {
   client
      .order({
         symbol: symbol,
         side: "SELL",
         type: "MARKET",
         quantity: quoteOrderQty,
      })
      .then((order) => {
         console.log("Market buy order placed successfully:", order);
      })
      .catch((error) => {
         console.error("Error placing market buy order:", error);
      });
};

exports.SellMarket = SellMarket;
