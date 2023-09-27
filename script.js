const input = document.getElementById("input")
const tasks = document.getElementById("do")
const done = document.getElementById("done")

id_tick = 1

var tasks_arr = []

var JSON_parse = JSON.parse(localStorage.getItem("tasks"))
if(JSON_parse == null){
    var JSON_parse = []
    var tasks_arr = []
}

var save = function(){
    console.log("saving...")
    obj_arr = []
    for(let i = 0; i < tasks_arr.length; i++){
        obj_arr.push(
            {
                name: tasks_arr[i].name,
                box: tasks_arr[i].box,
            }
        )
    }
    var JSON_arr = JSON.stringify(obj_arr);
    localStorage.setItem("tasks", JSON_arr);
    console.log("saved!")
    console.log(localStorage.getItem("tasks"))
}

class task{
    constructor(name,box){
        this.id = id_tick
        this.box = box
        this.name = name
        
        console.log(box)
        this.check = document.createElement("input")
        this.check.type = "checkbox"
        this.check.classList.add("checkbox")
        this.check.id = `${this.id}check`
        this.check.onclick = () => {
            if(this.box == "do"){
                done.appendChild(this.check)
                done.appendChild(this.del)
                done.appendChild(this.txt)
                done.appendChild(this.br)
                this.box = "done"
                save()
                return
            }
            if(this.box == "done"){
                tasks.appendChild(this.check)
                tasks.appendChild(this.del)
                tasks.appendChild(this.txt)
                tasks.appendChild(this.br)
                this.box = "do"
                save()
                return
            }
        }

        this.txt = document.createElement("input")
        this.txt.value = name
        this.txt.classList.add("editable")
        this.txt.id = `${this.id}txt`

        this.del = document.createElement("button")
        this.del.classList.add("delete")
        this.del.innerHTML = "X"
        this.del.onclick = () => {
            tasks_arr.splice(tasks_arr.indexOf(this), 1)
            document.getElementById(this.box).removeChild(this.check);
            document.getElementById(this.box).removeChild(this.del);
            document.getElementById(this.box).removeChild(this.txt);
            document.getElementById(this.box).removeChild(this.br);
            save()
        }
    
        this.br = document.createElement("br")
        this.br.id = this.id

        document.getElementById(this.box).appendChild(this.check);
        document.getElementById(this.box).appendChild(this.del);
        document.getElementById(this.box).appendChild(this.txt);
        document.getElementById(this.box).appendChild(this.br);

        id_tick += 1
        input.value = ""
        tasks_arr.push(this)
        save()
    }
}

for(let i = 0; i < JSON_parse.length; i++){
    new_task = new task(JSON_parse[i].name, JSON_parse[i].box)
}

var clear_all = function(){
    switch(confirm("are you sure you want to delete all tasks?")){
        case true:
            console.log(`array is ${tasks_arr.length} long`)
            for(let i = 0; i < tasks_arr.length + 2; i++){
                console.log(i,tasks_arr[0])
                tasks_arr[0].del.onclick()
            }
            save()
        default:
            console.log("cancelled delete all")
            save()
    } 
}