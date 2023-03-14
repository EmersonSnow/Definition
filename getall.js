let alphabet = "abcdefghijklmnopqrstuvwxyz";
let alphabetLength = 26;
let alphabetArray = [];
let alphabetArrayCount = [];
let count = 0;
let headerPrefix = "letterHeader_";

for (let a = 0; a < alphabetLength; a++)
{
    alphabetArray[a] = [];
    alphabetArrayCount[alphabet.charAt(a)] = 0;
}
while (count < alphabet.length)
{
    let c = alphabet.charAt(count);

    let letterWrapper = document.createElement("div");
    letterWrapper.id = "letterWrapper_" + c;

    let letterHeader = document.createElement("h2");
    letterHeader.innerHTML = c;
    letterHeader.id = headerPrefix + c;

    let letterList = document.createElement("ul");
    letterList.id = "letterList_" + c;

    letterWrapper.append(letterHeader);
    letterWrapper.append(letterList);
    document.getElementById("definitionWrapper").append(letterWrapper);
    //document.getElementsByTagName("body")[0].append(letterHeader);
    count = count+1;
}
function getDefinitions()
{
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            let defArray = JSON.parse(this.responseText);
            loopThroughDefinitions(defArray);
           // alert(defArray);
        }
    };

    xhttp.open("POST", "getall.php", true);
    xhttp.send();
}
function loopThroughDefinitions(defArray)
{
    for (let a = 0; a < alphabet.length; a++)
    {
        for (let d = 0; d < defArray.length; d++)
        {
            let currentLetter = alphabet.charAt(a);
            if (currentLetter == defArray[d]["name"].charAt(0))
            {
                appendAlphabetMap(index, currentLetter, defArray[d]);
                //alert(alphabet.charAt(a) + " for " + defArray[d]["name"]);
                //alphabetArray[alphabet.charAt(a)].push(defArray[d]);
                //let li = document.createElement("li");
                //li.innerHTML = defArray[d]["name"];
                //document.getElementById("letterList_"+alphabet.charAt(a)).append(li);
            }
            alphabetArray[a].sort((f, s) => f.name.localeCompare(s.name));
            
        }
    }
    populateDefinitionsHTML();
}

function populateDefinitionsHTML()
{
    alert("Got here!");
    alert(alphabetArray.length);
    for (let a = 0; a < alphabetArray.length; a++)
    {
        for (let d = 0; d < alphabetArray[a].length; d++)
        {
            alert( li.innerHTML);
            let li = document.createElement("li");
            li.innerHTML = alphabetArray[a][d]["name"];
            document.getElementById("letterList_"+alphabet.charAt(a)).append(li);;

        }
    }
}

function sortAlphabetically(a, b)
{
    return a.localeCompare(b);
}

function appendAlphabetMap(index, letter, definitionArray)
{
    alphabetArray[letter][alphabetArrayCount[index]] = definitionArray;
    //alert(alphabetArray[letter][alphabetArray[letter].count].name);
    alphabetArrayCount[index] = alphabetArrayCount[index];
}
window.onload = getDefinitions();