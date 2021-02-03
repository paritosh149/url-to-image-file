function dynamicColors() {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return 'rgba(' + r + ',' + g + ',' + b + ', 0.5)'
}
function poolColors(a) {
  let pool = []
  for (let i = 0; i < a; i++) {
    pool.push(dynamicColors())
  }
  return pool
}

module.exports = poolColors
