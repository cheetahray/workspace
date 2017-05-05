var myssid = "";
var language = "";
var centerX = 0.0;
var centerY = 0.0;
var nowx = 0.0;
var nowy = 0.0;
var succorW = 0.0;
var now2x = 0.0;
var now2y = 0.0;
var leftAngle = 0;
var rightAngle = 0;
var topAngle = 0;
var bottomAngle = 0;
var Angle_1 = 0;
var Angle_2 = 0;
var Angle_3 = 0;
var Angle_4 = 0;
var Angle_5 = 0;
var Angle_6 = 0;
var Angle_7 = 0;
var Angle_8 = 0;
var Angle_9 = 0;
var Angle_A = 0;
var Angle_B = 0;
var Angle_C = 0;
var Angle_D = 0;0
var Angle_E = 0;
var Angle_F = 0;
var left7 = 0;
var right7 = 0;
var top7 = 0;
var bottom7 = 0;
var left6 = 0;
var right6 = 0;
var top6 = 0;
var bottom6 = 0;
var left5 = 0;
var right5 = 0;
var top5 = 0;
var bottom5 = 0;
var left4 = 0;
var right4 = 0;
var top4 = 0;
var bottom4 = 0;
var left3 = 0;
var right3 = 0;
var top3 = 0;
var bottom3 = 0;
var left2 = 0;
var right2 = 0;
var top2 = 0;
var bottom2 = 0;
var left1 = 0;
var right1 = 0;
var top1 = 0;
var bottom1 = 0;
var radius1 = 0;
var radius2 = 0;
var radius3 = 0;
var radius4 = 0;
var radius5 = 0;
var radius6 = 0;
var radius7 = 0;
var r2_1 = 0;
var r2_2 = 0;
var r2_3 = 0;
var r2_4 = 0;
var r2_5 = 0;
var r2_6 = 0;
var r2_7 = 0;
var sin45 = 0.0;
var _sin45 = 0.0;
var sin22_5 = 0.0;
var _sin22_5 = 0.0;
var sin67_5 = 0.0;
var _sin67_5 = 0.0;
var sin15 = 0.0;
var _sin15 = 0.0;
var sin75 = 0.0;
var _sin75 = 0.0;
var sin11_25 = 0.0;
var _sin11_25 = 0.0;
var sin78_75 = 0.0;
var _sin78_75 = 0.0;
var sin33_75 = 0.0;
var _sin33_75 = 0.0;
var sin56_25 = 0.0;
var _sin56_25 = 0.0;
var sin81 = 0.0;
var _sin81 = 0.0;
var sin63 = 0.0;
var _sin63 = 0.0;
var sin27 = 0.0;
var _sin27 = 0.0;
var sin9 = 0.0;
var _sin9 = 0.0;
var sin7_5 = 0.0;
var _sin7_5 = 0.0;
var sin37_5 = 0.0;
var _sin37_5 = 0.0;
var sin52_5 = 0.0;
var _sin52_5 = 0.0;
var sin82_5 = 0.0;
var _sin82_5 = 0.0;
var sin6_43 = 0.0;
var _sin6_43 = 0.0;
var sin19_26 = 0.0;
var _sin19_26 = 0.0;
var sin32_14 = 0.0;
var _sin32_14 = 0.0;
var sin57_86 = 0.0;
var _sin57_86 = 0.0;
var sin70_71 = 0.0;
var _sin70_71 = 0.0;
var sin83_57 = 0.0;
var _sin83_57 = 0.0;
var lastret = "0x00";
var last2ret = "0x80";
var ret1 = lastret;
var ret2 = last2ret;
var isleft = true;

var successScan = function (message) {
    if (language == "zh-TW")
        console.log("傳送掃描請求" + message);
    else if (language == "zh-CN")
        console.log("传送扫描请求" + message);
    else
        console.log("Send scan request." + message);
}

var failureScan = function (message) {
    if (language == "zh-TW")
        navigator.notification.alert("傳送掃描失敗" + message, alertDismissed, '', '確定');
    else if (language == "zh-CN")
        navigator.notification.alert("传送扫描失败" + message, alertDismissed, '', '确定');
    else
        navigator.notification.alert("Send scan failed." + message, alertDismissed, '', 'OK');
}

function alertDismissed() {
    // do something
}

