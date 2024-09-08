import { fetchInfoJsonFiles, fetchJsonFiles } from "./readJson.js";

var language = "en";
var jsonPortfolio = [];
var jsonInfo = [];

export function getLanguage() { return language; }

async function getData()
{
    jsonPortfolio = await fetchJsonFiles() || [];
    jsonInfo = await fetchInfoJsonFiles() || [];
}

export function changeLanguage(newLanguage)
{
    language = newLanguage;
    getAboutMe();
}

function resizeTitle()
{
    let width = window.innerWidth
    let sec = document.getElementsByClassName("title")[0];

    let height = (width / 2.5 < 600) ? 600 : width / 2.5
    
    sec.style.height = `${height}px`
    let titl = document.getElementsByTagName("h1")[0];
    titl.style.paddingBottom = `${height / 2}px`
}

function getPortfolioExplanations()
{
    let obj = (language == "en") ? jsonInfo.en : jsonInfo.fr;
    document.getElementsByClassName("explanationTitle")[0].innerHTML = obj.portfolioDesc
}

function getAboutMe()
{
    let obj = (language == "en") ? jsonInfo.en : jsonInfo.fr;
    document.getElementsByClassName("aboutMeTitle")[0].innerHTML = obj.aboutMeTitle
    let desc =  document.getElementsByClassName("aboutMeDescription")[0]
    desc.innerHTML = ""
    obj.aboutMeDescription.forEach(line =>
    {
        let lin = document.createElement("p");
        lin.innerHTML = line;
        desc.appendChild(lin);

        desc.appendChild(document.createElement("br"));
    });
    document.getElementsByClassName("aboutMeProjectComputer")[0].innerHTML = obj.projectsComputer
    document.getElementsByClassName("aboutMeProjectFilm")[0].innerHTML = obj.projectsFilm
    document.getElementsByClassName("aboutMeWorkWith")[0].innerHTML = obj.work

    let languages = obj.languages
    document.getElementsByClassName("aboutLanguagesTitle")[0].innerHTML = languages.title;
    document.getElementsByClassName("aboutLangaugesDescription")[0].innerHTML = languages.info;

    document.getElementsByClassName("allLanguages")[0].innerHTML = ""
    languages.expert.forEach(language => languageMaker(language, "Expert"))
    languages.intermediate.forEach(language => languageMaker(language, getLanguage() == "en" ? "Intermediate" : "Intermédiaire"))
    languages.beginner.forEach(language => languageMaker(language, getLanguage() == "en" ? "Beginner" : "Débutant"))
}

function languageMaker(desc, exp)
{
    let p = document.createElement("p");
    p.innerHTML = "(" + exp + ") " + desc;
    document.getElementsByClassName("allLanguages")[0].appendChild(p);
}

/**
 * 
 * @param {string} type 
 */
function showData(type)
{
    jsonPortfolio.forEach(port => {
        if (type.toLowerCase().includes(port.title))
        {
            let arr = Object.values(port.data)
            let keys = Object.keys(port.data)
            let home = document.getElementsByClassName("list")[0];
            for (let i = 0; i < arr.length; i++)
            {
                let key = formatTitle(keys[i]).trim();
                let item = document.createElement("section");
                item.classList.add("item");
                item.onclick = () => 
                {
                    const newThing = arr[i];
                    newThing.title = key;
                    const queryString = new URLSearchParams(newThing);
                    const imageURL = `./images/${arr[i].images}/main.png`;
                    localStorage.setItem("backgroundImageUrl", imageURL)
                    window.location.href = `./item.html?${queryString}`;
                }

                let title = document.createElement("h2");
                title.id = "itemTitle";
                title.classList.add("shine");
                title.innerHTML = key;
                item.appendChild(title);

                let source;

                if (arr[i].images != null)
                {
                    source = document.createElement("img");
                    source.classList.add("itemImage");
                    source.src = `./images/${arr[i].images}/thumb.png`;
                    item.appendChild(source);
                }
                else
                {
                    switch (arr[i].type)
                    {
                        case "film":
                            source = document.createElement("iframe");
                            source.classList.add("itemImage");
                            source.src = arr[i].source;
                            item.appendChild(source);
                            break;
                        case "game":
                            source = document.createElement("img");
                            source.classList.add("itemImage");
                            source.src = arr[i].preview;
                            source.onclick = () => window.location.href = arr[i].source;
                            item.appendChild(source);
                            break;
                    }
                }
                home.appendChild(item);
            }
        }
    })
}

/**
 * 
 * @param {string} title 
 */
function formatTitle(title)
{
    let newTitle = "";
    let i = 0;
    let character = '';
    while (i <= title.length)
    {
        character = title.charAt(i);
        if (i == 0) newTitle += character.toUpperCase();
        else
        {
            if (character == character.toUpperCase()) newTitle += " " + character
            if (character == character.toLowerCase()) newTitle += character
        }
        i++;
    }
    return newTitle
}

document.addEventListener('DOMContentLoaded', () => 
{
    let navBarOptions = document.getElementsByClassName("navBarOptions")[0];
    let items = navBarOptions.getElementsByTagName("div");
    for (let i = 0; i < items.length; i++)
    {
        //items[i].children[0].style.backgroundColor = "#8b0000"
        items[i].children[0].addEventListener("click", () => 
        {
            //items[i].children[0].style.backgroundColor = "#00AA00"
            document.getElementsByClassName("list")[0].textContent = "";
            showData(items[i].children[0].innerHTML);
        });
    }
})

await getData();
console.log(window.location.href.indexOf("index.html"))
if (window.location.href.indexOf("index.html") != -1)
{
    resizeTitle();
    getAboutMe();
}
else if (window.location.href.indexOf("portfolio.html") != -1)
{
    getPortfolioExplanations();
    resizeTitle();
}
console.log(window.location.href)