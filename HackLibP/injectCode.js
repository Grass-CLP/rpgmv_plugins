<script type="text/javascript"> 
    if (typeof HackLoaded === 'undefined' && typeof DataManager !== 'undefined') { 
        fs = require('fs'); 
        hackBasePath = process.cwd() + "\\HackLibP\\" 
        if(!fs.existsSync(hackBasePath + "inc\\hack.js")){ 
            hackBasePath = process.cwd() + "\\..\\HackLibP\\" 
        }
        evalStr = fs.readFileSync(hackBasePath+"inc\\hack.js").toString();
        var hackLoadInv = setInterval('(function(){if(typeof $gameActors === "undefined"){return false} if(!$gameActors){return false}if(typeof $gameActors._data === "undefined"){return false}if(!$gameActors._data){return false}clearInterval(hackLoadInv);return true})() && setTimeout("eval(evalStr)",100);HackLoaded = true;',100) 
    } 
</script> 