function getCenter() {
    var top = $("#seven").css("top");
    var left = $("#seven").css("left");
    var width = $("#seven").css("width");
    var height = $("#seven").css("height");
    top7 = parseInt(top.substr(0, top.indexOf("px")));
    var height7 = parseInt(height.substr(0, height.indexOf("px")));
    bottom7 = top7 + height7;
    left7 = parseInt(left.substr(0, left.indexOf("px")));
    var width7 = parseInt(width.substr(0, width.indexOf("px")));
    right7 = left7 + width7;
    radius7 = width7 / 2;
    centerY = top7 + radius7;
    centerX = left7 + radius7;
    r2_7 = radius7 * radius7;
	
	top = $("#angle").css("top");
    left = $("#angle").css("left");
    width = $("#angle").css("width");
    height = $("#angle").css("height");
    topAngle = parseInt(top.substr(0, top.indexOf("px")));
    var heightAngle = parseInt(height.substr(0, height.indexOf("px")));
    bottomAngle = topAngle + heightAngle;
    leftAngle = parseInt(left.substr(0, left.indexOf("px")));
    var widthAngle = parseInt(width.substr(0, width.indexOf("px")));
    rightAngle = leftAngle + widthAngle;
	var Angle15 = (bottomAngle - topAngle)/15;
	Angle_1 = topAngle + Angle15;
	Angle_2 = Angle_1 + Angle15;
	Angle_3 = Angle_2 + Angle15;
	Angle_4 = Angle_3 + Angle15;
	Angle_5 = Angle_4 + Angle15;
	Angle_6 = Angle_5 + Angle15;
	Angle_7 = Angle_6 + Angle15;
	Angle_8 = Angle_7 + Angle15;
	Angle_9 = Angle_8 + Angle15;
	Angle_A = Angle_9 + Angle15;
	Angle_B = Angle_A + Angle15;
	Angle_C = Angle_B + Angle15;
	Angle_D = Angle_C + Angle15;
	Angle_E = Angle_D + Angle15;
	Angle_F = Angle_E + Angle15;
}

function getSuccorW() {
    var width = $("#xy").css("width");
    succorW = parseInt(width.substr(0, width.indexOf("px"))) / 2;
}

