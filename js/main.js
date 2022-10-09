// знаходим елементи на сторінці
const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

// додавання завдання
form.addEventListener('submit', addTask)

// видалення задачі
tasksList.addEventListener('click', deleteTask)

// позначення завдання виконаним
tasksList.addEventListener('click', doneTask)


if (localStorage.getItem('tasksHTML')) {
    tasksList.innerHTML = localStorage.getItem('tasksHTML')
}


// функції 
function addTask (event) {
        // відміняєм відправку форми
        event.preventDefault()


        // дістаєм текст завдання з поля вводу
        const taskText = taskInput.value
    
        // формуєм розмітку для нового завдання
    
        const taskHTML = `<li class="list-group-item d-flex justify-content-between task-item">
        <span class="task-title">${taskText}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
    </li>`
        
    
        // додаємо завдання на сторінку
        tasksList.insertAdjacentHTML('beforeend', taskHTML)
    
        // очищаєм поле вводу і повертаєм на нього фокус
        taskInput.value = "" 
        taskInput.focus()
    
    
        // забираєм інформацію про те що список справ пустий
        if (tasksList.children.length > 1) {
            emptyList.classList.add('none') // прописано в css
        }

        saveHTMLtoLS()
}


function deleteTask (event) {


    // перевіряєм чи клік був по кнопці видалити
    if (event.target.dataset.action === 'delete') {
        const parentNode = event.target.closest('li')
        parentNode.remove()

        // якщо немає елементів показувати що список пустий
        if (tasksList.children.length == 1) {
            emptyList.classList.remove('none')
        }
    }

    saveHTMLtoLS()

    

}

function doneTask (event) {
    // перевіряєм чи клік був по внопці виконано
    if (event.target.dataset.action === 'done') {
        const parentNode = event.target.closest('li')
        const taskTitle = parentNode.querySelector('.task-title')
        taskTitle.classList.toggle('task-title--done')
        }

    saveHTMLtoLS()
}

function saveHTMLtoLS () {
    localStorage.setItem('tasksHTML', tasksList.innerHTML)
}