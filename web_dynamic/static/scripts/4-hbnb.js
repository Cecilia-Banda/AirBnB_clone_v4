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

  $.ajax({
    type: "POST",
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    contentType: "application/json",
    data: JSON.stringify({}),
    success: (data) => {
      for (const place of data) {
        const sub_html = `<article><div class="title_box"><h2>${place.name}</h2><div class="price_by_night">$${place.price_by_night}</div></div><div class="information"><div class="max_guest">${place.max_guest} Guests</div><div class="number_rooms">${placenumber_rooms} Bedrooms</div><div class="number_bathrooms">${place.number_bathrooms} Bathroom</div></div><div class="description">${place.description}</div></article>`;
        $("section.places").append(sub_html);
      }
    },
  });

  $("button").click(() => {
    $("article").remove();
    $.ajax({
      type: "POST",
      url: "http://0.0.0.0:5001/api/v1/places_search/",
      contentType: "application/json",
      data: JSON.stringify({ amenities: Object.keys(amenitiesDict) }),
      success: (data) => {
        for (const place of data) {
          const sub_html = `<article><div class="title_box"><h2>${place.name}</h2><div class="price_by_night">$${place.price_by_night}</div></div><div class="information"><div class="max_guest">${place.max_guest} Guests</div><div class="number_rooms">${placenumber_rooms} Bedrooms</div><div class="number_bathrooms">${place.number_bathrooms} Bathroom</div></div><div class="description">${place.description}</div></article>`;
          $("section.places").append(sub_html);
        }
      },
    });
  });
});