function getBoardary() {
    var top = $("#six").css("top");
    var left = $("#six").css("left");
    var width = $("#six").css("width");
    var height = $("#six").css("height");
    top6 = parseInt(top.substr(0, top.indexOf("px")));
    var height6 = parseInt(height.substr(0, height.indexOf("px")));
    bottom6 = top6 + height6;
    left6 = parseInt(left.substr(0, left.indexOf("px")));
    var width6 = parseInt(width.substr(0, width.indexOf("px")));
    right6 = left6 + width6;
    radius6 = width6 / 2;
    r2_6 = radius6 * radius6;
    top = $("#five").css("top");
    left = $("#five").css("left");
    width = $("#five").css("width");
    height = $("#five").css("height");
    top5 = parseInt(top.substr(0, top.indexOf("px")));
    var height5 = parseInt(height.substr(0, height.indexOf("px")));
    bottom5 = top5 + height5;
    left5 = parseInt(left.substr(0, left.indexOf("px")));
    var width5 = parseInt(width.substr(0, width.indexOf("px")));
    right5 = left5 + width5;
    radius5 = width5 / 2;
    r2_5 = radius5 * radius5;
    top = $("#four").css("top");
    left = $("#four").css("left");
    width = $("#four").css("width");
    height = $("#four").css("height");
    top4 = parseInt(top.substr(0, top.indexOf("px")));
    var height4 = parseInt(height.substr(0, height.indexOf("px")));
    bottom4 = top4 + height4;
    left4 = parseInt(left.substr(0, left.indexOf("px")));
    var width4 = parseInt(width.substr(0, width.indexOf("px")));
    right4 = left4 + width4;
    radius4 = width4 / 2;
    r2_4 = radius4 * radius4;
    top = $("#three").css("top");
    left = $("#three").css("left");
    width = $("#three").css("width");
    height = $("#three").css("height");
    top3 = parseInt(top.substr(0, top.indexOf("px")));
    var height3 = parseInt(height.substr(0, height.indexOf("px")));
    bottom3 = top3 + height3;
    left3 = parseInt(left.substr(0, left.indexOf("px")));
    var width3 = parseInt(width.substr(0, width.indexOf("px")));
    right3 = left3 + width3;
    radius3 = width3 / 2;
    r2_3 = radius3 * radius3;
    top = $("#two").css("top");
    left = $("#two").css("left");
    width = $("#two").css("width");
    height = $("#two").css("height");
    top2 = parseInt(top.substr(0, top.indexOf("px")));
    var height2 = parseInt(height.substr(0, height.indexOf("px")));
    bottom2 = top2 + height2;
    left2 = parseInt(left.substr(0, left.indexOf("px")));
    var width2 = parseInt(width.substr(0, width.indexOf("px")));
    right2 = left2 + width2;
    radius2 = width2 / 2;
    r2_2 = radius2 * radius2;
    top = $("#one").css("top");
    left = $("#one").css("left");
    width = $("#one").css("width");
    height = $("#one").css("height");
    top1 = parseInt(top.substr(0, top.indexOf("px")));
    var height1 = parseInt(height.substr(0, height.indexOf("px")));
    bottom1 = top1 + height1;
    left1 = parseInt(left.substr(0, left.indexOf("px")));
    var width1 = parseInt(width.substr(0, width.indexOf("px")));
    right1 = left1 + width1;
    radius1 = width1 / 2;
    r2_1 = radius1 * radius1;
    sin45 = Math.sin(Math.PI / 4);
    _sin45 = sin45 * -1;
    sin22_5 = Math.sin(Math.PI / 8);
    _sin22_5 = sin22_5 * -1;
    sin67_5 = Math.sin(Math.PI / 8 * 3);
    _sin67_5 = sin67_5 * -1;
    sin15 = Math.sin(Math.PI / 12);
    _sin15 = sin15 * -1;
    sin75 = Math.sin(Math.PI / 12 * 5);
    _sin75 = sin75 * -1;
    sin11_25 = Math.sin(Math.PI / 16);
    _sin11_25 = sin11_25 * -1;
    sin78_75 = Math.sin(Math.PI / 16 * 7);
    _sin78_75 = sin78_75 * -1;
    sin33_75 = Math.sin(Math.PI / 16 * 3);
    _sin33_75 = sin33_75 * -1;
    sin56_25 = Math.sin(Math.PI / 16 * 5);
    _sin56_25 = sin56_25 * -1;
    sin81 = Math.sin(Math.PI / 20 * 9);
    _sin81 = sin81 * -1;
    sin63 = Math.sin(Math.PI / 20 * 7);
    _sin63 = sin63 * -1;
    sin27 = Math.sin(Math.PI / 20 * 3);
    _sin27 = sin27 * -1;
    sin9 = Math.sin(Math.PI / 20);
    _sin9 = sin9 * -1;
    sin7_5 = Math.sin(Math.PI / 24);
    _sin7_5 = sin7_5 * -1;
    sin37_5 = Math.sin(Math.PI / 24 * 5);
    _sin37_5 = sin37_5 * -1;
    sin52_5 = Math.sin(Math.PI / 24 * 7);
    _sin52_5 = sin52_5 * -1;
    sin82_5 = Math.sin(Math.PI / 24 * 11);
    _sin82_5 = sin82_5 * -1;
    sin6_43 = Math.sin(Math.PI / 28);
    _sin6_43 = sin6_43 * -1;
    sin19_26 = Math.sin(Math.PI / 28 * 3);
    _sin19_26 = sin19_26 * -1;
    sin32_14 = Math.sin(Math.PI / 28 * 5);
    _sin32_14 = sin32_14 * -1;
    sin57_86 = Math.sin(Math.PI / 28 * 9);
    _sin57_86 = sin57_86 * -1;
    sin70_71 = Math.sin(Math.PI / 28 * 11);
    _sin70_71 = sin70_71 * -1;
    sin83_57 = Math.sin(Math.PI / 28 * 13);
    _sin83_57 = sin83_57 * -1;

}

function clearAll() {
    if (document.getElementById("already").value == "1")
    {
        ret1 = "0x00";
    }
    boxDo.setAttribute('style', 'background-color:transparent;');
    boxRe.setAttribute('style', 'background-color:transparent;');
    boxMi.setAttribute('style', 'background-color:transparent;');
    boxFa.setAttribute('style', 'background-color:transparent;');
    boxSo.setAttribute('style', 'background-color:transparent;');
    boxLa.setAttribute('style', 'background-color:transparent;');
    boxTi.setAttribute('style', 'background-color:transparent;');
}

function clear2All() {
    if (document.getElementById("already").value == "1")
    {
        ret2 = "0x80";
    }
    boxAngle.setAttribute('style', 'background-color:transparent;');
}

