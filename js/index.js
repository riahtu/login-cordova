"use strict";
var Index = {

    //Application Constructor
    init: function() {
        this.bindEvents();
    },

    //Bind Event Listeners
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    //Event Handle
    onDeviceReady: function() {
      
      $("#formLogin").submit(function (e){
        e.preventDefault();

        var networkState = navigator.connection.type;

        if (networkState !== Connection.NONE) {

        $.ajax({
            type: "POST",
            url: "http://www.talesandrade.com.br/login/procLogin.php", 
            data: {
                acao: 'LoginWeb',
                usuario: $("#usuario").val(),
                senha: $("#senha").val()
            },            
            async: false,
            dataType: "json", 
            success: function (json) {
                if(json.result == true){
                   //redireciona o usuario para pagina
                   $("#usuario_nome").html(json.dados.usuario);

                   $.mobile.changePage("#index", {
                        transition : "slidefade"
                    });


                }else{
                   alert(json.msg);
                }

                Funcoes.hideLoad();
            },error: function(xhr,e,t){
                console.log(xhr.responseText);                
            }
        });

        }else{
            alert('Você precisa estar conectado na internet para usar o aplicativo.');
        }



      });

    }
};

