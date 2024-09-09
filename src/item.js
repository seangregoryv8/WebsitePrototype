import { getRandomNumber, jsonColours } from "./main.js";

const jsonString = localStorage.getItem("portfolioItem") || "";
const data = JSON.parse(jsonString);
console.log(data);

const imageURL = localStorage.getItem("backgroundImageUrl");

if (imageURL)
{
    let content = document.getElementsByClassName("content")[0];
    content.style.backgroundImage = `url('${imageURL}')`;

    const img = new Image();
    img.src = imageURL;

    img.onload = () => { content.style.height = `${img.height}px` }
}

document.getElementsByClassName("contentTitle")[0].innerHTML = data.title;

let description = document.getElementsByClassName("contentDesc")[0];
description.innerHTML = "";

data.description.forEach(desc => 
{
    let p = document.createElement("p");
    p.innerHTML = desc;
    description.appendChild(p);

    let br = document.createElement("br");
    description.appendChild(br);
});

document.getElementsByClassName("contentBox")[0].style.backgroundImage = `url('../../images/borders/border-${getRandomNumber(1, 4)}.svg')`

function formulateButton()
{
    let button = document.getElementsByTagName("button")[0];

    switch(data.type)
    {
        case "film":
            button.innerHTML = "Watch now!"
            button.addEventListener("click", () => { window.location.href = data.source })
            let time = data.length;
            let minutes = Math.floor(time / 60);
            let seconds = (time % 60 < 10) ? "0" + time % 60 : time % 60;

            let p = document.createElement("p");
            p.innerHTML = `Length: ${minutes}:${seconds}`
            p.style.color = jsonColours.buttonBorder;
            p.style.fontSize = "36px";
            description.appendChild(p);
        break;
    }
    
    let br = document.createElement("br");
    description.appendChild(br);
}

formulateButton();