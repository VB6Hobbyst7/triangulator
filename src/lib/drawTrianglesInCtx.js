function drawTrianglesInCtx (ctx, canvas, triangles, cornerArray, imageData) {
  console.log('\n START - DRAW')
  const {width} = canvas

  for (let i = triangles.length; i;) {
    ctx.fillStyle = getColor(i - 1, cornerArray, triangles, imageData)

    ctx.beginPath()
    i--
    ctx.moveTo(cornerArray[triangles[i]][0], cornerArray[triangles[i]][1])
    i--
    ctx.lineTo(cornerArray[triangles[i]][0], cornerArray[triangles[i]][1])
    i--
    ctx.lineTo(cornerArray[triangles[i]][0], cornerArray[triangles[i]][1])
    ctx.closePath()
    ctx.fill()
  }

  function getColor (i, cornerArray, triangles, imageData) {
    var polygon = [{
      x: cornerArray[triangles[i]][0],
      y: cornerArray[triangles[i]][1]
    }, {
      x: cornerArray[triangles[i - 1]][0],
      y: cornerArray[triangles[i - 1]][1]
    }, {
      x: cornerArray[triangles[i - 2]][0],
      y: cornerArray[triangles[i - 2]][1]
    }]

    var p = getAverageColor(polygon, imageData)
    return `rgb(${p[0]}, ${p[1]}, ${p[2]})`
  }

  function getAverageColor (polygon, imageData) {
    let r = 0
    let g = 0
    let b = 0

    const center = {
      x: ((polygon[0].x + polygon[1].x + polygon[2].x) / 3) | 0,
      y: ((polygon[0].y + polygon[1].y + polygon[2].y) / 3) | 0
    }

    const analyze = [{
      x: (((polygon[0].x + polygon[1].x) / 2) + center.x) / 2 | 0,
      y: (((polygon[0].y + polygon[1].y) / 2) + center.y) / 2 | 0
    }, {
      x: (((polygon[0].x + polygon[2].x) / 2) + center.x) / 2 | 0,
      y: (((polygon[0].y + polygon[2].y) / 2) + center.y) / 2 | 0
    }, {
      x: (((polygon[1].x + polygon[2].x) / 2) + center.x) / 2 | 0,
      y: (((polygon[1].y + polygon[2].y) / 2) + center.y) / 2 | 0
    },
    center]

    for (let i in analyze) {
      r += imageData.data[(analyze[i].x + analyze[i].y * width) * 4 + 0]
      g += imageData.data[(analyze[i].x + analyze[i].y * width) * 4 + 1]
      b += imageData.data[(analyze[i].x + analyze[i].y * width) * 4 + 2]
    }

    r = (r / analyze.length) | 0
    g = (g / analyze.length) | 0
    b = (b / analyze.length) | 0

    return [r, g, b]
  }

  console.log('\n END - DRAW')
}

module.exports = drawTrianglesInCtx
