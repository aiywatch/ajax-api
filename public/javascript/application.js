$(document).ready(function() {


  $('button').on('click', function(){
    // alert('');

    $.ajax({
      // type: 'GET',
      dataType: 'jsonp',
      jsonp: 'jsoncallback',
      url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=60314a392bb45d072a32cf846e506218&text=lighthouse&format=json',
      success: function(data){
        photos = data.photos.photo
        // console.log(photos[0]);
        var i = 0;

        setInterval(function(){
          i = i < photos.length ? i : 0;

          photo = photos[i]
          var img = 'https://farm'+ photo.farm +'.staticflickr.com/'+ photo.server +'/'+ photo.id +'_'+photo.secret+'.jpg';
          var url = 'https://www.flickr.com/photos/'+ photo.owner +'/' + photo.id;

          $('a').attr("href", url);

          $('img').fadeOut(1000, function(){
            $(this).attr('src', img).fadeIn(1000);
          })

          $('#title').fadeOut(500, function(){
            $(this).text(photo.title).fadeIn(500);
          })

          // $('img').remove();
          // $('body').append($('<img>',{ src: img}));
          
          i++;
        },3000);
        
      }
    });

    // $.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=60314a392bb45d072a32cf846e506218&text=lighthouse&format=rest&api_sig=3a1c73eeac56b398d804c3a1291a03f6",
    //  function(obj){
    //   console.log(obj);
    // });
  });



  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
