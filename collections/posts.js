Posts = new Meteor.Collection('posts');
Posts.allow({
    insert: function(userId, doc) {
        return !! userId;
    }
});

Meteor.methods({
    post: function(postAttributes) {
        var user = Meteor.user(),
            postWithSameLink = Posts.find({url: postAttributes.url});

        if (!user)
            throw new Meteor.Error(401, "You need to login");

        if (!postAttributes.title)
            throw new Meteor.Error(422, "Please fill title");

        if (postAttributes.url && postWithSameLink)
            throw new Meteor.Error(302, 'This link has already been posted', postWithSameLink._id);

        var post = _.extend();
    }
})