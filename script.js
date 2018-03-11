//全局变量
const oUl = document.getElementById("message-list");
const oSubmit = document.getElementById("submit-button");

//头部显示日期
function showCurrentTime() {
    let date = new Date();
    let time = document.getElementById('time');
    time.innerHTML = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' ;
}
showCurrentTime();

//刷新时获取localStorage的值
function getValue() {
    if (window.localStorage.getItem("key")) {
        let arr1 = JSON.parse(window.localStorage.getItem("key"));
        for (let i = 0; i <= arr1.length - 1; i++) {
            add(arr1[i].name, arr1[i].time, arr1[i].message);
        }
    }
}

//添加留言的函数
function add(nickname, timeThen, messageContent) {
    let mainLi = document.createElement("li");
    let iconDiv = document.createElement("div");
    let nameInformation = document.createElement("strong");
    let timeStamp = document.createElement("span");
    let messageP = document.createElement("p");
    let hr = document.createElement("hr");
    mainLi.appendChild(iconDiv);
    mainLi.appendChild(nameInformation);
    mainLi.appendChild(timeStamp);
    mainLi.appendChild(messageP);
    mainLi.appendChild(hr);
    iconDiv.innerHTML = nickname.split('')[0].toUpperCase();
    nameInformation.innerHTML = nickname;
    timeStamp.innerHTML = timeThen;
    messageP.innerHTML = messageContent;
    oUl.appendChild(mainLi);
}

//留言条数统计
function countAllMessage() {
    let messageCount = document.getElementById("message-count");
    messageCount.innerHTML = oUl.getElementsByTagName("li").length;
}

window.onload = function() {
    getValue();
    oSubmit.onclick = function () {
        let dateSubmit = new Date();
        const yourTimeThen = dateSubmit.getFullYear() + '年' + (dateSubmit.getMonth() + 1) + '月' + dateSubmit.getDate() + '日' + " " + (dateSubmit).toLocaleTimeString();
        const yourNickname = document.getElementById("your-nickname").value.trim();
        const yourMessage = document.getElementById("your-message").value.trim();
        if (yourNickname == '') {
            alert("昵称不能为空！");
            return;
        } else if (yourNickname.length<2||yourNickname.length>15) {
            alert("昵称格式不正确！");
            document.getElementById("your-nickname").value = '';
            return;
        } else if(/(\w)+(\s)+(\w)+/g.test(yourNickname)){
            alert("昵称中不能有空白！");
            document.getElementById("your-nickname").value = '';
            return;
        } else if (yourMessage == '') {
            alert("请输入留言内容！");
            return;
        } else if (yourMessage.length>80) {
            alert("留言不得超过80字！");
            return;
        }else{
            add(yourNickname, yourTimeThen, yourMessage);
            alert("恭喜 " + yourNickname + " 留言成功！");
        }
        document.getElementById("your-message").value = '';
        let oField = document.getElementById("message-area");
        oField.style.height = (parseInt(oField.style.height) + 167) + 'px';
        let arr = new Array();
        let aLi = oUl.getElementsByTagName("li");
        for (let i = 0; i < aLi.length; i++) {
            arr[i] = new Object();
            arr[i].name = aLi[i].childNodes[1].childNodes[0].nodeValue;
            arr[i].time = aLi[i].childNodes[2].childNodes[0].nodeValue;
            arr[i].message = aLi[i].childNodes[3].childNodes[0].nodeValue;
        }
        let text = JSON.stringify(arr);
        window.localStorage.setItem("key", text);
        countAllMessage();
    }
    countAllMessage();
}

