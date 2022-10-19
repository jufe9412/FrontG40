//GET, POST , PUT Y DELETE

function getMensajes (){
    $.ajax({
        url:"http://129.151.120.96:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarMensajes(respuesta);
        }
    });
}

function postMensajes(){

    if ( $("#messageText").val().length==0 || 
    $("#select-tool").val().length==0 ||
    $("#select-client").val().length==0){
    alert("Todos los campos son obligatorios");

        
        }else{


    let cajas = {
        messageText:$("#messageText").val(),
        tool:{id: +$("#select-tool").val()},
        client:{idClient: +$("#select-client").val()}
        
        
    };
    console.log(cajas);
    $.ajax({
        url:"http://129.151.120.96:8080/api/Message/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el mensaje");
            window.location.reload();
    
        }
    });
}
}

function putMensajes(idBotonActualizar){


    if ( $("#messageText").val().length==0){

    alert("Todos los campos son obligatorios");
    
    }else{
        
        let cajas = {
            idMessage:idBotonActualizar,
            messageText:$("#messageText").val(),
        tool:{id: +$("#select-tool").val()},
        client:{idClient: +$("#select-client").val()}
           
        };
       
        $.ajax({
            url:"http://129.151.120.96:8080/api/Message/update",
            type:"PUT",
            datatype:"JSON",
            contentType:"application/json",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se actualizo correctamente la herramineta");
                window.location.reload();
            }
        });
        }
    
    }

function deleteMensajes(idBotonBorrar){

    Swal.fire({
        title: 'Esta seguro de borrar la categoria?',
        text: "Si borras, no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si, borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
        
          let myData={ 
            id:idBotonBorrar  
            };
            $.ajax({
                url:"http://129.151.120.96:8080/api/Message/"+idBotonBorrar,
                type:"DELETE",
                datatype:"JSON",
                data: JSON.stringify(myData),
                contentType:"application/json",
                success:function(respuesta){
          
                    window.location.reload();
                }
            });
          
            Swal.fire(
                'Eliminado',
                'El mensaje ha sido eliminado con éxito',
                'success'
              )
        
        }
    
    })    
}

////////////////////////////////////////////

function getTool_Message(){
    $.ajax({
        url:"http://129.151.120.96:8080/api/Tool/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-tool");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>' )
            })
        }
    });
}

function getClient_Message(){
    $.ajax({
        url:"http://129.151.120.96:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-client");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>' )
            })
        }
    });

    function pintarMensajes(respuesta){

        let myTable="<table>";
        for(i=0;i<respuesta.length;i++){
            myTable+="<tr>";
            myTable+="<td>"+respuesta[i].messageText+"</td>";
            myTable+="<td>"+respuesta[i].tool.name+"</td>";
            myTable+="<td>"+respuesta[i].client.name+"</td>";
            myTable+="<td> <button onclick='putMensajes("+respuesta[i].idMessage+")'class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Actualizar</button> "
            myTable+="<td> <button onclick='deleteMensajes("+respuesta[i].idMessage+")'class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg''>Borrar</button> "
            myTable+="</tr>";
    
        }
        myTable+="</table>";
        $("#resultado9").html(myTable);
    }
}