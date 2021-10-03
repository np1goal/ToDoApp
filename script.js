let activeVisibility = 'all'

let mapItems = [
    { item: 'This is to do list item 1', status: 'completed' },
    { item: 'This is to do list item 2', status: 'active' },
    { item: 'This is to do list item 3', status: 'completed' },
    { item: 'This is to do list item 4', status: 'completed' },
    { item: 'This is to do list item 5', status: 'active' },
    { item: 'This is to do list item 6', status: 'active' },
    { item: 'This is to do list item 7', status: 'completed' }
]

document.getElementById(activeVisibility).style.color = '#71b6f9';
filterItems('all')

function visibilityControl(newVisibility) {
    while(document.getElementById('todo-list').firstChild) {
        document.getElementById('todo-list').removeChild(document.getElementById('todo-list').firstChild)
    }
    filterItems(newVisibility)
    document.getElementById(activeVisibility).style.color = 'hsl(236, 25%, 66%)';
    activeVisibility = newVisibility
    document.getElementById(activeVisibility).style.color = '#71b6f9';
}

document.getElementById('add-item').addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        console.log(event.target.value)
        addItem(event.target.value)
    }
})

function filterItems(status) {
    for(let i = 0; i < mapItems.length; i++) {
        if(mapItems[i].status === status || status === 'all') {
            let divContainer = document.createElement('div')
            divContainer.className = 'todo-item'
            let circleBg = document.createElement('div')
            circleBg.className = 'circle-bg'
            if(mapItems[i].status === 'completed') {
                let circle = document.createElement('div')
                let circleId = 'status'+i
                circle.id = circleId
                circle.className = 'circle checked-circle'
                let imgCheck = document.createElement('img')
                imgCheck.src = 'images/icon-check.svg'
                imgCheck.className = 'check'
                circle.appendChild(imgCheck)
                circleBg.appendChild(circle)
                divContainer.appendChild(circleBg)
                let item = document.createElement('div')
                item.className = 'item checked-item'
                item.textContent = mapItems[i].item
                divContainer.appendChild(item)
                let remove = document.createElement('img')
                remove.src = 'images/icon-cross.svg'
                remove.className = 'remove'
                divContainer.appendChild(remove)
            } else {
                let circle = document.createElement('div')
                let circleId = 'status'+i
                circle.id = circleId
                circle.addEventListener('click', changeStatus(circleId))
                circle.className = 'circle'
                circleBg.appendChild(circle)
                divContainer.appendChild(circleBg)
                let item = document.createElement('div')
                item.className = 'item' 
                item.textContent = mapItems[i].item
                divContainer.appendChild(item)
                let remove = document.createElement('img')
                remove.src = 'images/icon-cross.svg'
                remove.className = 'remove'
                divContainer.appendChild(remove)
            }
            document.getElementById('todo-list').appendChild(divContainer)
        }
    }
}

function changeStatus(id) {
}

function addItem(text) {
    mapItems.push({'item': text, 'status': 'active'})
    console.log(mapItems)
    visibilityControl(activeVisibility)
}

function clearCompletedToDo() {
    console.log('Hello')
    while(document.getElementById('todo-list').firstChild) {
        document.getElementById('todo-list').removeChild(document.getElementById('todo-list').firstChild)
    }
    let newArr = mapItems.filter((item) => item.status !== 'completed')
    mapItems = newArr
    filterItems('all')
}