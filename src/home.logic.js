const goodList = [
  '慢就是快，别急，生活还有很长的时间呢，慢慢来 baby！',
  '任何可能的时候，请保持简单！',
  '别太用力，会很笨拙',
  '那些你现在特别想要的东西，随着时间的流逝，你还是那么想要么'
]

function getOneSentence() {
  let i = Number.parseInt(Math.random() * goodList.length)
  return goodList[i]
}

module.exports = {
  getOneSentence
}