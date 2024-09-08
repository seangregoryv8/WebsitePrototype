function getData()
{
    const params = new URLSearchParams(window.location.search);
    const data = {};
    for (const [key, value] of params)
    {
        data[key] = value;
    }
    return data;
}

const data = getData();
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
