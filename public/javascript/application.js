function call_ajax(city){
    $.ajax({
      // dataType: 'jsonp',
      // jsonp: 'jsoncallback',
      url: 'http://api.wunderground.com/api/c98d80538ff67dd4/forecast/q/'+ city.data('state') +'/' + city.data('city')+'.json',
      success: function(data){
        var week = data.forecast.txt_forecast.forecastday;
        // console.log(week);
        $('.show-forecast').html('');
        for(var i = 0; i < week.length; i++){
          var day = week[i];
          console.log(day.fcttext);
          var head = $('<h3>').text(i + ' day from now');
          var text = $('<p>').text(day.fcttext);
          var img = $('<img>').attr('src', day.icon_url);

          var div = $('<div>').append(head).append(text).append(img);
          // div = $('<div>').text(day.fcttext);

          $('.show-forecast').append(div);
        }
      }
    });
}

$(document).ready(function() {


  $('#flickr-btn').on('click', function(){
    // alert('');

    $.ajax({

      dataType: 'jsonp',
      jsonp: 'jsoncallback',
      url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=60314a392bb45d072a32cf846e506218&text=lighthouse&format=json',
      success: function(data){
        var photos = data.photos.photo

        var i = 0;

        setInterval(function(){
          i = i < photos.length ? i : 0;

          var photo = photos[i]
          var img = 'https://farm'+ photo.farm +'.staticflickr.com/'+ photo.server +'/'+ photo.id +'_'+photo.secret+'.jpg';
          var url = 'https://www.flickr.com/photos/'+ photo.owner +'/' + photo.id;

          $('a').attr("href", url);

          $('img').fadeOut(1000, function(){
            $(this).attr('src', img).fadeIn(1000);
          })

          $('#title').fadeOut(500, function(){
            $(this).text(photo.title).fadeIn(500);
          })
          i++;
        },3000);
        
      }
    });
  });

  $('#forecast-btn').on('click', function(){
    var city = $('option:selected');
    // alert(city.data('state')+city.data('city'));

    call_ajax(city);
    // $.ajax({
    //   // dataType: 'jsonp',
    //   // jsonp: 'jsoncallback',
    //   url: 'http://api.wunderground.com/api/c98d80538ff67dd4/forecast/q/'+ city.data('state') +'/' + city.data('city')+'.json',
    //   success: function(data){
    //     var week = data.forecast.txt_forecast.forecastday;
    //     // console.log(week);
    //     $('.show-forecast').html('');
    //     for(var i = 0; i < week.length; i++){
    //       var day = week[i];
    //       console.log(day.fcttext);
    //       var head = $('<h3>').text(i + ' day from now');
    //       var text = $('<p>').text(day.fcttext);
    //       var img = $('<img>').attr('src', day.icon_url);

    //       var div = $('<div>').append(head).append(text).append(img);
    //       // div = $('<div>').text(day.fcttext);

    //       $('.show-forecast').append(div);
    //     }
    //   }
    // });
  });


  $('#search-city-btn').on('click', function(){
    // alert($('#search-input').val());
    $.ajax({
      // dataType: 'jsonp',
      // jsonp: 'jsoncallback',
      url: 'http://api.wunderground.com/api/c98d80538ff67dd4/forecast/q/' + $('#search-input').val() +'.json',
      success: function(data){

        // console.log(data);

        if (data.forecast) {

          var week = data.forecast.txt_forecast.forecastday;
        // console.log(week);
          $('.show-forecast').html('');
          for(var i = 0; i < week.length; i++){
            var day = week[i];
            console.log(day.fcttext);
            var head = $('<h3>').text(i + ' day from now');
            var text = $('<p>').text(day.fcttext);
            var img = $('<img>').attr('src', day.icon_url);

            var div = $('<div>').append(head).append(text).append(img);
            // div = $('<div>').text(day.fcttext);

            $('.show-forecast').append(div);
          }
        } else if (data.response.results) {
          $('.show-forecast').html('found something');
          var city = data.response.results;
          for (var i = 0; i < 10 && i < city.length; i++){
            var a = $('<a>').text(city[i].city + ' / ' + city[i].state);
            a.attr('data-city', city[i].city);
            a.attr('data-state', city[i].state);
            a.addClass('list-city');
            
            var div = $('<div>').append(a);

            $('.show-forecast').append(div);
          }
        } else{
          $('.show-forecast').html('Cannot find the result');
        }
      }
    });
  });


  $('.show-forecast').on('click', '.list-city', function(){

    var city = $(this);
    // alert(city.data('state')+city.data('city'));

    call_ajax(city);

    // $.ajax({
    //   // dataType: 'jsonp',
    //   // jsonp: 'jsoncallback',
    //   url: 'http://api.wunderground.com/api/c98d80538ff67dd4/forecast/q/'+ city.data('state') +'/' + city.data('city')+'.json',
    //   success: function(data){
    //     var week = data.forecast.txt_forecast.forecastday;
    //     // console.log(week);
    //     $('.show-forecast').html('');
    //     for(var i = 0; i < week.length; i++){
    //       var day = week[i];
    //       console.log(day.fcttext);
    //       var head = $('<h3>').text(i + ' day from now');
    //       var text = $('<p>').text(day.fcttext);
    //       var img = $('<img>').attr('src', day.icon_url);

    //       var div = $('<div>').append(head).append(text).append(img);
    //       // div = $('<div>').text(day.fcttext);

    //       $('.show-forecast').append(div);
    //     }
    //   }
    // });
  });



  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