function processMove() {
    var candraw = true;
    var triY = centerY - nowy;
    var triX = nowx - centerX;
    var nowr2 = triX * triX + triY * triY;
    var nowr2sqrt = Math.sqrt(nowr2);
    var mysin = triY / nowr2sqrt;
    //var mycos = tryX / nowr2sqrt;
    var ret="";
    if (nowr2 < r2_1)//( nowx > left1 && nowx < right1 && nowy > top1  && nowy < bottom1 )
    {
        if (triY > 0) //(mysin > sin45)
            ret = "0x09";
        else if (triY < 0) //(mysin < _sin45)
            ret = "0x01";
        /*
        else if (triX > 0)
            ret = "0x90";
        else if (triX < 0)
            ret = "0x10";
               */
        boxRe.setAttribute('style', 'background-color:transparent;');
        boxDo.setAttribute('style', 'border: 3px solid violet; border-radius: ' + radius1.toString() + 'px;');
    }
    else if (nowr2 < r2_2) //( nowx > left2 && nowx < right2 && nowy > top2  && nowy < bottom2 )
    {
        if (triY > 0) //(mysin > sin67_5)
            ret = "0x0A";
        else if (triY < 0) //(mysin < _sin67_5)
            ret = "0x02";
        /*
        else {
            if (mysin < sin22_5 && mysin > _sin22_5) {
                ret = "0x20";
            }
            else if (mysin > sin22_5) {
                ret = "0x1A";
            }
            else if (mysin < _sin22_5) {
                ret = "0x12";
            }
            if (triX < 0) {
                ret = "0x" + ConvertBase.dec2hex((parseInt(ret) + 128).toString()).toUpperCase();
            }
        }
               */
        boxMi.setAttribute('style', 'background-color:transparent;');
        boxRe.setAttribute('style', 'border: 3px solid indigo; border-radius: ' + radius2.toString() + 'px;');
        boxDo.setAttribute('style', 'border: 3px solid violet; border-radius: ' + radius1.toString() + 'px;');
    }
    else if (nowr2 < r2_3) //( nowx > left3 && nowx < right3 && nowy > top3  && nowy < bottom3 )
    {
        if (mysin > sin75)
            ret = "0x0B";
        else if (mysin < _sin75)
            ret = "0x03";
        else {
            if (mysin < sin15 && mysin > _sin15) {
                ret = "0x30";
            }
            else if (mysin > sin15 && mysin < sin45) {
                ret = "0x2B";
            }
            else if (mysin < _sin15 && mysin > _sin45) {
                ret = "0x23";
            }
            else if (mysin > sin45) {
                ret = "0x1B";
            }
            else if (mysin < _sin45) {
                ret = "0x13";
            }
            if (triX < 0) {
                ret = "0x" + ConvertBase.dec2hex((parseInt(ret) + 128).toString()).toUpperCase();
            }
        }
        boxFa.setAttribute('style', 'background-color:transparent;');
        boxMi.setAttribute('style', 'border: 3px solid blue; border-radius: ' + radius3.toString() + 'px;');
        boxRe.setAttribute('style', 'border: 3px solid indigo; border-radius: ' + radius2.toString() + 'px;');
        boxDo.setAttribute('style', 'background-color:transparent;');
    }
    else if (nowr2 < r2_4) //( nowx > left4 && nowx < right4 && nowy > top4  && nowy < bottom4 )
    {
        if (mysin > sin78_75)
            ret = "0x0C";
        else if (mysin < _sin78_75)
            ret = "0x04";
        else {
            if (mysin < sin11_25 && mysin > _sin11_25) {
                ret = "0x40";
            }
            else if (mysin > sin11_25 && mysin < sin33_75) {
                ret = "0x3C";
            }
            else if (mysin < _sin11_25 && mysin > _sin33_75) {
                ret = "0x34";
            }
            else if (mysin > sin33_75 && mysin < sin56_25) {
                ret = "0x2C";
            }
            else if (mysin < _sin33_75 && mysin > _sin56_25) {
                ret = "0x24";
            }
            else if (mysin > sin56_25) {
                ret = "0x1C";
            }
            else if (mysin < _sin56_25) {
                ret = "0x14";
            }
            if (triX < 0) {
                ret = "0x" + ConvertBase.dec2hex((parseInt(ret) + 128).toString()).toUpperCase();
            }
        }
        boxSo.setAttribute('style', 'background-color:transparent;');
        boxFa.setAttribute('style', 'border: 3px solid green; border-radius: ' + radius4.toString() + 'px;');
        boxMi.setAttribute('style', 'border: 3px solid blue; border-radius: ' + radius3.toString() + 'px;');
        boxRe.setAttribute('style', 'background-color:transparent;');
    }
    else if (nowr2 < r2_5) //( nowx > left5 && nowx < right5 && nowy > top5  && nowy < bottom5 )
    {
        if (mysin > sin81)
            ret = "0x0D";
        else if (mysin < _sin81)
            ret = "0x05";
        else {
            if (mysin < sin9 && mysin > _sin9) {
                ret = "0x50";
            }
            else if (mysin > sin9 && mysin < sin27) {
                ret = "0x4D";
            }
            else if (mysin < _sin9 && mysin > _sin27) {
                ret = "0x45";
            }
            else if (mysin > sin27 && mysin < sin45) {
                ret = "0x3D";
            }
            else if (mysin < _sin27 && mysin > _sin45) {
                ret = "0x35";
            }
            else if (mysin > sin45 && mysin < sin63) {
                ret = "0x2D";
            }
            else if (mysin < _sin45 && mysin > _sin63) {
                ret = "0x25";
            }
            else if (mysin > sin63) {
                ret = "0x1D";
            }
            else if (mysin < _sin63) {
                ret = "0x15";
            }
            if (triX < 0) {
                ret = "0x" + ConvertBase.dec2hex((parseInt(ret) + 128).toString()).toUpperCase();
            }
        }
        boxLa.setAttribute('style', 'background-color:transparent;');
        boxSo.setAttribute('style', 'border: 3px solid yellow; border-radius: ' + radius5.toString() + 'px;');
        boxFa.setAttribute('style', 'border: 3px solid green; border-radius: ' + radius4.toString() + 'px;');
        boxMi.setAttribute('style', 'background-color:transparent;');
    }
    else if (nowr2 < r2_6) //( nowx > left6 && nowx < right6 && nowy > top6  && nowy < bottom6 )
    {
        if (mysin > sin82_5)
            ret = "0x0E";
        else if (mysin < _sin82_5)
            ret = "0x06";
        else {
            if (mysin < sin7_5 && mysin > _sin7_5) {
                ret = "0x60";
            }
            else if (mysin > sin7_5 && mysin < sin22_5) {
                ret = "0x5E";
            }
            else if (mysin < _sin7_5 && mysin > _sin22_5) {
                ret = "0x56";
            }
            else if (mysin > sin22_5 && mysin < sin37_5) {
                ret = "0x4E";
            }
            else if (mysin < _sin22_5 && mysin > _sin37_5) {
                ret = "0x46";
            }
            else if (mysin > sin37_5 && mysin < sin52_5) {
                ret = "0x3E";
            }
            else if (mysin < _sin37_5 && mysin > _sin52_5) {
                ret = "0x36";
            }
            else if (mysin > sin52_5 && mysin < sin67_5) {
                ret = "0x2E";
            }
            else if (mysin < _sin52_5 && mysin > _sin67_5) {
                ret = "0x26";
            }
            else if (mysin > sin67_5) {
                ret = "0x1E";
            }
            else if (mysin < _sin67_5) {
                ret = "0x16";
            }
            if (triX < 0) {
                ret = "0x" + ConvertBase.dec2hex((parseInt(ret) + 128).toString()).toUpperCase();
            }
        }
        boxTi.setAttribute('style', 'background-color:transparent;');
        boxLa.setAttribute('style', 'border: 3px solid orange; border-radius: ' + radius6.toString() + 'px;');
        boxSo.setAttribute('style', 'border: 3px solid yellow; border-radius: ' + radius5.toString() + 'px;');
        boxFa.setAttribute('style', 'background-color:transparent;');
    }
    else if (nowr2 < r2_7 + 40000) //( nowx > left7 && nowx < right7 && nowy > top7  && nowy < bottom7 )
    {

        if (mysin > sin83_57)
            ret = "0x0F";
        else if (mysin < _sin83_57)
            ret = "0x07";
        else {
            if (mysin < sin6_43 && mysin > _sin6_43) {
                ret = "0x70";
            }
            else if (mysin > sin6_43 && mysin < sin19_26) {
                ret = "0x6F";
            }
            else if (mysin < _sin6_43 && mysin > _sin19_26) {
                ret = "0x67";
            }
            else if (mysin > sin19_26 && mysin < sin32_14) {
                ret = "0x5F";
            }
            else if (mysin < _sin19_26 && mysin > _sin32_14) {
                ret = "0x57";
            }
            else if (mysin > sin32_14 && mysin < sin45) {
                ret = "0x4F";
            }
            else if (mysin < _sin32_14 && mysin > _sin45) {
                ret = "0x47";
            }
            else if (mysin > sin45 && mysin < sin57_86) {
                ret = "0x3F";
            }
            else if (mysin < _sin45 && mysin > _sin57_86) {
                ret = "0x37";
            }
            else if (mysin > sin57_86 && mysin < sin70_71) {
                ret = "0x2F";
            }
            else if (mysin < _sin57_86 && mysin > _sin70_71) {
                ret = "0x27";
            }
            else if (mysin > sin70_71) {
                ret = "0x1F";
            }
            else if (mysin < _sin70_71) {
                ret = "0x17";
            }
            if (triX < 0) {
                ret = "0x" + ConvertBase.dec2hex((parseInt(ret) + 128).toString()).toUpperCase();
            }
        }
        boxTi.setAttribute('style', 'border: 3px solid red; border-radius: ' + radius7.toString() + 'px;');
        boxLa.setAttribute('style', 'border: 3px solid orange; border-radius: ' + radius6.toString() + 'px;');
        boxSo.setAttribute('style', 'background-color:transparent;');
    }
    else
        candraw = false;
    if(ret1 != ret)
    {
        ret1 = ret;
    }
    if (true == candraw)
    {
        boxSet.setAttribute('style', 'left: ' + (parseInt(nowx) - succorW).toString() + 'px; top: ' + (parseInt(nowy) - succorW).toString() + 'px;');
    }
}

