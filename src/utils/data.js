let cards = [
{
unitnumber: '53Q-12225',
standby: false
},
{
unitnumber: '53Q-12227',
standby: false
},
{
unitnumber: '53Q-12226',
standby: false
},
{
unitnumber: '53Q-12228',
standby: false
},
{
unitnumber: '53Q-12221',
standby: false
},
{
  unitnumber: '53Q-11111',
  standby: true
},
{
  unitnumber: '53Q-11112',
  standby: true
}
]

export function _getCards () {
  return new Promise((res, rej) => {
    setTimeout(() => res([...cards]), 1000)
  })
}
