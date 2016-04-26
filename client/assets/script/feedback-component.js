/*
window.addEventListener('load', function () {
    console.log('feedback comp. loaded...');

    var feedbackComponents = document.querySelectorAll('.feedback-component') || [];
    console.log(feedbackComponents);

    for (var i = 0; i < feedbackComponents.length; i++) {
        console.log(feedbackComponents[i].className);
    }
});
*/

var feedbackComponent = (function () {
        return {
            init: init
        }

        function init() {
            console.log('Initializing feedback component...');
            var feedbackComponents = document.querySelectorAll('.feedback-component');

            for (var i = 0; i < feedbackComponents.length; i++) {
                var thisComponent = feedbackComponents[i];

                var feedbackComponentContainer = document.createElement('div');
                feedbackComponentContainer.setAttribute('class', 'feedback-comp-container');

                var feedbackForm = document.createElement('form');
                var formElementGroup1 = document.createElement('div');
                var nameElementLabel = document.createElement('label');
                nameElementLabel.innerText = 'Name: ';
                var nameElementInput = document.createElement('input');
                nameElementInput.setAttribute('type', 'text');
                nameElementInput.setAttribute('id', 'feedbacker-name-' + i);
                formElementGroup1.appendChild(nameElementLabel);
                formElementGroup1.appendChild(nameElementInput);

                var formElementGroup2 = document.createElement('div');
                var fbElementLabel = document.createElement('label');
                fbElementLabel.innerText = 'Feedback: ';
                var fbElementInput = document.createElement('input');
                fbElementInput.setAttribute('type', 'text');
                fbElementInput.setAttribute('id', 'feedbacker-feedback-' + i);
                formElementGroup2.appendChild(fbElementLabel);
                formElementGroup2.appendChild(fbElementInput);
                var feedbackButton = document.createElement('button');
                feedbackButton.innerText = 'Post Feedback';

                feedbackButton.addEventListener('click', function () {
                    var xhttpreq = new XMLHttpRequest();
                    xhttpreq.onreadystatechange = function () {
                        if (xhttpreq.readyState == 4 && xhttpreq.status == 201) {
                            var feedback = JSON.parse(xhttpreq.response);
                            var feedbackerOption = document.createElement('option');
                            feedbackerOption.setAttribute('value', feedback._id);
                            feedbackerOption.innerText = document.getElementById('feedbacker-name-' + i);
                            document.getElementById("individual-feedbacker-name").innerHTML = feedback.feedback;
                        }
                    };
                    xhttpreq.open("POST", "/api/feedbacks", true);
                    xhttpreq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    xhttpreq.send( JSON.stringify({ name: document.getElementById('feedbacker-name-0').value, feedback: document.getElementById('feedbacker-feedback-0').value }));
                });

                feedbackForm.appendChild(formElementGroup1);
                feedbackForm.appendChild(formElementGroup2);
                feedbackForm.appendChild(feedbackButton);
                feedbackComponentContainer.appendChild(feedbackForm);

                var allFeedbacksContainer = document.createElement('div');
                var allFeedbacksOption = document.createElement('input');
                allFeedbacksOption.setAttribute('type', 'radio');
                allFeedbacksOption.setAttribute('name', 'view-type');
                allFeedbacksOption.setAttribute('id', 'all-feedbacks');
                allFeedbacksOption.setAttribute('value', 'all-feedbacks');

                var allFeedbacksLabel = document.createElement('label');
                allFeedbacksLabel.innerText = 'All Feedbacks';
                allFeedbacksLabel.setAttribute('for', 'all-feedbacks');

                var allFeedbacksContent = document.createElement('div');
                allFeedbacksContent.setAttribute('id', 'all-feedback-content');
                allFeedbacksContent.innerText = 'All feedbacks content goes here...';
                allFeedbacksContent.setAttribute('class', 'feedbacks-section');

                allFeedbacksContainer.appendChild(allFeedbacksOption);
                allFeedbacksContainer.appendChild(allFeedbacksLabel);
                allFeedbacksContainer.appendChild(allFeedbacksContent);
                feedbackComponentContainer.appendChild(allFeedbacksContainer);

                var individualFeedbacksContainer = document.createElement('div');
                var individualFeedbacksOption = document.createElement('input');
                individualFeedbacksOption.setAttribute('type', 'radio');
                individualFeedbacksOption.setAttribute('name', 'view-type');
                individualFeedbacksOption.setAttribute('id', 'individual-feedbacks');
                individualFeedbacksOption.setAttribute('value', 'individual-feedbacks');
                var individualFeedbacksLabel = document.createElement('label');
                individualFeedbacksLabel.innerText = 'Individual Feedbacks';
                individualFeedbacksLabel.setAttribute('for', 'individual-feedbacks');
                var individualFeedbacksContent = document.createElement('div');
                individualFeedbacksContent.setAttribute('class', 'feedbacks-section');
                var individualFeedbacksFeedback = document.createElement('div');
                individualFeedbacksFeedback.setAttribute('id', 'individual-feedback-content');
                individualFeedbacksFeedback.innerText = 'Individual feedbacks content goes here...';
                var individualFeedbacksSelection = document.createElement('select');
                individualFeedbacksSelection.setAttribute('id', 'individual-feedbacker-name');
                individualFeedbacksContainer.appendChild(individualFeedbacksOption);
                individualFeedbacksContainer.appendChild(individualFeedbacksLabel);
                individualFeedbacksContainer.appendChild(individualFeedbacksContent);
                individualFeedbacksContent.appendChild(individualFeedbacksSelection);
                individualFeedbacksContent.appendChild(individualFeedbacksFeedback);
                feedbackComponentContainer.appendChild(individualFeedbacksContainer);
                individualFeedbacksSelection.addEventListener('change', function (event) {
                    console.log(event.target.options[event.target.options.selectedIndex].value);

                    var xhttpreq = new XMLHttpRequest();
                    xhttpreq.onreadystatechange = function () {
                        if (xhttpreq.readyState == 4 && xhttpreq.status == 200) {
                            var feedback = JSON.parse(xhttpreq.response);
                            document.getElementById("individual-feedback-content").innerHTML = feedback.feedback;
                        }
                    };
                    xhttpreq.open("GET", "/api/feedbacks/" + event.target.options[event.target.options.selectedIndex].value, true);
                    xhttpreq.send();

                });

                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {

                        var feedbacks = JSON.parse(xhttp.response);
                        feedbacks.forEach(function (feedback) {
                            var feedbacker = document.createElement('option');
                            feedbacker.setAttribute('value', feedback._id);
                            feedbacker.innerText = feedback.name;

                            individualFeedbacksSelection.appendChild(feedbacker);

                            var feedbackCont = document.createElement('div');
                            feedbackCont.innerText = feedback.name + ' - ' + feedback.feedback;
                            document.getElementById("all-feedback-content").appendChild(feedbackCont);
                        });
                    }
                };
                xhttp.open("GET", "/api/feedbacks", true);
                xhttp.send();


                thisComponent.appendChild(feedbackComponentContainer);
            }
        }
})();