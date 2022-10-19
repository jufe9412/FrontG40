function getStatus(){
    $.ajax({
        url:"http://129.151.120.96:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarStatus(respuesta);
            console.log(respuesta);
        }
    });
}

function pintarStatus(respuesta){
    let myTable="<table>";
        myTable+="<tr>";
        myTable+="<th>completadas</th>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<th>canceladas</th>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";   
 
    myTable+="</table>";
    $("#resultado6").html(myTable);
}

function getFechas(){
    let dato1= $("#startDate1").val();
    let dato2= $("#startDate2").val();
    
    $.ajax({
        url:"http://129.151.120.96:8080/api/Reservation/report-dates/"+dato1+"/"+dato2,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarFechas(respuesta);
            console.log(respuesta);
        }
    });

}
function pintarFechas(respuesta){
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="</tr>";   
    }
    myTable+="</table>";
    $("#resultado7").html(myTable);
}

function getClientes(){
    $.ajax({
        url:"http://129.151.120.96:8080/api/Reservation/report-clients ",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarClientes(respuesta);
            console.log(respuesta);
        }
    });


}
function pintarClientes(respuesta){
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){

        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].client.age+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado8").html(myTable);
}
