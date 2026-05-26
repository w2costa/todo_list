$(function () {

    var meu_login = "seu@email.com";
    var server = "http://localhost:8080";

    var $lastClicked;

    function updateTarefa(text, id) {
        // $.post(server + "/tarefas", { tarefa_id: id, texto: text });
        // console.log("Updating tarefa with id:", id, "and text:", text);
        var tarefaData = { texto: text };
        $.ajax({
            url: server + "/tarefas/" + id,
            method: "PUT",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(tarefaData),
            dataType: "json",
            success: function (response) {
                // Tarefa atualizada com sucesso
                console.log('Item updated successfully:', response);
            }
        });
    }

    function newTarefa(text, $div) {
        // $.post(server + "/tarefa",
        //     {
        //         usuario: meu_login,
        //         texto: text,
        //         _method: "PUT"
        //     })
        //     .done(function (data) {
        //         $div.text(data.id);
        //     });
        var tarefaData = { usuario: meu_login, texto: text };
        $.ajax({
            url: server + "/tarefas",
            method: "POST",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(tarefaData),
            dataType: "json",
            success: function (data) {
                $div.text(data.id);
            }
        });
    }

    function addTarefa(text, id) {
        id = id || 0;
        var $tarefa = $("<div />")
            .addClass("tarefa-item")
            .append($("<div />")
                .addClass("tarefa-id")
                .text(id))
            .append($("<div />")
                .addClass("tarefa-texto")
                .text(text))
            .append($("<div />")
                .addClass("tarefa-delete"))
            .append($("<div />")
                .addClass("clear"));

        $("#tarefa-lista").append($tarefa);

        $tarefa.click(onTarefaItemClick);

        $(".tarefa-delete").click(onTarefaDeleteClick);

        if (id === 0) {
            var div = $($tarefa.children(".tarefa-id"));
            console.log("id", div);
            newTarefa(text, $(div));
        }
    }

    function onTarefaKeydown(event) {
        if (event.which === 13) {
            addTarefa($("#tarefa").val());
            $("#tarefa").val("");
        }
    }

    function onTarefaDeleteClick() {
        $(this).parent('.tarefa-item')
            .off('click')
            .hide('slow', function () {
                $this = $(this);

                // $.post(server + "/tarefa",
                //     {
                //         usuario: meu_login,
                //         tarefa_id: $this.children(".tarefa-id").text(),
                //         _method: "DELETE"
                //     });

                $.ajax({
                    url: server + "/tarefas/" + $this.children(".tarefa-id").text(),
                    method: "DELETE",
                    dataType: "json",
                    success: function (response) {
                        // Tarefa deletada com sucesso
                        console.log('Item deleted successfully:', response);
                    }
                });

                $(this).remove();
            });
    }

    function savePendingEdition($tarefa) {
        var text = $tarefa.children('.tarefa-edit').val();
        var id = $tarefa.children('.tarefa-id').text();
        console.log("Saving tarefa with id:", id, "and text:", text);
        $tarefa.empty();

        // substitui o código comentado pelo código a seguir para evitar a vulnerabilidade de XSS
        // $tarefa.append("<div class='tarefa-texto'>" + text + "</div>")
        //     .append("<div class='tarefa-delete'></div>")
        //     .append("<div class='clear'></div>");

        $tarefa
            .append($("<div />")
                .addClass("tarefa-id")
                .text(id))
            .append($("<div />")
                .addClass("tarefa-texto")
                .text(text))
            .append($("<div />")
                .addClass("tarefa-delete"))
            .append($("<div />")
                .addClass("clear"));

        updateTarefa(text, id);

        $(".tarefa-delete").click(onTarefaDeleteClick);

        $tarefa.click(onTarefaItemClick);
    }

    function onTarefaEditKeydown(event) {
        if (event.which === 13) {
            savePendingEdition($lastClicked);
            $lastClicked = undefined;
        }
    }

    function onTarefaItemClick() {

        if (!$(this).is($lastClicked)) {
            if ($lastClicked !== undefined) {
                savePendingEdition($lastClicked);
            }
            $lastClicked = $(this);

            var text = $lastClicked.children('.tarefa-texto').text();
            var id = $lastClicked.children('.tarefa-id').text();
            // substitui o código comentado pelo código a seguir para evitar a vulnerabilidade de XSS
            // var html = "<input type='text' " +
            //     "class='tarefa-edit' value='" +
            //     text + "'>";
            // $lastClicked.html(html);

            $lastClicked.empty()
                .append($("<div />")
                    .addClass("tarefa-id")
                    .text(id))
                .append($("<input />")
                    .attr("type", "text")
                    .addClass("tarefa-edit")
                    .val(text));

            $(".tarefa-edit").keydown(onTarefaEditKeydown);
        }
    }

    function loadTarefas() {
        $("#tarefa").empty();
        $.getJSON(server + "/tarefas", { usuario: meu_login })
            .done(function (data) {
                // console.log("data: ", data);
                for (var tarefa = 0; tarefa < data.length; tarefa++) {
                    addTarefa(data[tarefa].texto, data[tarefa].id);
                }
            });
    }

    $("#tarefa").keydown(onTarefaKeydown);

    $(".tarefa-delete").click(onTarefaDeleteClick);

    $(".tarefa-item").click(onTarefaItemClick);


    loadTarefas();
});