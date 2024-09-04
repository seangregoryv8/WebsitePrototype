const jsonFolderPath = "./json/";

export async function fetchJsonFiles()
{
    try
    {
        const fileNames = ["computer.json", "film.json"];

        const jsonData = await Promise.all(fileNames.map(async file => 
        {
            const response = await fetch(`${jsonFolderPath}${file}`);
            if (!response.ok) throw new Error(`Failed to fetch ${file}`)
            return response.json();
        }));
        let arr = []
        for (let i = 0; i < jsonData.length; i++)
        {
            arr[i] = {
                title: fileNames[i].replace(".json", ""),
                data: jsonData[i]
            }
        }
        return arr;
    }
    catch (error) { console.log("Error fetching JSON files:", error)}
}