function process2Move() {
    var candraw = true;
    //var mycos = tryX / nowr2sqrt;
    var ret="";
    if (now2y > topAngle && now2y < Angle_1) //( nowx > left3 && nowx < right3 && nowy > top3  && nowy < bottom3 )
    {
        ret = "0x8F";
    }
    else if (now2y > Angle_1 && now2y < Angle_2) //( nowx > left3 && nowx < right3 && nowy > top3  && nowy < bottom3 )
    {
        ret = "0x8E";
    }
    else if (now2y > Angle_2 && now2y < Angle_3) //( nowx > left3 && nowx < right3 && nowy > top3  && nowy < bottom3 )
    {
        ret = "0x8D";
    }
    else if (now2y > Angle_3 && now2y < Angle_4) //( nowx > left3 && nowx < right3 && nowy > top3  && nowy < bottom3 )
    {
        ret = "0x8C";
    }
    else if (now2y > Angle_4 && now2y < Angle_5) //( nowx > left3 && nowx < right3 && nowy > top3  && nowy < bottom3 )
    {
        ret = "0x8B";
    }
    else if (now2y > Angle_5 && now2y < Angle_6) //( nowx > left3 && nowx < right3 && nowy > top3  && nowy < bottom3 )
    {
        ret = "0x8A";
    }
    else if (now2y > Angle_6 && now2y < Angle_7) //( nowx > left3 && nowx < right3 && nowy > top3  && nowy < bottom3 )
    {
        ret = "0x89";
    }
    else if (now2y > Angle_7 && now2y < Angle_8) //( nowx > left3 && nowx < right3 && nowy > top3  && nowy < bottom3 )
    {
        ret = "0x88";
    }
    else if (now2y > Angle_8 && now2y < Angle_9) //( nowx > left3 && nowx < right3 && nowy > top3  && nowy < bottom3 )
    {
        ret = "0x87";
    }
    else if (now2y > Angle_9 && now2y < Angle_A) //( nowx > left3 && nowx < right3 && nowy > top3  && nowy < bottom3 )
    {
        ret = "0x86";
    }
    else if (now2y > Angle_A && now2y < Angle_B) //( nowx > left3 && nowx < right3 && nowy > top3  && nowy < bottom3 )
    {
        ret = "0x85";
    }
    else if (now2y > Angle_B && now2y < Angle_C) //( nowx > left3 && nowx < right3 && nowy > top3  && nowy < bottom3 )
    {
        ret = "0x84";
    }
    else if (now2y > Angle_C && now2y < Angle_D) //( nowx > left3 && nowx < right3 && nowy > top3  && nowy < bottom3 )
    {
        ret = "0x83";
    }
    else if (now2y > Angle_D && now2y < Angle_E) //( nowx > left3 && nowx < right3 && nowy > top3  && nowy < bottom3 )
    {
        ret = "0x82";
    }
    else if (now2y > Angle_E && now2y < Angle_F) //( nowx > left3 && nowx < right3 && nowy > top3  && nowy < bottom3 )
    {
        ret = "0x81";
    }
    else
        candraw = false;
    if(ret2 != ret)
    {
        ret2 = ret;
    }
    if (true == candraw)
    {
        boxKick.setAttribute('style', 'top: ' + (parseInt(now2y) - succorW).toString() + 'px;');
    }
}

