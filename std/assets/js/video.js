var Video = {
    elemento: document.getElementById('video'),
    canvas: document.getElementById('canvas'),
    context: null,
    //tracker: new tracking.ObjectTracker(['face']),
    tracker: new tracking.ColorTracker(['yellow']),
    screen: {
        width: 0,
        half_w: 0,
        height: 0,
        half_h: 0,
    },
    objeto: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    }
};

var VideoFn = {
    init: function(){
        Video.context = Video.canvas.getContext('2d');
        Video.screen.width = Video.elemento.width;
        Video.screen.half_w = Video.elemento.width/2;
        Video.screen.height = Video.elemento.height;
        Video.screen.half_h = Video.elemento.height/2;
    },
    start: function(){
        tracking.track('#video', Video.tracker, {camera: true});

        Video.tracker.on('track', function(event) {
            Video.context.clearRect(0, 0, Video.canvas.width, Video.canvas.height);

            event.data.forEach(function(rect) {
                //Video.objeto = rect;
                VideoFn.set_audio_pos(rect);

                Video.context.strokeStyle = "#f00";
                Video.context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        });
      });
    },
    set_audio_pos: function(rect){
        var x,y,z;

        x = Math.floor((Video.screen.half_w - rect.x) / 100);
        y = Math.floor((Video.screen.half_h - rect.x) / 100);

        SonidoFn.listener_position({x:x, y:y, z:0})
    },
};

//VideoFn.init();
//VideoFn.start();

