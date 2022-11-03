const inputCat = document.querySelector('#inp-cat');
const colorCat = document.querySelector('#color');
const submitCat = document.querySelector('#sub-cat');
const selectCat = document.querySelector('#inp-sel');
const inputTodo = document.querySelector('#inp-todo');
const addTodo = document.querySelector('#add-todo');
const todoContainer = document.querySelector('.all-todo-inlist')
const ul = document.querySelector('.sidebar ul');
const search = document.querySelector('#search');
const allCats = document.querySelector('.all-catergories');
var caters = document.querySelectorAll('.catergory-inlist');
const hisSen = document.querySelector('.his-sen');
const hisList = document.querySelector('.his-list');
var added = false;
var check = false;
var showHisF = false;
var noteCount = 0;
var hisCount = 0;
var dilnotecont = 0;
var dilcatadd = false;
var clickedCat = undefined;

submitCat.addEventListener('click',addCatagery);
search.addEventListener('keyup',searchNote);
hisSen.addEventListener('click',showHis)



// function update(){
// }
function clear(){
    inputTodo.value = '';
}
function empty(){
    const option = document.createElement('option');
    option.value = document.querySelector('#inp-cat').value;
    option.id = document.querySelector('#color').value;
    option.textContent = document.querySelector('#inp-cat').value;
    selectCat.appendChild(option);
    console.log(option);
    inputCat.value = '';
    colorCat.value = '#000000';
}
function addCatagery(){
    if(inputCat.value == '' || inputCat.value.length > 18){
        if(inputCat.value == ''){
            alert('please add a catergory');
        }
        else{
            alert('This category is too long.......');
        }
    }
    else{
        var cats = document.querySelectorAll('.catergory-inlist');
        cats.forEach(check =>{
                if(check.textContent == inputCat.value){
                    added = true;
                } 
                else{
                    added = false;
                }
                });

        if(added === true){
            alert('this catergory is alredy added');
        }
        else{
        let color = colorCat.value;

        var li = document.createElement('li');
        var catTopic = document.createElement('h3');
        catTopic.textContent = inputCat.value;
        li.appendChild(catTopic);
        // li.textContent = inputCat.value;
        var spanColor = document.createElement('span');
        li.className = 'catergory-inlist';
        spanColor.className = 'color-inlist';
        spanColor.style.backgroundColor = color;
        li.appendChild(spanColor);

        ul.appendChild(li);
        caters = document.querySelectorAll('.catergory-inlist');
        console.log(caters);

        empty();
        }
}
}
var Stext = '';
var Svalue = '';
var Sid = '';

selectCat.addEventListener('change',function(){
    Stext = selectCat.options[selectCat.selectedIndex].textContent;
    Svalue = selectCat.options[selectCat.selectedIndex].value;
    Sid = selectCat.options[selectCat.selectedIndex].id;
});


addTodo.addEventListener('click',() => {
    if(Svalue == 0 || inputTodo.value == ''){
        if(Svalue == 0){
            alert('Please add a catergory...');
        }
        else{
            alert('Please add a ToDo...');
        }
    }
    else{
        var todoDiv = document.createElement('div');
        todoDiv.className = 'list-todo';
        todoDiv.style.border = '3px solid';
        todoDiv.style.borderColor = Sid;

        var topic = document.createElement('h3');
        topic.classList.add('topic');
        topic.textContent = Stext;
        var icon = document.createElement('i');
        icon.className = 'fas fa-check';
        icon.id = 'check';
        icon.addEventListener('click',checkedToDo);
        topic.appendChild(icon);
        topic.style.borderBottom = '3px solid';
        topic.style.borderBottomColor = Sid;

        var todotext = document.createElement('p');
        todotext.className = 'todo';
        todotext.textContent = inputTodo.value;

        todoDiv.appendChild(topic);
        todoDiv.appendChild(todotext);
        todoContainer.appendChild(todoDiv);

        noteCount++;
        dilnotecont++;
        checkTrueOrFalse();
        clear();
        deleteCatergoryBtn();
    }
    });

    function searchNote(e){
        inpSrc = e.target.value.toLowerCase();
        var list = document.querySelectorAll('.list-todo');
        var listArray = Array.from(list);
        listArray.forEach(function(title){
            var nTitle = title.firstChild.textContent;
            var nNote = title.lastChild.textContent;
            console.log(nTitle.toLowerCase().indexOf(inpSrc));
            console.log(nNote.toLowerCase().indexOf(inpSrc));
            if(nTitle.toLowerCase().indexOf(inpSrc) != -1 || nNote.toLowerCase().indexOf(inpSrc) != -1){
                title.style.display = '';
            }
            else{
                title.style.display = 'none';
            }
        })
    }
