const api = new Api ('kmedvedev');

const generatingCatCard = (cat) => `<div data-card_id=${cat.id} class="card" style="width: 18rem; margin: 10px;">
<img src="${cat.image}" class="card-img-top" alt="cats-photo">
<div class="card-body">
  <h5 class="card-title">${cat.name}</h5>
  <button data-action="show" class="btn btn-primary my-2">Show</button>
  <button data-action="delete" class="btn btn-danger">Delete cat :(</button>
  <button data-action="edit" class="btn btn-success">Edit</button>
</div>
</div>` 

const catDesctiption = (cat) => `<div data-card-show>
    <img src="${cat.image}" class="img_card_show" alt="${cat.name}">
    <div class="card__info"> 
      <h3 class="card-title mt-2">${cat.name}</h3>
      <p class="card-text text-center p-3">${cat.description}</p>
      <p>Cat age: ${cat.age}</p>  
      <p>Cat rating: ${cat.rate}</p>
    </div>
    </div>`;
    


api.getCats() //добавление котиков на страницу
    .then(res => res.json())
    .then(data => 
        data.forEach(cat => { //проходимся по массиву кошек
            $wrapper.insertAdjacentHTML('beforeend', generatingCatCard(cat)) //вставили ХТМЛ код
        })
);


document.forms.catsForm.addEventListener('submit', (event) => {
  event.preventDefault();

  $errorMsg.innerHTML = '';

  const data = Object.fromEntries(new FormData(event.target).entries());

  data.age = Number(data.age)
  data.id = Number(data.id)
  data.rate = Number(data.rate)
  data.favorite = data.favorite === 'on'

  api.addCat(data)
    .then(res => {
      return res.ok ? regenData() : res.json()
    })
    .then(errMsg => {
      return $errorMsg.innerHTML = errMsg?.message;
    })
})

const regenData = async () => {
  const response = await api.getCats();
  const newCats = await response.json();
  $wrapper.replaceChildren();
  localStorage.clear();
  newCats.forEach(cat => { //проходимся по массиву кошек
    $wrapper.insertAdjacentHTML('beforeend', generatingCatCard(cat))
  })
  return $modal.classList.add('hidden');
}

$wrapper.addEventListener('click', (event) => { //действия при нажатии на кнопку
    //console.log(event.target.dataset); //получение информации куда кликнули, привязка к типу кнопки
    switch (event.target.dataset.action){
        case "show":
            const $showDescription = event.target.closest("[data-card_id]");
            const catDescriptionId = $showDescription.dataset.card_id;
            let $cardDescription;
            api.getCat(catDescriptionId)
              .then(res => res.json())
              .then(data => {
                $description.insertAdjacentHTML('afterend', catDesctiption(data));
                $cardDescription = document.querySelector("[data-card-show]");
              });
                $description.classList.remove("hidden");
                $description.addEventListener("click", () => {
                $description.classList.add("hidden");
                $cardDescription.remove();
              });

       break; 

        case "delete":
            // const catId = event.target.parentElemet.dataset.card_id добираемся до id карточки
            const $currentCard = event.target.closest("[data-card_id]"); //находим элемент, где есть по дата сету
            const catId = $currentCard.dataset.card_id; //находим id
            api.delCat(catId);
            $currentCard.remove(); //удаление элемента
        break;

        case "edit":
          const $editCard = event.target.closest("[data-card_id]")
          const catEditIt = $editCard.dataset.card_id;
          api.updCat(data, id)
          .then(res => res.json())
          .then(data => console.log(data))
        break;
        
        default:
        break;
    }
});


$addButton.addEventListener('click', () => {
    $modal.classList.remove('hidden')
});
    
$buttonCloser.addEventListener('click', () => {
    $modal.classList.add('hidden');
});

document.addEventListener("keydown", (e) => { //закрытие форм на Esc
  if (e.key === "Escape") {
    $modal.classList.add("hidden");
    $form.reset();
  }
});



//TODO: после добавления кота через форму, делать новый запрос на бэк и обновлять список котов
//TODO: добавить форму редактирования, форма описания
//TODO: сделать закрытие модалок по клику на крестик или на пространство вокруг



