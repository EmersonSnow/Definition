let definitionContainer = [];
let hasDefinitionArray = false;
let definitionExists = false;
function onLoad()
{
    getAllDefinitions();
    document.getElementById("newDefinitionValid").style.backgroundColor = "green";
    document.getElementById("newDefinitionValid").style.width = "30px";;
    document.getElementById("newDefinitionValid").style.height = "30px";
    
    document.getElementById("newDefinitionName").addEventListener("input", function(e)
    {
        let v = e.currentTarget.value.toLowerCase();
        definitionExists = false;
        for (let i = 0; i < definitionContainer.length; i++)
        {
            if (definitionContainer[i] == v)
            {
                definitionExists = true;
                break;
            }
        }
        if (definitionExists)
        {
            document.getElementById("newDefinitionValid").style.backgroundColor = "red";
        } else
        {
            document.getElementById("newDefinitionValid").style.backgroundColor = "green";
        }
        //TODO: Everytime an input is added, check against the db to see if it already exists
    });
}

function getAllDefinitions()
{
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            definitionContainer = JSON.parse(this.responseText);
            definitionContainer.sort((a, b) => a.localeCompare(b));
            hasDefinitionArray = true;
        }
    };
    xhttp.open("POST", "getall.php", true);
    xhttp.send();

}
window.onload = onLoad();