ul.addEventListener('click',function(e){
    clickedCat = undefined;
    var rightclick=undefined;
    var viwingSentence = document.querySelector('.viwingSen');
    // console.log(e.target.className);
    var todos = document.querySelectorAll('.list-todo');
    if(e.target.classList.contains('all-catergories')){
        todos.forEach(todo=>{
            todo.style.display = 'block';
        })
        if(dilcatadd == true){
            document.getElementById('catdel').remove();
            dilcatadd = false;
        }
        viwingSentence.textContent = `You are currently viewing All Categories`;
    }
    else{
        addclickedCat(e);
        dilnotecont = 0;
        var todoArr = Array.from(todos);
        if(e.target.className == 'color-inlist'){
            rightclick = e.target.previousSibling.textContent;
        }
        else{
            rightclick = e.target.textContent;
        }
        viwingSentence.textContent = `You are viewing ${rightclick} Catergory`;
        todoArr.forEach(function(todo){
            if(rightclick.toLowerCase() == todo.firstChild.textContent.toLowerCase()){ 
                todo.style.display = '';
                dilnotecont++;
            }
            else{
                todo.style.display = 'none';
            }
            });
        deleteCatergoryBtn();
    }
});
function addclickedCat(clicked){
    // console.log(clicked.target.parentElement);
    if(clicked.target.parentElement.className == 'catergory-inlist'){
        clickedCat = clicked.target.parentElement;
    }
    else{
        clickedCat = clicked.target;
    }
}

function checkTrueOrFalse() {
    if(noteCount>0){
        check = true;
    }
    else{
        check = false;
    }
}
function checkedToDo(e) {
    e.target.parentElement.parentElement.classList.add('my-style');
    setTimeout(removeandadd,300)
    function removeandadd(){
        var hisLi = document.createElement('li');
        hisLi.className = 'todoItem';
        hisLi.textContent = e.target.parentElement.parentElement.querySelector('p').textContent;
        var trash = document.createElement('span');
        trash.className = 'fas fa-trash';
        hisLi.appendChild(trash);
        hisList.appendChild(hisLi);
        console.log(hisList);
        hisCount++;
        dilnotecont--;
        showHistorySentence();

        e.target.parentElement.parentElement.remove();
    }
    noteCount--;
}
function showHistorySentence(){
    if(hisCount > 0){
        document.querySelector('.his-sen').style.display = 'block';
        var len = document.querySelector('.his-lenth');
        len.textContent = hisCount;
        var dilHis  = document.querySelectorAll('.fa-trash');
        dilHis = Array.from(dilHis);
        dilHis.forEach(dell=>{
        dell.addEventListener('click',deleteHistoryToDo);
        });
        showHisF = false; 
        var dilallhis = document.querySelector('.dil-his');
        dilallhis.addEventListener('click',deleteAllHistory);
    }    
    else{
        document.querySelector('.his-sen').style.display = 'none';
        document.querySelector('.his').style.display = 'none';
    }
}
function showHis(){
        if(showHisF == false){
            document.querySelector('.his').style.display = 'block';
            showHisF = true; 
        }
        else{
            document.querySelector('.his').style.display = 'none';
            showHisF = false;
        }
}
function deleteHistoryToDo(e){
    var hisLine = e.target.parentElement;
    hisLine.remove();
    hisCount--;
    showHistorySentence();
}
function deleteAllHistory(){
        var all = document.querySelectorAll('.todoItem');
        hisCount -= all.length;
        var onebyone = Array.from(all);
         onebyone.forEach(del=>{
             del.remove();
        })
        document.querySelector('.his-lenth').textContent = hisCount;
        if(hisCount == 0){
            document.querySelector('.his').style.display = 'none';
            showHisF = false;
        }
        showHistorySentence();
}
function deleteCatergoryBtn(){
    if(dilnotecont == 0 && dilcatadd == false){
        var catdelbtn=document.createElement('button');
        catdelbtn.id = 'catdel';
        catdelbtn.textContent = 'delete catergory';
        console.log(catdelbtn);
        catdelbtn.addEventListener('click',deleteCatergory);
        todoContainer.appendChild(catdelbtn);
        dilcatadd = true;
    }
    else if(dilnotecont > 0 && dilcatadd == true){
        document.getElementById('catdel').remove();
        dilcatadd = false;
    }
}
function deleteCatergory(){
    clickedCat.remove();
    var options = document.querySelectorAll('option');
    options = Array.from(options);
    options.forEach(del=>{
         if(clickedCat.textContent.toLowerCase() == del.textContent.toLowerCase()){
             del.remove();
         }
    })
    document.getElementById('catdel').remove();
    dilcatadd = false;
}

showHistorySentence();