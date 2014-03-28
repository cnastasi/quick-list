
app.factory("GeolocalizationService",function(StorageService){
  return{
    getPosition: function(success, fail){
    	navigator.geolocation.getCurrentPosition(success, fail);
    }
  };
});