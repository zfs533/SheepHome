var WinSize = cc.winSize;

cc.game.onStart = function(){
    if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    cc.view.enableRetina(cc.sys.os === cc.sys.OS_IOS ? true : false);
    cc.view.adjustViewPort(true);
//    if(cc.sys.isMobile) {
//    	cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.FIXED_WIDTH);
//    } else {    
//    	cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.EXACT_FIT);
//    }
//    cc.view.setDesignResolutionSize(1280, 720, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.EXACT_FIT);
    WinSize = cc.winSize;
//    var scene = new SnakeScene();
//    var scene = new RpgScene();
//    var scene = new WelcomeScenes();
//    var scene = new GameSceness();
    var scene = new FiveChessSceness();
    cc.director.runScene(cc.TransitionFade.create(1, scene));
    
};
cc.game.run();

(function()
{
	var mm = 1;
	for ( var i = 1; i <= 100; i++ )
	{
		mm *= i;
	}
	cc.log(mm);
	cc.log(Math.pow(123123123123234,123123123));
	cc.log(Math.PI);
})()