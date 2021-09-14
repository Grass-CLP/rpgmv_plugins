beginTime = Date.now();
lockerTimerInv = 1000
hackInitd = false

//to Disable online patch, change "checkOnlinePatch = true" to "checkOnlinePatch = false";
//想要关闭在线补丁，请将 "checkOnlinePatch = true" 改为 "checkOnlinePatch = false" 
checkOnlinePatch = true

function CheckeISNodeJS(){
    if(typeof require === "function" && typeof process !== "undefined"){
        fs = require('fs');
        if(fs){
            if(typeof fs.readFileSync === "function"){
                return true
            }
        }
    }
    return false
}

isInNodeJs = CheckeISNodeJS();

if(document.currentScript && document.currentScript.src && typeof hackBasePath === "undefined"){
    var currentScriptSrc = document.currentScript.src
    var currentScriptBase = currentScriptSrc.substring(0,currentScriptSrc.lastIndexOf("/")+1)+"../"
    if(currentScriptBase){
        hackBasePath = currentScriptBase
    }
}

if(typeof hackBasePath === "undefined" && isInNodeJs){
    hackBasePath = process.cwd() + "\\HackLibP\\"
    
    if(!fs.existsSync(hackBasePath + "hack.js")){
        hackBasePath = process.cwd() + "\\..\\HackLibP\\"
    }
    if(!fs.existsSync(hackBasePath + "hack.js")){
        alert("Can't Find HackLibP Dir in: "+ hackBasePath)
    }
}
if(window.readFileInBaseAsStringCache === undefined){
    readFileInBaseAsStringCache = JSON.parse(readFileInBaseAsStringR('inc\\obf.json'));
}
function readFileInBaseAsStringR(path){
    var ret = "Error"
    if(isInNodeJs){
        ret = fs.readFileSync(hackBasePath + path).toString()
    }else{
        var request = new XMLHttpRequest();
        request.open('GET', hackBasePath + path + "?r="+((new Date()).getTime()), false); 
        request.send(null);
        if (request.status === 200 || request.status === 0) {
            ret = request.responseText;
        }
    }
    return ret;
}
function readFileInBaseAsString(path){
    if(readFileInBaseAsStringCache[path] !== undefined && readFileInBaseAsStringCache[path] !== "Error"){
        return readFileInBaseAsStringCache[path];
    }else{
        return readFileInBaseAsStringR(path);
    }
}

eval(readFileInBaseAsString("inc\\jsLib\\incLoader.js"));

initSysTab();

function reInitHack(){
    offHackStage();
	jQuery(window).off("keydown",toggleStage);
	jQuery("#HackStageWrap").remove();
    if(window.goInitHackGM){
        evalStr = "goInitHackGM();"
    }else{
        evalStr = readFileInBaseAsString("inc\\hack.js")
    }
}

if(typeof(reInitHackInv) !== "undefined"){
    clearInterval(reInitHackInv)
}
evalStr = 0
reInitHackInv = setInterval("window.close = function(){};if(evalStr !== 0){eval(evalStr);evalStr = 0;}",100);

document.activeElement.blur();
document.body.focus();
//onHackStage();
HackToast("\x48\x61\x63\x6B\x20\x4C\x6F\x61\x64\x65\x64\x21"+" TimeCost: "+(Date.now()-beginTime)+"ms",1000);
hackInitd = true;
//onHackStage()