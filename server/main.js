import { Meteor } from 'meteor/meteor';

const choice = function (ra) {
    return ra[Math.floor(Math.random() * ra.length)];
}

const chars = "ABCDEFHJKLMNOPQRSTUVQXYZabcdefghijkmnopqrstuvqxyz";

Meteor.startup(() => {
    if (!Challenges.findOne()) {
        // Seed
        for (let i = 0; i < 100; i++) {
            Challenges.insert({
                text: [
                    choice(chars),
                    choice(chars),
                    choice(chars),
                    choice(chars),
                    choice(chars),
                    choice(chars)
                ].join("")
            });
        }
    }
});


Meteor.methods({

    submitChallenge: function(challenge, submission) {
        if (challenge.text == submission) {
            if (!Accounts.findOne({ userId: this.userId })) {
                Accounts.insert({
                    userId: this.userId,
                    balance: 0
                });
            }

            Accounts.update({
                userId: this.userId,
            }, {
                    $inc: { balance: 1 }
                });
        }
    }

});
