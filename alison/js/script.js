function checkLogin() {
    let usr = $("#doctorID").val();
    let pass = $("#pass").val();
    if(usr=="Alison" && pass=="123"){
        $('#myModal').on('show.bs.modal', function (e) {
            window.location.replace("reportes.html");
        });
    }
}

$(function () {
    let fecha = Date();
    fecha = fecha.split(' ');
    let hora = fecha[4] + fecha[5] + fecha[6] + fecha[7];
    hora = hora.split(':');
    hora = hora[0] + ':' + hora[1];
    fecha = fecha[1] + ' ' + fecha[2] + ' ' + fecha[3];

    var data = [
        { hora: '10:00', ppm: '60', status: 'en reposo', fecha: '01/01/2016' },
        { hora: '10:00', ppm: '60', status: 'en reposo', fecha: '02/01/2016' },
        { hora: '10:00', ppm: '60', status: 'en reposo', fecha: '03/01/2016' },
        { hora: '10:00', ppm: '60', status: 'en reposo', fecha: '04/01/2016' },
        { hora: '10:30', ppm: '60', status: 'despues de ejercitar', fecha: '06/01/2016' },
        { hora: '10:30', ppm: '60', status: 'despues de ejercitar', fecha: '07/01/2016' },
        { hora: '09:50', ppm: '60', status: 'despues de ejercitar', fecha: '01/01/2016' },
        { hora: '10:20', ppm: '60', status: 'despues de ejercitar', fecha: '02/01/2016' },
        { hora: '10:05', ppm: '60', status: 'en reposo', fecha: '03/01/2016' },
        { hora: '10:00', ppm: '60', status: 'en reposo', fecha: '04/01/2016' },
        { hora: '10:00', ppm: '60', status: 'en reposo', fecha: '06/01/2016' },
        { hora: '10:00', ppm: '60', status: 'en reposo', fecha: '07/01/2016' },
    ];

    var obj = {
        width: "80%",
        height: 300,
        resizable: true,
        title: "Reporte", 
        scrollModel: { autoFit: true },
        filterModel: { on: true, mode: "AND", header: true },
    };

    obj.columnTemplate = { minWidth: '10%', maxWidth: '80%' };

    obj.colModel = [
        { title: "Fecha", dataType: "date", dataIndx: "fecha",
            filter: { type: 'textbox', condition: 'between', listeners: ['keyup'] } },
        { title: "Hora", dataType: "time", dataIndx: "hora",
            filter: { type: 'textbox', condition: 'between', listeners: ['keyup'] } },
        { title: "Status", dataType: "string", dataIndx: "status",
            filter: { type: 'select',
                condition: 'equal',
                valueIndx: "status",
                labelIndx: "status",
                groupIndx: "status",
                prepend: { '': '--Seleccionar--', 'en reposo': 'en reposo', 'despues de ejercitar': 'despues de ejercitar' },
                listeners: ['change']
            }
        },
        { title: "ppm", dataType: "integer", dataIndx: "ppm",
            filter: { type: 'textbox', condition: 'between', listeners: ['keyup'] } }
    ];
    
    obj.dataModel = {
        data: data,
        location: "local",
        sorting: "local",
        dataType: "JSON",
        sortIndx: "fecha",
        sortDir: "up",
        // url: "https://agua-flex.herokuapp.com/json/20",
        //     getData: function (dataJSON) {                
        //     return { data: dataJSON.data };
        // }

    };
    
    let $grid = $("#grid_reporte").pqGrid(obj);
});