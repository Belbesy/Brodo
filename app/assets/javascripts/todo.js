

var todo = todo || {},
    data = JSON.parse(localStorage.getItem("todoData"));

data = data || {};

(function(todo, data, $) {

    var defaults = {
            todoTask: "todo-task",
            todoHeader: "task-header",
            todoDate: "task-date",
            todoDescription: "task-description",
            taskId: "task-",
            formId: "todo-form",
            dataAttribute: "data",
            deleteDiv: "delete-div"
        }, codes = {
            "1" : "#pending",
            "2" : "#inProgress",
            "3" : "#completed"
        };

    todo.init = function (options) {
        $(".todo-task").remove();
        options = options || {};
        options = $.extend({}, defaults, options);
        url = "/tasks.json?story_id=" + options["story_id"];
        $.getJSON(url, function( data ) {
          localStorage.setItem("todoData"+options["story_id"], JSON.stringify(data));
          $.each(data, function (index, params) {
              generateElement(params);
          });
        });




        // Adding drop function to each category of task
        $.each(codes, function (index, value) {
            $(value).droppable({
                drop: function (event, ui) {
                        var data = JSON.parse(localStorage["todoData"+options["story_id"]]);

                        var element = ui.helper,
                            css_id = element.attr("id"),
                            id = css_id.replace(options.taskId, ""),
                            

                            turl = "/tasks/"+ id +".json";
                            $.getJSON(turl, function( object ) {

                              // Changing object code
                              object.state = index;
                              //Call jQuery ajax
                              $.ajax({
                                  type: "PUT",
                                  contentType: "application/json; charset=utf-8",
                                  url: turl,
                                  data: JSON.stringify(object),
                                  dataType: "json",
                                  success: function (msg) {
                                    // Removing old element
                                    removeElement(object);
                                    // Generating new element
                                    generateElement(object);
                                    // Hiding Delete Area
                                    $("#" + defaults.deleteDiv).hide();
                                  },
                                  error: function (err){
                                      alert('Error');
                                  }
                              });
                            });
                    }
            });
        });

        // Adding drop function to delete div
        $("#" + options.deleteDiv).droppable({
            drop: function(event, ui) {
                var element = ui.helper,
                    css_id = element.attr("id"),
                    id = css_id.replace(options.taskId, ""),

                    turl = "/tasks/"+ id +".json";
                    $.getJSON(turl, function( object ) {

                      //Call jQuery ajax
                      $.ajax({
                          type: "DELETE",
                          contentType: "application/json; charset=utf-8",
                          url: turl,
                          dataType: "json",
                          success: function (msg) {
                            // Removing old element
                            removeElement(object);
                            // Hiding Delete Area
                            $("#" + defaults.deleteDiv).hide();
                          },
                          error: function (err){
                              alert('Error');
                          }
                      });
                    });
            }
        })

    };

    // Add Task
    var generateElement = function(params){
        var parent = $(codes[params.state]),
            wrapper;

        if (!parent) {
            return;
        }
        console.log(JSON.stringify(params))
        wrapper = $("<div />", {
            "class" : defaults.todoTask,
            "id" : defaults.taskId + params.id,
            "data" : params.id
        }).appendTo(parent);

        $("<div />", {
            "class" : defaults.todoHeader,
            "text": params.title
        }).appendTo(wrapper);

        $("<div />", {
            "class" : defaults.todoDate,
            "text": params.due
        }).appendTo(wrapper);

        $("<div />", {
            "class" : defaults.todoDescription,
            "text": params.description
        }).appendTo(wrapper);

        wrapper.draggable({
            start: function() {
                $("#" + defaults.deleteDiv).show();
            },
            stop: function() {
                $("#" + defaults.deleteDiv).hide();
            },
            revert: "invalid",
            revertDuration : 200
        });

    };

    // Remove task
    var removeElement = function (params) {
        $("#" + defaults.taskId + params.id).remove();
    };

    todo.add = function(story_id) {
        var inputs = $("#" + defaults.formId + " :input"),
            errorMessage = "Title can not be empty",
            id, title, description, date, tempData;

        if (inputs.length !== 4) {
            return;
        }

        title = inputs[0].value;
        description = inputs[1].value;
        date = inputs[2].value;

        if (!title) {
            
            return;
        }

        tempData = {
            "story_id" : story_id, 
            state: "1",
            title: title,
            due: date,
            description: description
        };

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "/tasks.json",
            data: JSON.stringify(tempData),
            dataType: "json",
            success: function (msg) {
              // Generate Todo Element
              generateElement(msg);

              // Reset Form
              inputs[0].value = "";
              inputs[1].value = "";
              inputs[2].value = "";
            },
            error: function (err){
                alert('Error');
            }
        });
     
    };

    var generateDialog = function (message) {
        var responseId = "response-dialog",
            title = "Messaage",
            responseDialog = $("#" + responseId),
            buttonOptions;

        if (!responseDialog.length) {
            responseDialog = $("<div />", {
                    title: title,
                    id: responseId
            }).appendTo($("body"));
        }

        responseDialog.html(message);

        buttonOptions = {
            "Ok" : function () {
                responseDialog.dialog("close");
            }
        };

        responseDialog.dialog({
            autoOpen: true,
            width: 400,
            modal: true,
            closeOnEscape: true,
            buttons: buttonOptions
        });
    };

    todo.clear = function () {
        data = {};
        localStorage.setItem("todoData", JSON.stringify(data));
        $("." + defaults.todoTask).remove();
    };

})(todo, data, jQuery);