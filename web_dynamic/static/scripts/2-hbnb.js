$(document).ready(function () {
  const amenitiesDict = {};

  $("div.amenities li input").change(function () {
    if ($(this).is(":checked")) {
      amenitiesDict[$(this).attr("data-id")] = $(this).attr("data-name");
    } else {
      delete amenitiesDict[$(this).attr("data-id")];
    }
    $("div.amenities h4").html(
      Object.values(amenitiesDict).join(", ") || "&nbsp;"
    );
  });

  $.getJSON("http://0.0.0.0:5001/api/v1/status/", (data) => {
    if (data.status === "OK") {
      $("DIV#api_status").addClass("available");
    } else {
      $("DIV#api_status").removeClass("available");
    }
  });
});
