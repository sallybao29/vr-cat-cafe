console.log("Script running...");

const cats = document.querySelectorAll(".cat");
const camera = document.querySelector("#camera");
const tray = document.querySelector("#food-tray");
console.log(cats);
console.log(camera);

const catActions = [
    twirl, 
    jump
];

function setup() {
    cats.forEach(cat => {
        console.log("foreach");
        cat.setAttribute("sound", "src: #meow");
        let rotation = getRandomFloat(0, 361);
        cat.setAttribute("rotation", {x: 0, y: rotation, z: 0});
        // Attach event listeners
        cat.parentNode.addEventListener("click", (e) => {
            e.preventDefault();
            meow(e);
            // Pick a random action for the target cat to take
            //catActions[getRandomInt(0, catActions.length)](e.target);
            jump(e.target);
            //twirl(e.target);
            //wander(e.target);
        });
        //cat.setAttribute("velocity", {x: 0, y: 0, z: 0.5});
    });
    makeFood();
}

function meow(e) {
    console.log("meow");
    let audio = e.target.components.sound;
    audio.pause();
    audio.currentTime = 0;
    audio.playSound();
    twirl(e.target);
}

function makeFood() {
    console.log("food");
    let fish = document.createElement("a-entity");
    fish.classList.add("fish");
    fish.setAttribute("position", {x: 0.1, y: 1.23, z: 0.03});
    fish.setAttribute("gblock", "#fish");
    fish.setAttribute("rotation", "0 0 90");
    fish.setAttribute("scale", "0.003 0.003 0.003");
    tray.appendChild(fish);
}

function follow(e) {
    let cursor = camera.firstElementChild;
    let cursorPos = cursor.object3D.position;
    let target = e.target;
    let targetWorldPos = target.parentNode.object3D.position.clone().sub(target.object3D.position.clone());
    console.log(targetWorldPos);
    target.setAttribute("position", {x: cursorPos.x, y: cursorPos.y, z: cursorPos.z});
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function jump(cat) {
    let yVel = getRandomFloat(1, 5);
    cat.body.applyLocalImpulse(
        new CANNON.Vec3(0, yVel, 0),
        new CANNON.Vec3(0, 0, 0).copy(cat.body.position)
    );
}

function wander(cat) {
    let speed = getRandomFloat(0.5, 2);
    let rotation = cat.body.rotation;
    
    cat.setAttribute("velocity", {x: speed, y: 0, z: 0});
}

function twirl(cat) {
    let angle = getRandomInt(0, 180);
    let rotation = cat.object3D.rotation;
    cat.innerHTML = `"<a-animation 
                attribute="rotation"
                dur="500"
                fill="forwards"
                to="0 ${rotation.y + angle} 0">
                easing="ease-in-out"
                </a-animation>"`;
}

setup();