var Sonido = {
    context: new AudioContext(),
    //url: '/std/assets/audio/shes_the_one.mp3',
    url: '/std/assets/audio/windlass_and_capstan.mp3',
    src: undefined,
    buffer: undefined,
    panner: undefined,
};

var SonidoFn = {
    init: function(){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", Sonido.url, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = function() {
            SonidoFn.load(xhr.response);
        };
        xhr.send();
    },
    load: function(data, panPos){
        // 300 bc moz settings.
        panPos = panPos || {x:0, y:0, z: 300};
        Sonido.context.listener.dopplerFactor = 1;
        Sonido.buffer = Sonido.context.createBuffer(data, true);
        Sonido.src = Sonido.context.createBufferSource();
        Sonido.src.buffer = Sonido.buffer;

        // https://developer.mozilla.org/en-US/docs/Web/API/AudioListener/dopplerFactor
        Sonido.panner = Sonido.context.createPanner();
        // Sonido.panner.panningModel = 'HRTF';
        // Sonido.panner.distanceModel = 'inverse';
        // Sonido.panner.refDistance = 1;
        // Sonido.panner.maxDistance = 10000;
        // Sonido.panner.rolloffFactor = 1;
        // Sonido.panner.coneInnerAngle = 360;
        // Sonido.panner.coneOuterAngle = 0;
        // Sonido.panner.coneOuterGain = 0;
        // Sonido.panner.setOrientation(1,0,0);
        //Sonido.panner.setPosition(20, -5, 0);
        Sonido.panner.setPosition(panPos.x || 0, panPos.y || 0, panPos.z || 300);

        Sonido.src.connect(Sonido.panner);
        Sonido.panner.connect(Sonido.context.destination);
        SonidoFn.listener_position();
    },
    play: function(){
        Sonido.src && Sonido.src.start(Sonido.context.currentTime);
    },
    stop: function(){
        Sonido.src && Sonido.src.stop(Sonido.context.currentTime);
    },
    listener_position: function(lisPos){
        lisPos = lisPos || {x:0, y:0, z: 300};
        // 300 bc moz settings.
        Sonido.context.listener.setPosition(lisPos.x || 0, lisPos.y || 0, lisPos.z || 300);
    }
};


//SonidoFn.init();
//SonidoFn.play();
//SonidoFn.listener_position({x:0, y: -5, z:0});
