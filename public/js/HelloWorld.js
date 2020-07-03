import React, { useRef, useMemo, useEffect, useState } from 'react'

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

  const [message, setMessage] = useState('')

  let haha = async function () {
    return 'hahah'
  }
  haha().then(res => {
    console.log(res)
  })

  fetch('http://localhost:3000/test', {
    cache: 'no-cache', // 不缓存
    headers: {
      'content-type': 'application/json' // 接受json格式
    },
    method: 'get',
    mode: 'cors', // 跨域
    credentials: 'include'
  })
    .then(res => res.json())
    .then(response => {
      console.log(response, 'response');
    })
    .catch(error => console.log(error, 'error'));

  const setColor = () => {
    const data = { color: 'blue' }
    fetch('http://localhost:3000/setColor', {
      body: JSON.stringify(data),
      cache: 'no-cache', // 不缓存
      headers: {
        'content-type': 'application/json' // 接受json格式
      },
      method: 'post',
      mode: 'cors', // 跨域
      // credentials: 'include',

    })
      .then(res => res.json())
      .then(response => {
        console.log(response, 'response');
      })
      .catch(error => console.log(error, 'error'));
  }
  const getColor = () => {
    fetch('http://localhost:3000/getColor', {
      cache: 'no-cache', // 不缓存
      headers: {
        'content-type': 'application/json' // 接受json格式
      },
      method: 'get',
      mode: 'cors', // 跨域
      credentials: 'include',
    })
      .then(res => res.json())
      .then(response => {
        console.log(response, 'response');
      })
      .catch(error => console.log(error, 'error'));
  }

  const ws = new WebSocket("ws://localhost:2333")

  ws.onopen = (e) => {
    console.log('success')
    ws.send(JSON.stringify({ 'message': 'heihei' }))
    console.log('send message success', e)
  }
  ws.onmessage = (e) => {
    console.log('request success', e)
    document.getElementById('show_message').innerHTML += `<p>${JSON.parse(e.data).message}</p>`
  }

  const sendMessage = () => {
    ws.send(JSON.stringify({ 'message': document.getElementById('input').value }))
  }

  const closeSource = () => {
    ws.close()
    console.log('close websocket')
  }

  return (
    <div className="box">
      <div className="clock_box">
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

      <input type="file" accept="image/*" capture="camera" />

      <button onClick={setColor}>set</button>
      <button onClick={getColor}>get</button>

      <button onClick={closeSource}>close WebSocket</button>

      <div id="show">
        <div id="show_message"></div>
        <input id="input" />
        <button onClick={sendMessage}>send message</button>
      </div>
    </div>
  )
}

export default HelloWorld