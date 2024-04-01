const eyeLeftOffsetX = 78;
const eyeLeftOffsetY = 129;

const eyeRightOffsetX = 194;
const eyeRightOffsetY = 129;

const eyeSize = 58;

let catEyeLeft, catEyeRight;

const catImg = document.querySelector("img#cat-image");

const intializeCat = function (updateSize = true) {
    const catRect = catImg.getBoundingClientRect();
    
    if (!catEyeLeft) {
        catEyeLeft = document.createElement("canvas");
        catEyeRight = document.createElement("canvas");

        catEyeLeft.classList.add("cat");
        catEyeRight.classList.add("cat");

        document.body.appendChild(catEyeLeft);
        document.body.appendChild(catEyeRight);
    }

    if (updateSize) {
        catEyeLeft.style.width = eyeSize + "px";
        catEyeLeft.style.height = eyeSize + "px";
        catEyeLeft.width = eyeSize;
        catEyeLeft.height = eyeSize ;
        catEyeRight.style.width = eyeSize + "px";
        catEyeRight.style.height = eyeSize + "px";
        catEyeRight.width = eyeSize;
        catEyeRight.height = eyeSize;
    }

    catImg.style.opacity = 1;

    catEyeLeft.style.left = catRect.left + eyeLeftOffsetX + "px";
    catEyeLeft.style.top = catRect.top + eyeLeftOffsetY + "px";
    catEyeLeft.style.opacity = 1;


    catEyeRight.style.left = catRect.left + eyeRightOffsetX + "px";
    catEyeRight.style.top = catRect.top + eyeRightOffsetY + "px";
    catEyeRight.style.opacity = 1;

}



const drawEyes = function (x, y) {
    const rectl = catEyeLeft.getBoundingClientRect();
    const rectr = catEyeRight.getBoundingClientRect();

    const ctxl = catEyeLeft.getContext('2d');
    const ctxr = catEyeRight.getContext('2d');



    ctxl.fillStyle = "black";
    ctxr.fillStyle = "black";

    drawEye = function (rect, ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        tx = x - rect.left;
        ty = y - rect.top;
        center = getCenter(rect);
        distance = getDistance(x, y, center[0], center[1]);
        if (distance > 20) {
            angle = Math.atan2((y - center[1]), (x - center[0]));
            tx = ctx.canvas.width / 2 + 20 * Math.cos(angle);
            ty = ctx.canvas.height / 2 + 20 * Math.sin(angle);
        }

        ctx.beginPath();
        ctx.arc(tx, ty, 8, 0, 2 * Math.PI);
        ctx.fill();
    }
    drawEye(rectr, ctxr);
    drawEye(rectl, ctxl);

}
getDistance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}
getCenter = function (rect) {
    var x = rect.left + (rect.right - rect.left) / 2;
    var y = rect.top + (rect.bottom - rect.top) / 2;
    return [x, y];
}

console.log("init cat")
if (!catImg.complete) {
    catImg.addEventListener("load", () => {
        intializeCat();
        drawEyes(window.innerWidth / 2, window.innerHeight / 2);
    });
} else {
    intializeCat();
    drawEyes(window.innerWidth / 2, window.innerHeight / 2);
}

document.addEventListener("DOMContentLoaded", e => {
    window.addEventListener("resize", () => {
        intializeCat(false);
    })

    document.addEventListener("mousemove", (e) => {
        drawEyes(e.clientX, e.clientY);
    });
    document.addEventListener("touchstart", (e) => {
        console.log(e)
        drawEyes(e.touches[0].clientX, e.touches[0].clientY);
    });
    document.addEventListener("touchmove", (e) => {
        drawEyes(e.touches[0].clientX, e.touches[0].clientY);
    });
});
