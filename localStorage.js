const dataFromStorage = localStorage.getItem(document.forms.catsForm.name);
const parsedDataFormStorage = dataFromStorage ? JSON.parse(dataFromStorage) : null;

if (parsedDataFormStorage) {
    Object.keys(parsedDataFormStorage).forEach(key => {
        document.forms.catsForm[key].value = parsedDataFormStorage[key]
    })
}
document.forms.catsForm.addEventListener('input', (event) => {
    const formData = Object.fromEntries(new FormData(document.forms.catsForm).entries())
    localStorage.setItem(document.forms.catsForm.name, JSON.stringify(formData))
})