var failureSet = function (err) {
    //document.getElementById("already").value = "0";
    if (language == "zh-TW")
        navigator.notification.alert("網路設定失敗" + err, alertDismissed, '', '確定');
    else if (language == "zh-CN")
        navigator.notification.alert("网路设定失败" + err, alertDismissed, '', '确定');
    else
        navigator.notification.alert("Network fails." + err, alertDismissed, '', 'OK');
}

var successInternal = function (message) {
    if (document.getElementById("already").value == "0") {
        document.getElementById("already").value = "1";
    }
    if (language == "zh-TW")
        console.log("網路初步成功" + message);
    else if (language == "zh-CN")
        console.log("网路初步成功" + message);
    else
        console.log("Network seems ready." + message);
}


var failureSSID = function (err) {
    //document.getElementById("already").value = "0";
    if (language == "zh-TW")
        navigator.notification.alert("抓取網路名稱失敗" + err, alertDismissed, '', '確定');
    else if (language == "zh-CN")
        navigator.notification.alert("抓取网路名称失败" + err, alertDismissed, '', '确定');
    else
        navigator.notification.alert("Get Wifi SSID fails." + err, alertDismissed, '', 'OK');
}

function strcmp(a, b) {
    return a.indexOf(b) >= 0;
}

var successInit = function (message) {
    myssid = message;
    if (strcmp(myssid, "ssfar_")) {
        hello.initialize("192.168.4.1", 7777, successInternal, failureSet);
    }
    else if (language == "zh-TW")
        navigator.notification.alert("您沒連上電路板的 wifi ssfar_x", alertDismissed, '', '確定');
    else if (language == "zh-CN")
        navigator.notification.alert("您没连上电路板的 wifi ssfar_x", alertDismissed, '', '确定');
    else
        navigator.notification.alert("You haven't connected to motherboard's wifi ssfar_x.", alertDismissed, '', 'OK');
    /*
     else if (document.getElementById("already").value == "0")
     {
     id3();
     }
     */
}

