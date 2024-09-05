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
        options.appendChild(imgTag);

        imgTag.addEventListener("mouseclick", () => 
        {
            let nav = document.getElementsByClassName("navBar")[0];
            console.log(nav.clientHeight)
            
        })

        let divtag = document.createElement("div");
        divtag.classList.add("dropdown-content");

        let pTag = document.createElement("p");
        pTag.innerHTML = "Home";
        divtag.appendChild(pTag);
        pTag = document.createElement("p");
        pTag.innerHTML = "Projects";
        divtag.appendChild(pTag);
        pTag = document.createElement("p");
        pTag.innerHTML = "GitHub";
        divtag.appendChild(pTag);
        pTag = document.createElement("p");
        pTag.innerHTML = "Contact";
        divtag.appendChild(pTag);

        options.appendChild(divtag);
    }
}

resizeNav();

window.addEventListener('resize', resizeNav);
