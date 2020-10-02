import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


const choice = function (ra) {
    return ra[Math.floor(Math.random() * ra.length)];
}


const minerRefresh = function() {
    window.word = choice(Challenges.find().fetch());
}

Template.miner.onCreated(function() {
    minerRefresh();
});


Template.miner.events({
    'keypress #answer': function(ev) {
        if (ev.keyCode == 13) {
            Meteor.call('submitChallenge', window.word, ev.target.value);
            ev.target.value = "";

            minerRefresh();
            document.getElementById("captcha").innerHTML = "";
            reloadp5();
        }
    }
});

Template.main.helpers({
    balance: function() {
        return Accounts.findOne({userId: Meteor.userId()}).balance;
    }
});