var boxSet = document.getElementById('xy');

var boxTi = document.getElementById('seven');

boxTi.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    var touch = e.touches[e.touches.length-1];
	if(touch.pageX > 1000)
        touch = e.touches[e.touches.length-2];
    nowx = touch.pageX;
    nowy = touch.pageY;
    processMove();
}, false);

boxTi.addEventListener('touchmove', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    var touch = e.touches[e.touches.length-1];
    if(touch.pageX > 1000)
        touch = e.touches[e.touches.length-2];
    nowx = touch.pageX;
    nowy = touch.pageY;
    processMove();
}, false);

boxTi.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
    //sendto("223", finalcountdown.toString());
    e.preventDefault();
    clearAll();
    boxSet.setAttribute('style', 'left: 380px;');
}, false);

var boxLa = document.getElementById('six');

boxLa.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    var touch = e.touches[e.touches.length-1];
    if(touch.pageX > 1000)
        touch = e.touches[e.touches.length-2];
    nowx = touch.pageX;
    nowy = touch.pageY;
    processMove();
}, false);

boxLa.addEventListener('touchmove', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    var touch = e.touches[e.touches.length-1];
    if(touch.pageX > 1000)
        touch = e.touches[e.touches.length-2];
    nowx = touch.pageX;
    nowy = touch.pageY;
    processMove();
}, false);

boxLa.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
    //sendto("207", finalcountdown.toString());
    e.preventDefault();
    clearAll();
    boxSet.setAttribute('style', 'left: 380px;');
}, false);

var boxSo = document.getElementById('five');

boxSo.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    var touch = e.touches[e.touches.length-1];
    if(touch.pageX > 1000)
        touch = e.touches[e.touches.length-2];
    nowx = touch.pageX;
    nowy = touch.pageY;
    processMove();
}, false);

boxSo.addEventListener('touchmove', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    var touch = e.touches[e.touches.length-1];
    if(touch.pageX > 1000)
        touch = e.touches[e.touches.length-2];
    nowx = touch.pageX;
    nowy = touch.pageY;
    processMove();
}, false);

boxSo.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
    //sendto("191", finalcountdown.toString());
    e.preventDefault();
    clearAll();
    boxSet.setAttribute('style', 'left: 380px;');
}, false);

var boxFa = document.getElementById('four');

boxFa.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    var touch = e.touches[e.touches.length-1];
    if(touch.pageX > 1000)
        touch = e.touches[e.touches.length-2];
	nowx = touch.pageX;
    nowy = touch.pageY;
    processMove();
}, false);

boxFa.addEventListener('touchmove', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    var touch = e.touches[e.touches.length-1];
	if(touch.pageX > 1000)
        touch = e.touches[e.touches.length-2];
	nowx = touch.pageX;
    nowy = touch.pageY;
    processMove();
}, false);

boxFa.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
    //sendto("175", finalcountdown.toString());
    e.preventDefault();
    clearAll();
    boxSet.setAttribute('style', 'left: 380px;');
}, false);

var boxMi = document.getElementById('three');

boxMi.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    var touch = e.touches[e.touches.length-1];
    if(touch.pageX > 1000)
        touch = e.touches[e.touches.length-2];
    nowx = touch.pageX;
    nowy = touch.pageY;
    processMove();
}, false);

boxMi.addEventListener('touchmove', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    var touch = e.touches[e.touches.length-1];
    if(touch.pageX > 1000)
        touch = e.touches[e.touches.length-2];
    nowx = touch.pageX;
    nowy = touch.pageY;
    processMove();
}, false);

