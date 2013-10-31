Comments = new Meteor.Collection('comments');
Meteor.methods({
  comment: function(commentAttributes) {
    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);

    if (!user)
      throw new Meteor.Error(401, "You need to login to make comments");
    
    if (!post)
      throw new Meteor.Error(422, 'You must comment on a post');
    
    if (!commentAttributes.body)
      throw new Meteor.Error(422, 'Please write some content');
    
    comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
      userId: user._id,
      author: user.username,
      commentsCount: 0,
      submitted: new Date().getTime()
    });
    
    Posts.update(post._id, {$inc: {commentsCount: 1}});
    
    comment._id = Comments.insert(comment);
    
    createCommentNotification(comment);
    
    return comment._id;
  }
});