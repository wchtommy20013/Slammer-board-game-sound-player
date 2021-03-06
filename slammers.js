var arr = ["bell", "clock", "cock", "cow", "dog", "drum", "duck", "elephant", "harp", "horse", "phone", "radio", "saw", "sheep", "whistle", "glass_break", "baby", "bagpipe", "owl", "frog"];
var count = arr.length;

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

var started = false;
var paused = false;
var timer1;
var timer2;

function init(){
	var div = document.getElementById("audio_clips");
	for(var i = 0; i < arr.length; i++){
		var audio = document.createElement("audio");
		audio.preload = "auto";
		audio.id = arr[i];
		var source = document.createElement("source");
		source.src = "sounds/" + arr[i] + ".mp3" 
		source.type = "audio/mp3";
		audio.appendChild(source);
		div.appendChild(audio);
	}
	shuffle(arr);
}

function start(){
	if(!started){
		timer2 = setTimeout(playnext, 2000);
		started = true;
	}
}

function reset(){
	location.reload();
}


function pause(){
	if(started && !paused){
		clearTimeout(timer1);
		clearTimeout(timer2);
		document.getElementById(arr[0]).currentTime = 0;
		document.getElementById(arr[0]).pause();
		document.getElementById("pause_btn").style.display = 'none';	
		document.getElementById("resume_btn").style.display = 'inline';
		paused = true;	
	} 
}

function resume(){
	if(started && paused){
		document.getElementById("pause_btn").style.display = 'inline';
		document.getElementById("resume_btn").style.display = 'none';
		timer2 = setTimeout(playnext, 2000);
		paused = false;
	}
}

function playnext(){
	var audio = document.getElementById(arr[0]);
	audio.play();
	timer1 = setTimeout(function(){
		document.getElementById(arr[0]).pause();
		document.getElementById("answer").innerHTML += arr[0] + "<br>\n";
		arr.shift();
		count--;	
	}, 5000);
	if(count > 0)
		timer2 = setTimeout(playnext, 5000 + parseInt(document.getElementById("period").value));
}