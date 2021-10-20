fetch('data.json')
    .then(response => response.json())
    .then(data => {
        let tab = document.getElementsByClassName("tab");


        // Switch the active class so only one tab can be active
        for (var i = 0; i < tab.length; i++) {
            tab[i].addEventListener("click", isActive);
        }
        function isActive() {
            //console.log(this);
            var current = document.getElementsByClassName("active");
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" active", "");
            }
            this.className += " active";
            //console.log(this.className);

            let requestURL = "https://raw.githubusercontent.com/danielblas/time-tracking-dashboard/main/data.json";

            let request = new XMLHttpRequest();

            request.open('GET', requestURL);
            request.responseType = 'json';
            request.send();

            request.onload = function () {
                // Put the data inside a variable
                const data = request.response;

                // Create functions to handle the data
                populatePage(data);


            }

            function populatePage(obj) {

                // get the active tab (daily, weekly, monthly)
                let active = document.getElementsByClassName("active")[0];
                let value = active.innerHTML.toLowerCase();
                //console.log(value);


                let cards = document.getElementsByClassName("card");
                for (var i = 0; i < cards.length; i++) {
                    //console.log(cards[i]);
                    //get the elements
                    let current = cards[i].getElementsByClassName('card__main__data__hours')[0];
                    let previous = cards[i].getElementsByClassName('card__main__data__last')[0];

                    //logic

                    let strg1;
                    let strg2;
                    let strg3;

                    switch (value) {
                        case 'daily':
                            strg1 = 'Last Day - '
                            break;

                        case 'weekly':
                            strg1 = 'Last Week - '
                            break;

                        case 'monthly':
                            strg1 = 'Last Month - '
                            break;

                    }
                    let hours = obj[i].timeframes[value].current;
                    if (hours == 1) {
                        strg2 = hours + "hr";
                    } else {
                        strg2 = hours + "hrs";
                    }
                    let last = obj[i].timeframes[value].previous;
                    if (last == 1) {
                        strg3 = last + "hr";
                    } else {
                        strg3 = last + "hrs";
                    }

                    //change the elements

                    current.textContent = strg2;
                    previous.textContent = strg1 + strg3;
                    //console.log(current.textContent, previous.textContent);

                }
            }
        }
    })