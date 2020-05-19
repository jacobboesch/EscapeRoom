import Loader from "./Loader";

export default class EscapeRoom{
    _url;
    _loader; 

    constructor(url){
        this._url = url;
        this._loader = new Loader(true, "Fetching escape room file");
    }
    
    build(){
        this._loader.build();
        this.fetchEscapeRoom(); 
    }

    fetchEscapeRoom(){
        var self = this;
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: self._url,
            success: function(data){
                self.loadRoom(data); 
            },
            error: function(){
                alert("Failed to load the escape room");
            }
        });
    }

    loadRoom(data){
        this._loader.label = "Building the escape room";
    }
}