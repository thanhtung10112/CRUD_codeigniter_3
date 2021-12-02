$(document).on("click", "#add", function (e) {
  e.preventDefault();

  var name = $("#name").val();
  var email = $("#email").val();

  $.ajax({
    url: "<?php echo base_url(); ?>insert",
    type: "post",
    dataType: "json",
    data: {
      name: name,
      email: email,
    },
    success: function (data) {
      if (data.response == "success") {
        fetch();
        $("#exampleModal").modal("hide");
        $("#form")[0].reset();
        Command: toastr["success"](data.message);

        toastr.options = {
          closeButton: false,
          debug: false,
          newestOnTop: false,
          progressBar: false,
          positionClass: "toast-top-right",
          preventDuplicates: false,
          onclick: null,
          showDuration: "300",
          hideDuration: "1000",
          timeOut: "5000",
          extendedTimeOut: "1000",
          showEasing: "swing",
          hideEasing: "linear",
          showMethod: "fadeIn",
          hideMethod: "fadeOut",
        };
      } else {
        Command: toastr["error"](data.message);

        toastr.options = {
          closeButton: false,
          debug: false,
          newestOnTop: false,
          progressBar: false,
          positionClass: "toast-top-right",
          preventDuplicates: false,
          onclick: null,
          showDuration: "300",
          hideDuration: "1000",
          timeOut: "5000",
          extendedTimeOut: "1000",
          showEasing: "swing",
          hideEasing: "linear",
          showMethod: "fadeIn",
          hideMethod: "fadeOut",
        };
      }
    },
  });
});

function fetch() {
  $.ajax({
    url: "<?php echo base_url(); ?>fetch",
    type: "get",
    dataType: "json",
    success: function (data) {
      var i = 1;
      var tbody = "";
      for (var key in data) {
        tbody += "<tr>";
        tbody += "<td>" + i++ + "</td>";
        tbody += "<td>" + data[key]["name"] + "</td>";
        tbody += "<td>" + data[key]["email"] + "</td>";
        tbody += `<td>
                                  <a href="#" id="del" value="${data[key]["id"]}"> <i class="fas fa-trash"></i></a>
                                  <a href="#" id="edit" value="${data[key]["id"]}"><i class="fas fa-edit "></i></a>
                              </td>`;
        tbody += "<tr>";
      }

      $("#tbody").html(tbody);
    },
  });
}

fetch();

$(document).on("click", "#del", function (e) {
  e.preventDefault();

  var del_id = $(this).attr("value");

  if (del_id == "") {
    alert("Delete id required");
  } else {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger mr-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          $.ajax({
            url: "<?php echo base_url(); ?>delete",
            type: "post",
            dataType: "json",
            data: {
              del_id: del_id,
            },
            success: function (data) {
              fetch();
              if (data.response === "success") {
                swalWithBootstrapButtons.fire(
                  "Deleted!",
                  "Your file has been deleted.",
                  "success"
                );
              }
            },
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  }
});

$(document).on("click", "#edit", function (e) {
  e.preventDefault();

  var edit_id = $(this).attr("value");

  if (edit_id == "") {
    alert("Edit id required");
  } else {
    $.ajax({
      url: "<?php echo base_url(); ?>edit",
      type: "post",
      dataType: "json",
      data: {
        edit_id: edit_id,
      },
      success: function (data) {
        if (data.response === "success") {
          $("#editModal").modal("show");
          $("#edit_modal_id").val(data.post.id);
          $("#edit_name").val(data.post.name);
          $("#edit_email").val(data.post.email);
        } else {
          Command: toastr["error"](data.message);

          toastr.options = {
            closeButton: false,
            debug: false,
            newestOnTop: false,
            progressBar: false,
            positionClass: "toast-top-right",
            preventDuplicates: false,
            onclick: null,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "5000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
          };
        }
      },
    });
  }
});

$(document).on("click", "#update", function (e) {
  e.preventDefault();

  var edit_id = $("#edit_modal_id").val();
  var edit_name = $("#edit_name").val();
  var edit_email = $("#edit_email").val();

  if (edit_id == "" || edit_name == "" || edit_email == "") {
    alert("both field is required");
  } else {
    $.ajax({
      url: "<?php echo base_url(); ?>update",
      type: "post",
      dataType: "json",
      data: {
        edit_id: edit_id,
        edit_name: edit_name,
        edit_email: edit_email,
      },
      success: function (data) {
        fetch();
        if (data.response === "success") {
          $("#editModal").modal("hide");
          Command: toastr["success"](data.message);

          toastr.options = {
            closeButton: false,
            debug: false,
            newestOnTop: false,
            progressBar: false,
            positionClass: "toast-top-right",
            preventDuplicates: false,
            onclick: null,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "5000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
          };
        } else {
          Command: toastr["error"](data.message);

          toastr.options = {
            closeButton: false,
            debug: false,
            newestOnTop: false,
            progressBar: false,
            positionClass: "toast-top-right",
            preventDuplicates: false,
            onclick: null,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "5000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut",
          };
        }
      },
    });
    $("#update_form")[0].reset();
  }
});
