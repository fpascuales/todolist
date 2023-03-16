import { Tarea } from "./tarea.js";
let db = {
    tareas:[],
    tareasBorradas:[],
    id: 0
}
//Para mantener los datos en memoria del navegador
const guardarCambios = () =>{
    localStorage.setItem('tareas',JSON.stringify(db))
}
//Para que cuando recarguemos página, nos muestre los datos guardados
document.addEventListener('DOMContentLoaded', () =>{
    const dbGuardado = JSON.parse(localStorage.getItem('tareas'))
    if(dbGuardado){
        db = dbGuardado
        listarTareas()
        tareasEliminadas()
    }
})

const listaTareas = document.querySelector('#lista-tareas')
const listaTEliminadas = document.querySelector('#tareas-eliminadas')
const divAddTarea = document.createElement("div")
const inputAddTarea = document.createElement("input")
const btnAddTarea = document.createElement("button")
const ulTarea = document.createElement("ul")
const ulTareaEliminada = document.createElement("ul")
divAddTarea.setAttribute("class", "b-tarea-add")
inputAddTarea.setAttribute("class", "input-add")
btnAddTarea.setAttribute("class", "b-btn b-btn--add")
ulTarea.setAttribute("class", "b-lista")
ulTareaEliminada.setAttribute("class", "b-lista")
btnAddTarea.innerHTML = "+"
listaTareas.appendChild(divAddTarea)
listaTareas.appendChild(ulTarea)
divAddTarea.appendChild(inputAddTarea)
divAddTarea.appendChild(btnAddTarea)
listaTEliminadas.appendChild(ulTareaEliminada)

const meterTarea = () => {
    const textTarea = inputAddTarea.value.trim();
    const existeTarea = db.tareas.map(x=>x.tarea).includes(textTarea)
         if(textTarea !== ""){
            if (!existeTarea) {
              db.id++;
              const tareaIncluir = new Tarea(db.id, textTarea, false);
              db.tareas.push(tareaIncluir);
              listarTareas();
              inputAddTarea.value = "";
            }
            else {
                alert("La tarea ya existe")
            }
        }
        else{
            alert("Introduzca un valor correcto")
        }
        inputAddTarea.focus()
        guardarCambios()
}
const tareasEliminadas = () => {
    ulTareaEliminada.innerHTML = ''
    for (const tarea of db.tareasBorradas) {
        const liTarea = document.createElement("li")
        const divTarea = document.createElement("div")
        const spanTarea = document.createElement("span")
        spanTarea.setAttribute("class", "b-nom-tarea")
        divTarea.setAttribute("class", "b-div-tarea")
        spanTarea.innerHTML = tarea.tarea
        ulTareaEliminada.appendChild(liTarea)
        liTarea.appendChild(divTarea)
        divTarea.appendChild(spanTarea)
    }
}
const listarTareas = () => {
    ulTarea.innerHTML = ''
    for (const tarea of db.tareas) {
        const liTarea = document.createElement("li")
        const divTarea = document.createElement("div")
        const spanTarea = document.createElement("span")
        const btnTHecho = document.createElement("button")
        const btnTBorrar = document.createElement("button")
        liTarea.setAttribute("id", `li-${tarea.id}`)
        btnTHecho.setAttribute("id", `btn-h${tarea.id}`)
        btnTBorrar.setAttribute("id", `btn-b${tarea.id}`)
        spanTarea.setAttribute("class", "b-nom-tarea")
        divTarea.setAttribute("class", "b-div-tarea")
        btnTHecho.setAttribute("class", "b-btn b-btn--hecho")
        btnTBorrar.setAttribute("class", "b-btn b-btn--borrar")
        spanTarea.innerHTML = tarea.tarea
        btnTHecho.innerHTML = "🗸"
        btnTBorrar.innerHTML = "X"
        ulTarea.appendChild(liTarea)
        liTarea.appendChild(divTarea)
        if(tarea.hecha){
            divTarea.style.backgroundColor = "rgb(111, 187, 104)"
            spanTarea.style.color = "#fff"
        }
        divTarea.appendChild(spanTarea)
        divTarea.appendChild(btnTHecho)
        divTarea.appendChild(btnTBorrar)
        btnTHecho.addEventListener('click',()=>{
            completarTarea(tarea, divTarea, spanTarea)
        })
        btnTBorrar.addEventListener('click',()=>{
            borrarTarea(tarea, liTarea)
        })
    }
}
const completarTarea = (tarea, divTarea, spanTarea) => {
    if(tarea.hecha){
        tarea.hecha = false
        divTarea.style.backgroundColor = "#dadada"
        spanTarea.style.color = "#353535"
    }
    else{
        tarea.hecha = true
        divTarea.style.backgroundColor = "rgb(111, 187, 104)"
        spanTarea.style.color = "#fff"
    }    
    guardarCambios()
}
const borrarTarea = (tarea, liTarea) => {
    const tareaBorrada = new Tarea(tarea.id, tarea.tarea, tarea.hecha)
    db.tareasBorradas.push(tareaBorrada)
    db.tareas = db.tareas.filter(t => t.id !== tarea.id)
    ulTarea.removeChild(liTarea)
    tareasEliminadas()
}
btnAddTarea.addEventListener('click',()=>{
    meterTarea()

})
inputAddTarea.addEventListener('keyup',(event)=>{
    if(event.key === 'Enter'){
        meterTarea()
    }
})
