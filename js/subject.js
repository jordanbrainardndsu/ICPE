var hr3 = new XMLHttpRequest();
var url3 = "subjects.json";
var json3;
hr3.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        json3 = JSON.parse(hr3.responseText);


        var subjectList = "";
        var i;
        for (i in json3) {
            subjectList += "<li>" + json3[i].name + "</li>";
        }
        $('#subject').html(subjectList);

    }







}




hr3.open("GET", url3, true);
hr3.send();
