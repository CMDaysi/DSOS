
let cp = document.getElementById('codigop');
let API ='https://data.opendatasoft.com/api/records/1.0/search/?dataset=geonames-postal-code%40public&q=';
const API_PAISES ='https://restcountries.com/v3.1/all';

    fetch(API_PAISES)
    .then(response=>response.json() )
    .then(data => {
        let element = document.getElementById('pais')
        element.innerHTML= "";
       
        for(var i = 0 ; i<data.length; i++){

             element.innerHTML+=`<option value="${data[i].cca2}">${data[i].name.common}</option>`
        
        }

        console.log(data)

    })
    .catch(err=>console.log(err))



cp.addEventListener('keyup', (event) => {
    
    tecla_enter = event.keyCode;

    if(tecla_enter==13){
    let code = event.target.value; //obtener codigo postal
    console.log(code);
    let pais = document.getElementById('pais').value; //valor de pais
    let API_BUSQUEDA = "";
    API_BUSQUEDA = API + pais + "+" + code;
    recuperarDatos(API_BUSQUEDA);
    }
  
});

function recuperarDatos(API_URL){
    
    fetch(API_URL)
    .then(response=>response.json() )
    .then(data => {
        
        let element = document.getElementById("col")
        element.innerHTML= "";
        for(var i = 0 ; i<data.nhits; i++){
             element.innerHTML+=`<option value="${data.records[i].fields.place_name},${data.records[i].fields.admin_name2},${data.records[i].fields.admin_name1},${data.records[i].geometry.coordinates[0]},${data.records[i].geometry.coordinates[1]}"
             selected>${data.records[i].fields.place_name},
             ${data.records[i].fields.admin_name2}, ${data.records[i].fields.admin_name1}</option>`
        
        }
        console.log(data);
        

    })
    .catch(err=>console.log(err))
    setTimeout(() => {
        separarDatos();
      }, "1500")

}

function separarDatos(){
    let col = document.getElementById('col').value
    var coma = ",";
    var arr = col.split(coma);
    document.getElementById("loc").value = arr[1];
    document.getElementById("mun").value = arr[2];
    document.getElementById("ref").value = arr[4] + ", " + arr[3];
}


