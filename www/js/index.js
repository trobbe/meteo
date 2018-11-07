/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var loader = $('#loader');
loader.hide();

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);

        console.log('Received Event: ' + id);

        //Listener click button OK
        document.getElementById('buttonSubmitCity')
            .addEventListener('click', submitCity);
    }
};

function submitCity() {

    var city = $('#city');

    if (city.val().length <= 0) {
        alert("Tu dois saisir une ville Djadja (N'oublie pas que parle sur moi y'a R) !");
        return; //stop l'éxecution du programme (sort de la fonction)
    }

    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city.val()},fr&units=metric&appid=eab21abd0f9d980e6c6cb83cdb30409b`;

    loader.show();

    $.ajax({
        url: url,
        method: "get",
        dataType: "json",
        success: function (response) {
            loader.hide();

            var json = response;

            var resultCity = $('#resultCity');
            var resultTemperature = $('#resultTemperature');
            var resultIcon = $('#resultIcon');

            resultCity.html(json.name);
            resultTemperature.html(`${json.main.temp}°C`);
            resultIcon.html(`<img src="https://openweathermap.org/img/w/${json.weather[0].icon}.png" width="100px" />`);
        },
        error: function (response) {
            loader.hide();

            var json = response.responseJSON;

            alert(json.message);
        }
    });

    /*
    var city = document.getElementById('city');

    //Déclaration de l'URL du webservice
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value},fr&units=metric&appid=eab21abd0f9d980e6c6cb83cdb30409b`;

    var requete = new XMLHttpRequest();
    requete.open('GET', url, true); //async
    requete.send(); //execution de la requête

    requete.onreadystatechange = function () {
        if(requete.readyState === 4) {
            alert(`state : ${requete.readyState} status: ${requete.status} ${this.responseText}`);

            if(requete.status == 200) {
                if(requete.responseText.length > 0) {

                    var json = JSON.parse(requete.responseText);

                    var resultCity = document.getElementById('resultCity');
                    var resultTemperature = document.getElementById('resultTemperature');
                    var resultIcon = document.getElementById('resultIcon');

                    resultCity.innerHTML = json.name;
                    resultTemperature.innerHTML = json.main.temp;
                    resultIcon.innerHTML = `<img src="https://openweathermap.org/img/w/${json.weather[0].icon}.png" width="100px" />`

                } else {
                    alert("Erreur serveur: aucune réponse");
                }
            } else {
                alert ("Erreur Serveur");
            }
        }

    }*/

}