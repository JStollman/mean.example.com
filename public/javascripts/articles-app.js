function viewIndex(){
    var url = 'http://localhost:3000/api/articles';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = function(){
        let data  = JSON.parse(xhr.response);
        var rows = '';

        for(var i=0; i<data['articles'].length; i++){
            let x = data['articles'][i];
            rows = rows + `<tr>
                <td>
                    <a href="#edit-${x.slug}" 
                        onclick="viewarticle('${x.slug}')">
                        ${x.title}
                    </a>
                </td>
                <td><a href="#deletearticle-${x.slug}"
                onclick="deletearticle('${x.slug}');" class="text-danger">Delete</a></td>
            </tr>`;
        }

        var app = document.getElementById('app');
        app.innerHTML = `<table class="table">
            <thead>
                <tr>
                    <th>Title</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>`;

    }
}

function viewarticle(slug){
    var url = 'http://localhost:3000/api/articles/' + slug;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = function(){
        var data = JSON.parse(xhr.response);
        var article = data.article;
        var app = document.getElementById('app');

        app.innerHTML = `
            <h2>${article.title}</h2>
            <table class="table">
                <tbody>
                    <tr><th>ID</th><td>${article.id}</td></tr>
                    <tr><th>Slug</th><td>${article.slug}</td></tr>
                    <tr><th>Title</th><td>${article.title}</td></tr>
                    <tr><th>Keywords</th><td>${article.keywords}</td></tr>
                    <tr><th>Description</th><td>${article.description}</td></tr>
                    <tr><th>Body</th><td>${article.body}</td></tr>
                </tbody>
            </table>
            
            <h3>Edit the Article </h3>
            <form id="editarticle" action="/api/articles" method="put">
                <input type="hidden" name="_id" value="${article._id}">
                <div>
                    <label for="title">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        value="${article.title}">
                </div>

                <div>
                    <label for="keywords">Keywords</label>
                    <textarea 
                        type="text" 
                        name="keywords" 
                        id="keywords"> ${article.keywords}</textarea>
                </div>
                        
                <div>
                <label for="description">Description</label>
                <textarea 
                    type="text" 
                    name="description" 
                    id="descriptions"> ${article.description}</textarea>
                </div>

                <div>
                <label for="body">Body</label>
                <textarea 
                    type="text" 
                    name="body" 
                    id="body"> ${article.body}</textarea>
                 </div>

                <input type="submit" value="Submit">
            </form>
            
            <div class="actions">
                <a href="#deletearticle-${article.slug}"
                    onclick="deletearticle('${article.slug}');"
                    class="text-danger"
                >Delete</a>
            </div>
            `;

        var editarticle = document.getElementById('editarticle');
        editarticle.addEventListener('submit', function(e){
            e.preventDefault();
            var formData = new FormData(editarticle);
            var url = 'http://localhost:3000/api/articles';
            var xhr = new XMLHttpRequest();
            xhr.open('PUT', url);
            xhr.setRequestHeader(
                'Content-Type', 
                'application/json; charset=UTF-8');

            var object={};
            formData.forEach(function(value, key){
                object[key] = value;
            });
            xhr.send(JSON.stringify(object));

            xhr.onload = function(){
                let data = JSON.parse(xhr.response);
                if(data.success===true){
                    viewIndex();
                }
            }

        });

    }
}

function createArticle(){
    var app = document.getElementById('app');
    app.innerHTML = `<h2>Create a New Article</h2>
    <form id="createArticle" action="/api/articles" method="post">
        <div>
            <label for="title">Title</label>
            <input type="text" name="title" id="title">
        </div>

        <input type="submit" value="Submit">
    </form>`;

    var createarticle = document.getElementById('createArticle');
    createarticle.addEventListener('submit', function(e){
        e.preventDefault();

        var formData = new FormData(createarticle);
        var url = 'http://localhost:3000/api/articles';
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);

        xhr.setRequestHeader(
            'Content-Type',
            'application/json; charset=UTF-8'
        );

        var object = {};
        formData.forEach(function(value, key){
            object[key]=value;
        });

        xhr.send(JSON.stringify(object));
        xhr.onload = function(){
            let data = JSON.parse(xhr.response);
            if(data.success===true){
                viewIndex();
            }
        }
    });
}

function deletearticle(id){
    if(confirm('Are you sure?')){
        
        var url = 'http://localhost:3000/api/articles/' + id;

        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', url);
        xhr.send();
    
        xhr.onload = function(){
            let data = JSON.parse(xhr.response);
            if(data.success===true){
                viewIndex();
            }
        }
    }
}

var hash = window.location.hash.substr(1);
if(hash){
    let chunks = hash.split('-');

    switch(chunks[0]){

        case 'edit':
            viewarticle(chunks[1]);
        break;

        case 'createarticle':
            createarticle();
        break;

        default:
            viewIndex();
        break;
        
    }
}else{
    viewIndex();
}

