
var hr = new XMLHttpRequest();
var url = "sponsor.json";
var s;
var set = [];

hr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        s = JSON.parse(hr.responseText);

        
        s.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });

        

        var x = document.getElementsByClassName('stragatic');
        var a = document.getElementsByClassName('stra');


        var spo = document.getElementsByClassName('Spo');
        var sporef = document.getElementsByClassName('Sporef');




        // for( i in s){
        //     x.src= s[i].logoUrl;
        // }
        var p =0
        var z = 0;
        for (var i = 0; i < s.length ; i ++){
             //alert(s.length);

                if(s[i].type == "StrategicPartner"){

                    set[p] = s[i];
                    // x[p].src = s[i].logoUrl;
                    // a[p].href = s[i].mainUrl;
                    p++;
                }else if(s[i].type == "Sponsor" ){
                          
                

                    spo[z].src = s[z].logoUrl;
                    sporef[z].href = s[z].mainUrl;
                        z++;

                    

                }

           
        }

        shuffle(set);


        for(i =0 ;i <set.length; i ++){

            x[i].src = set[i].logoUrl;
            a[i].href = set[i].mainUrl;
        }
       
            

        function shuffle(array) {
                var i = 0
                     , j = 0
                     , temp = null
            
                 for (i = array.length - 1; i > 0; i -= 1) {
                     j = Math.floor(Math.random() * (i + 1))
                    temp = array[i]
                     array[i] = array[j]
                     array[j] = temp
                 }
            }
            
        




        
    };
}
 hr.open("GET", url, true);
hr.send();




