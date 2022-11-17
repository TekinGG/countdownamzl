// Credit: Johannes Berghaeuser

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 360;
const ALERT_THRESHOLD = 180;

let TIME_LIMIT = programTimerBasedOnTime();
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let remainingPathColor = "rgb(65, 184, 131)";

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <span style="color:${remainingPathColor}; font-weight: bold;" id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

startTimer();

function programTimerBasedOnTime() {
	var now = new Date();
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
	var wavetimer=32400;
	var wave1=37200;
	var wave2=38400;
	var wave3=39600;
	var wave4=40800;
	var wave5=42000;
	var wave6=43200;
	var wave7=44400;
	var wave8=45600;
	var wave9=36000;
	
	now= (hours*3600)+(minutes*60)+seconds;
	if (now<wavetimer){
		console.log("0");
		return 60;
	} else {
		if (now>wave1){
			if (now>wave2) {
				if (now>wave3){
					if (now>wave4){
						if(now>wave5) {
							if(now>wave6) {
								if(now>wave7) {
									if(now>wave8) {
										if(now>wave9) {
											return 60;
										}
									}
									now = wave9-now;
									return now;
								}
								now = wave8-now;
								return now;
							}
							now = wave7-now;
							return now;
						}
						now = wave6-now;
						return now;
					}
					now = wave5-now;
					return now;
				}
				now = wave4-now;
				return now;
			}
			now = wave3-now;
			return now;
		}
		now = wave2-now;
		return now;
	}
	now = wave1-now;
	return now;
}

function onTimesUp() {
  location.reload();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
	
	if (timeLeft<=WARNING_THRESHOLD) {
		remainingPathColor= "orange";
		if(timeLeft<=ALERT_THRESHOLD) {
			remainingPathColor= "red";
		}	
	}
	
    document.getElementById("app").innerHTML = `
		<div class="base-timer">
			<span style="color:${remainingPathColor}; font-weight: bold;" id="base-timer-label" class="base-timer__label">${formatTime(
				timeLeft
		)}</span>
		</div>
		`;
	
    if (timeLeft < 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}
