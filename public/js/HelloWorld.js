import React, { useRef, useMemo, useEffect } from 'react'

const getStyle = (obj, attr) => {
  if (obj.currentStyle) {
    return parseInt(Math.floor(obj.currentStyle[attr]))
  }
  else {
    return parseInt(Math.floor(getComputedStyle(obj, false)[attr]))
  }
}

function HelloWorld () {
  useEffect(() => {
    let secondPointerDeg = new Date().getSeconds() * 6
    document.styleSheets[0].insertRule(`@keyframes secondPointer {
      from {
        transform: rotate(${secondPointerDeg - 450}deg) translate(calc(var(--transform-size) / 2));
      }
    
      to {
        transform: rotate(${secondPointerDeg - 90}deg) translate(calc(var(--transform-size) / 2));
      }
    }`)

    let minutePointerDeg = new Date().getMinutes() * 6 + new Date().getSeconds() / 10
    document.styleSheets[0].insertRule(`@keyframes minutePointer {
      from {
        transform: rotate(${minutePointerDeg - 450}deg) translate(calc(var(--transform-size) / 2));
      }
    
      to {
        transform: rotate(${minutePointerDeg - 90}deg) translate(calc(var(--transform-size) / 2));
      }
    }`)

    let hourPointerDeg = new Date().getHours() * 30 + new Date().getMinutes() / 2
    document.styleSheets[0].insertRule(`@keyframes hourPointer {
      from {
        transform: rotate(${hourPointerDeg - 450}deg) translate(calc(var(--transform-size) / 4));
      }

      to {
        transform: rotate(${hourPointerDeg - 90}deg) translate(calc(var(--transform-size) / 4));
      }
    }`)
  }, [false])

  let haha = async function () {
    return 'hahah'
  }
  haha().then(res => {
    console.log(res)
  })

  return (
    <div className="box">
      <div>
        <div className="seconde_pointer pointer"></div>
        <div className="minute_pointer pointer"></div>
        <div className="hour_pointer pointer"></div>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>11</li>
          <li>12</li>
        </ul>
      </div>
    </div>
  )
}

export default HelloWorld