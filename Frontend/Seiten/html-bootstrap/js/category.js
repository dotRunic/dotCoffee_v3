const host = 'http://localhost:8080'
const getCategoriesData = () =>  {

    $.ajax({
        url: host.concat('/category'),
        type: 'get',
        contentType: 'application/json; charset=utf-8',
        success: function (result, status, xhr) {
            if(status === 'success'){
                let categories = createCategories(result);
                $('#categories').append(categories)
            } else {
                $('#categories').append(result)
            }
        },
        error: function (xhr, status, error) {
            console.log('error', error)
        }
    });
}

const createCategories = (categoriesData) => {
    let categories = "";
    if(categoriesData.length !== 0) {
        $.each(categoriesData, (index, cat_item) => {
            let src_uri= host.concat(cat_item.imagePath);
            let href = "artikel_items.html?category=".concat(encodeURIComponent(cat_item.name));
            const item= `<div class="col-lg-4 col-sm-12 flex-wrap justify-content-center">
                <div class="card" style="width:auto; background-color: rgb(255, 255, 255);">
                    <img class="card-img-top" src=${src_uri} alt="Category image">
                    <div class="card-body">
                        <h4 class="card-title">${cat_item.name}</h4>
                    </div>
                    <a class="btn btn-primary" type="button" href=${href}
                    >zu Artikel</a>
                </div>
            </div>`
            categories += item;
        })
    } else {
           categories = `<div  style="text-align:center;">
                    <h1 class="display-6">Es wurden keine Kategorien gefunden!</h1>
                    <br>
                    </div>`
    }
    return categories;
}

getCategoriesData();
