var instagramLocations = [];
var latitude;
var longitude;

$(document).ready( function() {
	$('.refreshbtn').on('click', function() {
		   initializeInstagram();
		  });		  

});

 $(function () {

 	initializeInstagram();
 });

function initializeInstagram()
{


           var apiUrl = "https://api.instagram.com/v1/users/self/feed?access_token=3697165.5d14b76.9096ac4c6e7f46ab8c3ab9985fa9b56f&callback=?"

           function success (instagramData) {


             if (instagramData.meta.code != 200) {
               // If we don't get a 200 that means instagram threw an error.

               $('.results').html('<h1>An Error Occured</h1><p>' + instagramData.meta.error_message + '</p>');
               return
             }

             $.each(instagramData.data, function(index, gram) {

         		if(gram.location)
         		{
         			instagramLocations.push(gram);
         		


               if (gram.type == 'image') {
                 $('.results').append('<div class="col-md-4">' +
                                      '<p class="insta-name"><img class="img-circle" src="' + gram.user.profile_picture + '">' + gram.user.username + '</p>' +
                                      '<a href="'+ gram.link +'" target="_blank"><img class="img-thumbnail" src="' + gram.images.low_resolution.url + '"/></a>' +
                                      '</div>')
               }
               
               /*if (gram.type == 'video') {

                 $('.results').append('<div class="col-md-4">' +
                                      '<p class="insta-name"><img class="img-circle" src="' + gram.user.profile_picture + '">' + gram.user.username + '</p>' +
                                      '<a href="'+ gram.link +' target="_blank"><video class="img-thumbnail" src="' + gram.videos.low_resolution.url + '"/></a>' +
                                      '</div>')
               }*/
				}
             });

				initialize();
           }




           $.ajax({
             type: "GET",
             url: apiUrl,
             dataType: "json",
             success: success // If successful we call the success function, which lives up above
           });
}

 function initialize()
    {
    	//my current location
        var laa=51.552552;
        var lonn= -0.174902;

        var mapOptions =
        {
            zoom: 10,
            center: new google.maps.LatLng(laa, lonn),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            maxZoom: 10,
            minZoom:0,
            styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}]
        };

        var map = new google.maps.Map(document.getElementById('location-canvas'),
            mapOptions);

 		var image = new google.maps.MarkerImage('http://googlemaps.googlermania.com/img/marker_flag.png');
		image.size = new google.maps.Size(35, 35);

        var marker = new google.maps.Marker({
            map: map,
            draggable: false,
            position: new google.maps.LatLng(laa, lonn),
			icon: image
        });

		var contentString = "Your current location";

		var infowindow = new google.maps.InfoWindow({
			content: contentString
		})      

		 marker.addListener('click', function() {
		    infowindow.open(map, marker);
		  });		  

        $.each(instagramLocations, function(index, gram) {


		 var contentString = "<a href='" + gram.link +"' target='_blank'><img src='" + gram.images.low_resolution.url + "'/></a><br/> Posted by @" + gram.user.username;

			var infowindow = new google.maps.InfoWindow({
				content: contentString
			})

			var marker = new google.maps.Marker({
				map: map,
				draggable: false,
				position: new google.maps.LatLng(gram.location.latitude, gram.location.longitude)
			});

			marker.setMap(map);

			 marker.addListener('click', function() {
			    infowindow.open(map, marker);
			  });

        });

        function bind(eventName)
        {
            google.maps.event.addListener(map, eventName, function ()
            {
                common();

            });
        }

        bind('zoom_changed');
        bind('center_changed');
        bind('tilesloaded');
        bind('idle');

        function common()
        {
            var bounds = map.getBounds();
            var southWest = bounds.getSouthWest();
            var northEast = bounds.getNorthEast();
            var getcentre=bounds.getCenter();
            var ne = map.getBounds().getNorthEast();
            var sw = map.getBounds().getSouthWest();
            var zoom=map.getZoom();
            var centre_lat=getcentre.lat();
            var centre_long=getcentre.lng();
            var myLatlng=new google.maps.LatLng(centre_lat,centre_long);
            var mapProp =
            {
                center: new google.maps.LatLng(centre_lat,centre_long),
                zoom:zoom,
                maxZoom: 8,
                minZoom:2,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };



        }
    }