boxMi.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
    //sendto("159", finalcountdown.toString());
    e.preventDefault();
    clearAll();
    boxSet.setAttribute('style', 'left: 380px;');
}, false);

var boxRe = document.getElementById('two');

boxRe.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    var touch = e.touches[e.touches.length-1];
    if(touch.pageX > 1000)
        touch = e.touches[e.touches.length-2];
    nowx = touch.pageX;
    nowy = touch.pageY;
    processMove();
}, false);

boxRe.addEventListener('touchmove', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    var touch = e.touches[e.touches.length-1];
    if(touch.pageX > 1000)
        touch = e.touches[e.touches.length-2];
    nowx = touch.pageX;
    nowy = touch.pageY;
    processMove();
}, false);

boxRe.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
    //sendto("143", finalcountdown.toString());
    e.preventDefault();
    clearAll();
    boxSet.setAttribute('style', 'left: 380px;');
}, false);

var boxDo = document.getElementById('one');

boxDo.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    var touch = e.touches[e.touches.length-1];
    if(touch.pageX > 1000)
        touch = e.touches[e.touches.length-2];
    nowx = touch.pageX;
    nowy = touch.pageY;
    processMove();
}, false);

boxDo.addEventListener('touchmove', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    var touch = e.touches[e.touches.length-1];
    if(touch.pageX > 1000)
        touch = e.touches[e.touches.length-2];
    nowx = touch.pageX;
    nowy = touch.pageY;
    processMove();
}, false);

boxDo.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
    //sendto("127", finalcountdown.toString());
    e.preventDefault();
    clearAll();
    boxSet.setAttribute('style', 'left: 380px;');
}, false);

var boxKick = document.getElementById('kick');

var boxAngle = document.getElementById('angle');

boxAngle.addEventListener('touchstart', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    var touch = e.touches[e.touches.length-1];
    if(touch.pageX < 1000)
        touch = e.touches[e.touches.length-2];
    now2x = touch.pageX;
    now2y = touch.pageY;
    process2Move();
}, false);

boxAngle.addEventListener('touchmove', function (e) {
    //readyet();
    //if (document.getElementById("already").value == "1")
    e.preventDefault();
    var touch = e.touches[e.touches.length-1];
    if(touch.pageX < 1000)
        touch = e.touches[e.touches.length-2];
    now2x = touch.pageX;
    now2y = touch.pageY;
    process2Move();
}, false);

boxAngle.addEventListener('touchend', function (e) {
    //if (document.getElementById("already").value == "1")
    //sendto("127", finalcountdown.toString());
    e.preventDefault();
    clear2All();
    boxKick.setAttribute('style', 'left: 1355px;');
}, false);

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        /* the larger side ALWAYS is called 'height' */
        navigator.globalization.getLocaleName(
            function (locale) {
                language = locale.value;
            },
            function () {
                navigator.nofification.alert('Error getting locale\n');
            }
        );

        if (screen.width > screen.height) {
            app.deviceHeight = screen.width;
            app.deviceWidth = screen.height;
        }
        else {
            app.deviceHeight = screen.height;
            app.deviceWidth = screen.width;
        }
        var ratio = app.deviceHeight / app.deviceWidth;
        if (ratio < 1.55 && window.location.href.indexOf("second") < 0)
            window.location.assign("second.html");
        else
            WifiWizard.getCurrentSSID(successInit, failureSSID);

        anyscreen([''], function () { //(['./css/index.css'],function() {

        });

        getCenter();
        getSuccorW();
        getBoardary();

        window.screen.lockOrientation('landscape');
        
        cordova.plugins.backgroundMode.enable();

        // Called when background mode has been activated
        cordova.plugins.backgroundMode.ondeactivate = function () {
            WifiWizard.getCurrentSSID(successInit, failureSSID);
        }
        
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:none;');
        setInterval("clock()",100);
        console.log('Received Event: ' + id);
    }
};

function clock()
{
    if (document.getElementById("already").value == "1") {
        var ii = 0;
        if(true == isleft)
        {
            if(lastret != ret1) {
                //for(ii = 0; ii < 5; ii++)
                hello.sendMessage(ret1, successScan, failureScan);
                $("#note").text(ConvertBase.dec2bin(parseInt(ret1).toString()));
                lastret = ret1;
            }
            isleft = false;
        }
        else
        {
            if(last2ret != ret2) {
                //for(ii = 0; ii < 5; ii++)
                hello.sendMessage(ret2, successScan, failureScan);
                $("#note").text(ConvertBase.dec2bin(parseInt(ret2).toString()));
                last2ret = ret2;
            }
            isleft = true;
        }
    }
}

app.initialize();
