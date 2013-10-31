Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

Template.error.events({
  'click .close': function(e) {
    e.preventDefault();
    Errors.remove(this._id);
  }
});