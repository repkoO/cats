class Api {
    constructor(name) {
        this.url = "https://cats.petiteweb.dev/api/single/";
        this.name = name;
    }

    getCats() { //работает
        return fetch(`${this.url}${this.name}/show`)
    }

    getCat(id) {
        return fetch(`${this.url}${this.name}/show/${id}`)
    }
    
    getCatsIds() {
        return fetch(`${this.url}${this.name}/ids`)
    }


    addCat(bodyOfCat) { //работает
        return fetch(`${this.url}${this.name}/add`, {
            method: 'POST', //string
            headers: { //object
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyOfCat)
          });
    }

    updCat(changingPartsOfCat, id) { //работает
        return fetch(`${this.url}${this.name}/update/${id}`, {
            method: 'PUT', //string
            headers: { //object
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(changingPartsOfCat)
          });
    }


   delCat(id) { //работает
    return fetch(`${this.url}${this.name}/delete/${id}`, {
        method: "DELETE"
    })
   }
}
