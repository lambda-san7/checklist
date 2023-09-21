const input = document.getElementById("input")
const tasks = document.getElementById("do")
const done = document.getElementById("done")

id_tick = 1

var tasks_arr

var tasks_arr = JSON.parse(localStorage.getItem("tasks"))
if(tasks_arr == null){
    var tasks_arr = []
}

var new_task = function(name,box){
    new task(name,box)
    console.log(box)
    tasks_arr.push(
        {
            task_name: name,
            task_box: box,
        }
    )
    var JSON_arr = JSON.stringify(tasks_arr);
    localStorage.setItem("tasks", JSON_arr);
}

class task{
    constructor(name,box){
        this.id = id_tick
        this.box = box
        this.name = name

        this.check = document.createElement("input")
        this.check.type = "checkbox"
        this.check.classList.add("checkbox")
        this.check.id = `${this.id}check`
        this.check.onclick = () => {
            if(this.box == "do"){
                done.appendChild(this.check)
                done.appendChild(this.txt)
                done.appendChild(this.br)
                this.box = "done"
                for(let i = 0; i < tasks_arr.length; i++){
                    if(tasks_arr[i].task_name == this.name){
                        tasks_arr[i].task_box = "done"
                        console.log(tasks_arr[i].task_box)
                    }
                }
                var JSON_arr = JSON.stringify(tasks_arr);
                localStorage.setItem("tasks", JSON_arr);
                return
            }
            if(this.box == "done"){
                tasks.appendChild(this.check)
                tasks.appendChild(this.txt)
                tasks.appendChild(this.br)
                this.box = "do"
                for(let i = 0; i < tasks_arr.length; i++){
                    if(tasks_arr[i].task_name == this.name){
                        tasks_arr[i].task_box = "do"
                        console.log(tasks_arr[i].task_box)
                    }
                }
                var JSON_arr = JSON.stringify(tasks_arr);
                localStorage.setItem("tasks", JSON_arr);
                return
            }
        }

        this.txt = document.createElement("input")
        this.txt.value = name
        this.txt.classList.add("editable")
        this.txt.id = `${this.id}txt`
    
        this.br = document.createElement("br")
        this.br.id = this.id
            
        document.getElementById(this.box).appendChild(this.check);
        document.getElementById(this.box).appendChild(this.txt);
        document.getElementById(this.box).appendChild(this.br);

        id_tick += 1
        input.value = ""
    }
}

for(let i = 0; i < tasks_arr.length; i++){
    console.log(tasks_arr[i])
    new task(tasks_arr[i].task_name,tasks_arr[i].task_box)
}