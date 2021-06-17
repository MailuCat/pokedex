$(document).ready(function () {
    let foto = $('.contenedor');
    foto.show (3000);
  
    buscarPokeAPI(Math.floor(Math.random()*300));

    let buscarPoke = () => {
        let entradaPoke = $('#entradaPoke');
        buscarPokeAPI(entradaPoke.val());    
    };

    $('#buscando').on('click',buscarPoke);
    $('#entradaPoke').on('keyup',(event)=>{
        if (event.keyCode === 13) {
            event.preventDefault();
            buscarPoke();
        }
    });
    function inyectarCodigo(infoPoke) {
        $('#mostraerPoke').html(`
            <img src="${infoPoke.sprites.front_default}" alt="${infoPoke.id}">
            <p>Nombre: ${infoPoke.name}</p>
        `);
        $('#movimientos > ul').html("");
        infoPoke.moves.forEach((movimiento,index) => {
            $('#movimientos > ul').append(`
                <li>${index+1} - ${movimiento.move.name}</li>
                
            `);
            console.log(movimiento.move.name)
        });
     }
    
    function buscarPokeAPI(valor) {
        $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${valor}`,
            dataType: "json",
            success: function (response) {
                console.log(response);
                response.stats.forEach(element =>{
                    console.log (element.base_stat)
                });
                let infoPoke = response;
               inyectarCodigo(infoPoke);
                $('input').val("");

                
        var options = {
            animationEnabled: true,
            title: {
                text: "Pokepoderes"
            },
            axisY: {
                title: "Base",
    
            },
            axisX: {
                title: "Estados"
            },
            data: [{
                type: "column",
               
                dataPoints: [
                    { label: "Hp", y: response.stats[0].base_stat },	
                    { label: "Attack", y: response.stats[1].base_stat },	
                    { label: "Defense", y: response.stats[2].base_stat },
                    { label: "Special Attack", y: response.stats[3].base_stat },	
                    { label: "Special Defense", y: response.stats[4].base_stat  },
                    { label: "Speed", y: response.stats[5].base_stat  },
                ]
            }]
            
        };
        $("#chartContainer").CanvasJSChart(options);
            },
         
        });
    };
});
  