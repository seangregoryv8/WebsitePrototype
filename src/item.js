import { getRandomNumber } from "./main.js";

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