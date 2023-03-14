

class AtoZ
{
    //Static global variables
    static alphabet = "abcdefghijklmnopqrstuvwxyz";
    static alphabetSize = 26;
    static #prefix = "AtoZ_";
    static #prefixHeader = "AtoZ_header_"

    static getLetterByIndex(i)
    {
        return this.alphabet.charAt(i);
    }
    static getIndexByLetter(l)
    {
       //TEMP:Find more efficent way of doing this
       for (let i = 0; i < AtoZ.alphabetSize; i++)
       {
            if (AtoZ.alphabet.charAt(i) == l)
            {
                return i;
            }
       }
       return -1;
    }
    #containerHTML;
    #alphabetArray;
    #alphabetHTMLLists = [];

    constructor(containerName)
    {
        //TEMP: May remove containerName
        //this.containerName = containerName;
        this.#containerHTML = document.getElementById(containerName);
        if (typeof this.#containerHTML === "undefined")
        {
            alert("Supplied container '"+containerName+"' does not exist!");
        }
        this.#constructHTML();
        this.getDefinitions();
    }

    #constructHTML()
    {
        for (let a = 0; a < AtoZ.alphabetSize; a++)
        {
            let letter = AtoZ.getLetterByIndex(a);
            let letterWrapper = document.createElement("div");
            letterWrapper.id = AtoZ.#prefix + letter;

            let letterHeader = document.createElement("h3");
            letterHeader.id = AtoZ.#prefix + "header_" + letter;
            letterHeader.innerHTML = letter;

            let letterList = document.createElement("ul");
            letterList.id = AtoZ.#prefix + letter + "_list";

            letterWrapper.append(letterHeader);
            letterWrapper.append(letterList);
            document.getElementById("classAtoZ").append(letterWrapper);

            this.#alphabetHTMLLists[a] = letterList;
        }
    }




    //Application spefic code
    getDefinitions()
    {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                let defArray = JSON.parse(this.responseText);
                defArray.sort((a, b) => a.localeCompare(b));
                for (let d = 0; d < defArray.length; d++)
                {
                    //alert(d);
                    let firstLetter = defArray[d].charAt(0);
                    let letterIndex = AtoZ.getIndexByLetter(firstLetter);
                    let li = document.createElement("li");
                    let button = document.createElement("button");
                    button.innerHTML = defArray[d];
                    button.addEventListener("click", function(e)
                    {
                        {
                            let h = document.getElementById("definitionHead");
                            h.innerHTML = e.currentTarget.innerHTML;
                        }
                    });
                    li.append(button);
                    document.getElementById(AtoZ.#prefix+firstLetter+"_list").append(li);
                    //this.#alphabetHTMLLists[letterIndex].append(li);
                }
                //loopThroughDefinitions(defArray);
            // alert(defArray);
            }
        };

    xhttp.open("POST", "getall.php", true);
    xhttp.send();
    }
}
function onLoad()
{
    let definitions = new AtoZ("classAtoZ");


    document.getElementById("definitionEdit").addEventListener("click", function()
    {
    
        let e = document.getElementById("editor");
        var options = {
            theme: 'snow'
          };
        var editor = new Quill(e, options);
    });
}

function getTargetInfo(name)
{
    //Do stuff, at the moment try query if it has definition already
    
}
window.load = onLoad();