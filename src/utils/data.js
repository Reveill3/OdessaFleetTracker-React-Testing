let pumps = [
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

let blenders = [
{
unitnumber: '53B-11101',
standby: false
},
{
unitnumber: '53B-11102',
standby: true
}
]

let floats = [
{
unitnumber: '53CF-00000',
standby: false
},
{
unitnumber: '53CF-00001',
standby: false
}
]

let missiles = [
{
unitnumber: '53M-00000',
standby: false
},
{
unitnumber: '53M-00001',
standby: false
}
]

let hydrations = [
{
unitnumber: '53H-00001',
standby: false
},
{
unitnumber: '53H-00001',
standby: false
}
]

export function _getPumps () {
  return new Promise((res, rej) => {
    setTimeout(() => res([...pumps]), 1000)
  })
}

export function _getBlenders () {
  return new Promise((res, rej) => {
    setTimeout(() => res([...blenders]), 1000)
  })
}
export function _getHydrations () {
  return new Promise((res, rej) => {
    setTimeout(() => res([...hydrations]), 1000)
  })
}
export function _getMissiles () {
  return new Promise((res, rej) => {
    setTimeout(() => res([...missiles]), 1000)
  })
}
export function _getFloats () {
  return new Promise((res, rej) => {
    setTimeout(() => res([...floats]), 1000)
  })
}
