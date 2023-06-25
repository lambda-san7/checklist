const input = document.getElementById("input")
const tasks = document.getElementById("tasks")
const done = document.getElementById("done")

id = 0

function task(){
    if(input.value != ""){
        check = document.createElement("input")
        check.type = "checkbox"
        check.classList.add("checkbox")
        check.id = "testing"

        txt = document.createElement("input")
        txt.value = input.value
        txt.classList.add("editable")
        txt.id = "testing"

        br = document.createElement("br")
        br.id = "testing"
        
        tasks.appendChild(check);
        tasks.appendChild(txt);
        tasks.appendChild(br);

        check.addEventListener(
            "click",
            function() {
                markDone(check,txt,br)
            }
        );
        input.value = ""
    }
}

function markDone(taskCheck,taskName,taskBr){
    done.appendChild(taskCheck)
    done.appendChild(taskName)
    done.appendChild(taskBr)
    taskCheck.addEventListener(
        "click",
        function() {
            unmark(taskCheck,taskName,taskBr)
        }
    );
}

function unmark(taskCheck,taskName,taskBr){
    tasks.appendChild(taskCheck)
    tasks.appendChild(taskName)
    tasks.appendChild(taskBr)
    taskCheck.addEventListener(
        "click",
        function() {
            markDone(taskCheck,taskName,taskBr)
        }
    );
}