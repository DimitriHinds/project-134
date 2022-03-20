status = "";
objects = [];
alarm = "alarm.mp3";

function preload(){
    alarm = loadSound("alarm.mp3");
    alarm.setVolume(1);
    alarm.rate(1);
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    vid = createCapture(VIDEO);
    vid.size(380,380);
    vid.hide();
    Detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Objects detected"
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(vid, 0, 0, 380, 380);
    if (status != "") {
        r = random(225);
        g = random(225);
        b = random(225);
        Detector.detect(vid, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("num_of_obj").innerHTML = "Baby Detected";
            if(objects[i].label == "person")
        {
            document.getElementById("num_of_obj").innerHTML = "Baby Detected";
            alarm.stop();
        }
            else if(objects[i].label != "person")
        {
            document.getElementById("num_of_obj").innerHTML = "Baby is not Detected";
            alarm.play();
        }
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        if(objects.length < 0)
        {
            document.getElementById("num_of_obj").innerHTML = "Baby is not Detected";
            alarm.play();
        }
    }
}