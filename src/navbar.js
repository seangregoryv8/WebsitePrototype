function resizeNav()
{
    let width = window.screen.availWidth
    let options = document.getElementsByClassName("dropdown")[0];
    options.innerHTML = "";
    if (width >= 1160)
    {
        let pTag = document.createElement("p");
        pTag.innerHTML = "Home";
        options.appendChild(pTag);
        pTag = document.createElement("p");
        pTag.innerHTML = "Projects";
        options.appendChild(pTag);
        pTag = document.createElement("p");
        pTag.innerHTML = "GitHub";
        options.appendChild(pTag);
        pTag = document.createElement("p");
        pTag.innerHTML = "Contact";
        options.appendChild(pTag);
    }
    else
    {
        let imgTag = document.createElement("img");
        imgTag.classList.add("dropbtn");
        imgTag.src = "./icons/menu.png";
        imgTag.width = 50;
        imgTag.align = "right";
        options.appendChild(imgTag);

        imgTag.addEventListener("click", () => 
        {
            let nav = document.getElementsByTagName("nav")[0];
            if (options.children.length == 1)
            {
                let divtag = document.createElement("div");
                divtag.classList.add("dropdown-content");
        
                makeTags(["Home", "Projects", "GitHub", "Contact"], divtag);

                options.appendChild(divtag);

                nav.style.height = "auto";
            }
            else
            {
                nav.style.height = "96px";
                
                options.removeChild(options.children[1]);
            }
        })
    }
}
/**
 * 
 * @param {string[]} tags 
 * @param {HTMLDivElement} divtag
 */
function makeTags(tags, divtag)
{
    for (let i = 0; i < tags.length; i++)
    {
        let pTag = document.createElement("p");
        pTag.innerHTML = tags[i];
        pTag.style.textAlign = "right";
        pTag.style.marginRight = "10px";
        pTag.style.paddingTop = "10px";
        divtag.appendChild(pTag);
    }
}

resizeNav();

window.addEventListener('resize', resizeNav);
