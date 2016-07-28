
wanthaver.filter('shorten', function($sce) {
    return function(val) {
        if(val.length > 50)
            return val.substr(0,50)+"..."
        return val
    };
});

wanthaver.filter('formatKm', function($sce) {
    return function(val) {
        if(val < 1000){
            return "< 1km";
        }else{
            return Math.round(val/1000) + " km"
        }

    };
});

wanthaver.filter('desireStatus', function($sce) {
    return function(val) {
        switch(val) {
            case 0:
                return "DELETED";
            case 1:
                return "OPEN";
            case 2:
                return "IN PROGRESS";
            case 3:
                return "DONE";
            default:
                return "";
        }

    };
});

wanthaver.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

wanthaver.filter('rating', function($sce) {
    return function(val) {
        var ret = "";
        var full = "<i class='icon ion-ios-star rating-element'></i>";
        var half = "<i class='icon ion-ios-star-half rating-element'></i>";
        var no = "<i class='icon ion-ios-star-outline rating-element'></i>";
        var floor = Math.floor(val);
        for(var i=0;i<floor;i++){
            ret += full;
        }
        if(val-floor >= 0.5){
            ret += half;
            floor++;
        }
        for(var i=floor;i<5;i++){
            ret += no;
        }
        return ret;
    };
});

wanthaver.filter('currency', function($sce) {
    return function(val) {
        if(val == "EUR")
            return "€";
        if(val == "USD")
            return "$";
        if(val == "GPB")
            return "£";
        return "";
    };
});