import { fetchJsonFiles } from "./readJson.js";

var jsonPortfolio = [];

async function getData()
{
    jsonPortfolio = await fetchJsonFiles() || [];
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
                let item = document.createElement("section");
                item.classList.add("item");

                let title = document.createElement("h2");
                title.classList.add("itemTitle");
                title.innerHTML = formatTitle(keys[i]);
                item.appendChild(title);

                let description = document.createElement("p");
                description.classList.add("itemDescription");
                description.innerHTML = arr[i].description;
                item.appendChild(description);

                let source;
                console.log(arr[i].type)
                switch (arr[i].type)
                {
                    case "film":
                        source = document.createElement("iframe");
                        source.classList.add("itemImage");
                        source.src = arr[i].source;
                        item.appendChild(source);
                    case "game":
                        source = document.createElement("img");
                        source.classList.add("itemImage");
                        source.src = arr[i].preview;
                        source.onclick = () => window.location.href = arr[i].source;
                        item.appendChild(source);
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
    let navbar = document.getElementsByClassName("navbar")[0];
    let items = navbar.getElementsByTagName("div");
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

getData();