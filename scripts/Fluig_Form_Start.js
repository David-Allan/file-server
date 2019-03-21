$(document).ready(function(){
	

    $("[highlightHeading22222]").each(function(){
        var opcaoSelecionada = $("option:selected", this),
            highlightStyle = opcaoSelecionada.attr("highlight-style");
        
        if (highlightStyle) {
            $(this).closest(".panel")
                .removeClass("panel-default")
                .addClass("panel-" + highlightStyle);
        }
    });

    $("[tagHeading]").each(function(){
        var styleSource = null;
        
        switch(this.tagName) {
            case "TEXTAREA":
                if (this.value != "") {
                  styleSource = this;
                }
                break;
            
            case "SELECT":
                styleSource = $("option:selected", this).get(0);
                break
            
            default:
        }
        
        if (styleSource && styleSource.attributes['tag-style'] && styleSource.attributes['tag-text']) {
            var labelStyle = styleSource.attributes['tag-style'].value,
                labelText = styleSource.attributes['tag-text'].value;
            
            $(this).closest(".panel")
                .find(".panel-title")
                .append("<span class=\"tag label label-" + labelStyle + "\">" + labelText + "</span> ");
        }
    });


    var changeArrawDirection = function(collapsed, element) {
        var classToRemove = collapsed ? "fluigicon-pointer-right" : "fluigicon-pointer-down";
        var classToAdd = collapsed ? "fluigicon-pointer-down" : "fluigicon-pointer-right";

        $(element)
            .closest(".panel")
            .find(".panel-title .fluigicon")
            .removeClass(classToRemove)
            .addClass(classToAdd);
    };

    $('.collapse').on('show.bs.collapse', function(ev) {
        changeArrawDirection(true, ev.target);
        
    }).on('hide.bs.collapse', function(ev) {
        changeArrawDirection(false, ev.target);
    });

    $('#Atividade_' + FORM_STATE).collapse("show");
});

var ZOOM = function(title,dataset,columns,callback,callbackOnClose) {
    var title  = title || 'FLUIG ZOOM';
    var dataset = dataset || DatasetFactory.getDataset("DS_FLUIG_0113", null, null, null);
    var columns  = columns|| getAllColluns(dataset);
    
    var html = `<table id="example2" class="display" width="100%"></table>`;

    FLUIGC.modal({
        title: title,
        content: html,
        id: 'fluig-modal',
        size: 'large',
        actions: [{
            'label': 'Save',
            'bind': 'data-open-modal',
        },{
            'label': 'Close',
            'autoClose': true
        }]

    });

    var table = $('#example2').DataTable( {
        data: dataset.values,
        columns : columns
        /* columns: [
                     { data: 'code', title : 'CODIGO'} //or { data: 'MONTH', title: 'Month' }`
                    //{ data: 'code', title 'CODIGO'}
                    //{ data: 'description' }
                ] */
    } );

    $('#example2 tbody').on( 'click', 'tr', function () {
        $(document).trigger("click",table.row( this ).data());
    } );

    function getAllColluns(dataset) {
        var colunas = [];

        dataset.columns.forEach(function(e){
            colunas.push({data : e , title : e});
        })

        return colunas;
    }
}