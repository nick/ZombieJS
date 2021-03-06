if (typeof(AN) === 'undefined') {
   AN = {};
}
AN.Controller = {

    scenes: {},
    scenesArray: [],
    currentSceneID: -1,
    olElement: null,
    clickEvents: {},
    useOrmma: false,

    setConfig: function(configData) {

        this.clickEvents = configData.clickEvents

        this.olElement = document.getElementById(configData.parentId);
        var liElements = this.olElement.children;

        if (configData.ormma) {
            this.useOrmma = true;
        }

        var scene;
        for (var i=0; i < configData.scenes.length; i++) {
            scene = configData.scenes[i];
            scene.element = liElements[i];
            this.scenes[scene.id] = scene;
            this.scenesArray.push(scene);
        }

        this.setupListeners();

        // this.startSceneByID(this.scenesArray[0].id);

        return this;
    },

    runningAnimationCount: 0,

    setupListeners: function() {
        var me = this;

        this.olElement.addEventListener('webkitAnimationStart', function() {

        },false);

        this.olElement.addEventListener('webkitAnimationEnd', function() {
            me.onAnimationEnd();
        },false);

        function addMousemoveListenerTo(scene) {
            scene.element.addEventListener('mousemove', function(event){
                scene.mousemoveAction(me, event);
            }, false);
        }

        var scene;
        for (var i=0; i < this.scenesArray.length; i++) {
            scene = this.scenesArray[i];
            if (scene.mousemoveAction) {

                addMousemoveListenerTo(scene);
            }
        }

        function addListenerTo(element, event, aFunction) {
            element.addEventListener(event, function(event){
                aFunction(me,event);
            }, false);
        }

        //add click events
        var element, clickEvent;
        for (var i=0; i < this.clickEvents.length; i++) {
            clickEvent = this.clickEvents[i];
            element = document.getElementById(clickEvent.id);
            addListenerTo(element, 'click', clickEvent.handler);
        }

    },


    onAnimationEnd: function() {

        this.runningAnimationCount--;

        if (this.runningAnimationCount === 0) {
            this.onSceneFinish();
        }

    },

    startSceneByID: function(sceneID) {

        var me = this;

        //restart current scene without flicker
        if (sceneID === this.currentSceneID) {
            this.scenes[sceneID].element.setAttribute('class','run restart');

            setTimeout(function(){

                me.runningAnimationCount = me.scenes[sceneID].animationCount;
                me.scenes[sceneID].element.setAttribute('class','run');

                if (me.scenes[sceneID].startAction) {
                    me.scenes[sceneID].startAction(me);
                }
                if (me.scenes[sceneID].animationCount === 0 ) {
                    me.onSceneFinish();
                }

                },0);
            return;
        } else if (this.currentSceneID !== -1) {
            this.scenes[this.currentSceneID].element.setAttribute('class','');
        }

        this.runningAnimationCount = this.scenes[sceneID].animationCount;

        this.currentSceneID = sceneID;
        var nextScene = this.scenes[sceneID];
        nextScene.element.setAttribute('class','run');


        if (this.useOrmma) {

           this.ormmaNextScene(nextScene);
        }


        if (nextScene.startAction) {
            nextScene.startAction(this);
        }
        if (nextScene.animationCount === 0 ) {
            this.onSceneFinish();
        }


    },

    replayScene: function() {
        this.startSceneByID(this.currentSceneID);
    },

    onSceneFinish: function() {

        if (this.scenes[this.currentSceneID].endAction) {
            this.scenes[this.currentSceneID].endAction(this);
        }

    },

    goToNextScene: function() {
        var nextIndex = this.scenesArray.indexOf(this.scenes[this.currentSceneID]) + 1;
        var nextScene;
        if (nextScene = this.scenesArray[nextIndex]) {
            this.startSceneByID(nextScene.id);
        }
    },

    goToURL: function(aURL) {
        document.location.href = aURL;
    },

    ormmaNextScene: function(nextScene) {
        var currentState = ormma.getState();

        if (nextScene.dimensions.expanded) {
            //expanded state
            //check if we're expanded
            var maxSize = ormma.getMaxSize()
            if (currentState !== 'expanded') {
                ormma.expand({
                    x:0,
                    y:0,
                    width: maxSize.width,
                    height: maxSize.height
                })
            }

            var transform = "";
            var elementHeight = nextScene.element.offsetHeight;
            var elementWidth = nextScene.element.offsetWidth;
            var y = (maxSize.height - elementHeight) / 2;
            var x = (maxSize.width - elementWidth) / 2;
            transform += " translate3d("+Math.round(x)+"px,"+Math.round(y)+"px,0)";


            if (nextScene.dimensions.fit) {
                var scaleFactor = Math.min(maxSize.width/elementWidth, maxSize.height/elementHeight);
                transform += " scale3d("+scaleFactor+","+scaleFactor+",1)";
            }
            nextScene.element.style.webkitTransform = transform;

        } else {

            if (currentState === 'expanded') {
                ormma.close();
            }
            ormma.resize(nextScene.dimensions.width,nextScene.dimensions.height);
        }
    }
}