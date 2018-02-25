//全局变量
var oUl = document.getElementById("message-list");
var oSubmit = document.getElementById("submit-button");

//头部显示日期
function showCurrentTime() {
    var date = new Date();
    var time = document.getElementById('time');
    time.innerHTML = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' ;
}
showCurrentTime();

//刷新时获取localStorage的值
function getValue() {
    if (window.localStorage.getItem("key")) {
        var arr1 = JSON.parse(window.localStorage.getItem("key"));
        for (let i = 0; i <= arr1.length - 1; i++) {
            var part1 = arr1[i].split("- -")[0];
            var part2 = arr1[i].split("- -")[1];
            var part3 = "";
            for(let j = 2; j < arr1[i].split("- -").length; j++){
                part3 = part3 + arr1[i].split("- -")[j];
            }
            add(part1, part2, part3);
        }
    }
}

//添加留言的函数
function add(nickname, timeThen, messageContent) {
    var mainLi = document.createElement("li");
    var iconDiv = document.createElement("div");
    var nameInformation = document.createElement("strong");
    var timeStamp = document.createElement("span");
    var messageP = document.createElement("p");
    var hr = document.createElement("hr");
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
    var messageCount = document.getElementById("message-count");
    messageCount.innerHTML = oUl.getElementsByTagName("li").length;
}

window.onload = function() {
    getValue();
    oSubmit.onclick = function () {
        var dateSubmit = new Date();
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
        var oField = document.getElementById("message-area");
        oField.style.height = (parseInt(oField.style.height) + 167) + 'px';
        var arr = new Array();
        var aLi = oUl.getElementsByTagName("li");
        for (let i = 0; i < aLi.length; i++) {
            arr[i] = aLi[i].childNodes[1].childNodes[0].nodeValue + '- -' + aLi[i].childNodes[2].childNodes[0].nodeValue + '- -' + aLi[i].childNodes[3].childNodes[0].nodeValue;
        }
        var text = JSON.stringify(arr);
        window.localStorage.setItem("key", text);
        countAllMessage();
    }
    countAllMessage();
}

