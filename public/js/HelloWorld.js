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
  const setColor = () => {
    const data = { color: 'red' }
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


  const getMedia = () => {
    let video = document.getElementById("video");
    let constraints = {
      video: { width: 500, height: 500 },
      audio: true
    };
    /*
    这里介绍新的方法:H5新媒体接口 navigator.mediaDevices.getUserMedia()
    这个方法会提示用户是否允许媒体输入,(媒体输入主要包括相机,视频采集设备,屏幕共享服务,麦克风,A/D转换器等)
    返回的是一个Promise对象。
    如果用户同意使用权限,则会将 MediaStream对象作为resolve()的参数传给then()
    如果用户拒绝使用权限,或者请求的媒体资源不可用,则会将 PermissionDeniedError作为reject()的参数传给catch()
    */
    let promise = navigator.mediaDevices.getUserMedia(constraints);
    promise.then(function (MediaStream) {
      video.srcObject = MediaStream;
      video.play();
    }).catch(function (PermissionDeniedError) {
      console.log(PermissionDeniedError);
    })
  }
  const takePhoto = () => {
    let video = document.getElementById("video");

    //获得Canvas对象
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 500, 500);
  }

  return (
    <div className="box">
      <button onClick={setColor}>set</button>
      <button onClick={getColor}>get</button>

      <div id="show">
        <div id="show_message"></div>
        <input id="input" />
        <button onClick={sendMessage}>send message</button>
      </div>

      <div>
        <input type="button" title="开启摄像头" value="开启摄像头" onClick={getMedia} />
        <video id="video" width="500px" height="500px" autoPlay></video>
        <canvas id="canvas" width="500px" height="500px"></canvas>
        <button id="snap" onClick={takePhoto}>拍照</button>
      </div>
    </div>
  )
}

export default HelloWorld