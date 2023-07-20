document.addEventListener("DOMContentLoaded", function () {
  const markers = document.querySelectorAll("a-marker");

  markers.forEach((marker, index) => {
    const buttonContainer = document.getElementById(
      `button-container-${index + 1}`
    );
    const video = document.getElementById(`video${index + 1}`);
    const instructionElement = document.getElementById("instruction");
    marker.addEventListener("markerFound", function () {
      instructionElement.style.display = "block";
      instructionElement.style.animation =
        "pinchAnimation 2s ease-out infinite";
      buttonContainer.style.display = "block"; // Show the button container

      console.log("marker found");
      video.play();
    });

    marker.addEventListener("markerLost", function () {
      buttonContainer.style.display = "none"; // Hide the button container
      instructionElement.style.display = "none";
      video.pause();
      video.currentTime = 0;
    });
  });
});

// Functions to control the videos

let previousButtonId = null;

function resetPreviousButtonColor() {
  if (previousButtonId) {
    const previousButtonIcon = document.getElementById(previousButtonId);
    previousButtonIcon.style.color = "black"; // Reset to initial color (empty string)
  }
}


function playVideo(index) {
  const video = document.getElementById(`video${index + 1}`);
  video.play();
  document.getElementById(`playIcon${index + 1}`).style.color = "blue";
  resetPreviousButtonColor();
  previousButtonId = `playIcon${index + 1}`;
}

function pauseVideo(index) {
  const video = document.getElementById(`video${index + 1}`);
  video.pause();
  document.getElementById(`pauseIcon${index + 1}`).style.color = "blue";
  resetPreviousButtonColor();
  previousButtonId = `pauseIcon${index + 1}`;
  
}

function seekVideo(index, time) {
  const video = document.getElementById(`video${index + 1}`);
  video.currentTime += time;
  resetPreviousButtonColor();
}
function mutevideo(index) {
    
  const video = document.getElementById(`video${index + 1}`);
  const volumeUpIcon = document.getElementById(`volumeUpIcon${index + 1}`);
  const volumeOffIcon = document.getElementById(`volumeOffIcon${index + 1}`);

  if (video.muted == true) {
    volumeUpIcon.style.display = "inline";
    volumeOffIcon.style.display = "none";
    video.muted = false;
  } else {
    volumeUpIcon.style.display = "none";
    volumeOffIcon.style.display = "inline";
    video.muted = true;
  }
  resetPreviousButtonColor();
}
function translatex(index, i, axe) {
    resetPreviousButtonColor();
  const video = document.getElementById(`plane${index + 1}`);
  if (axe == "x") video.object3D.translateX(i);
  else video.object3D.translateY(i);

  console.log("position:", video.object3D.position);

  this.el.sceneEl.addEventListener("onefingermove", this.removeinstruction);


}
