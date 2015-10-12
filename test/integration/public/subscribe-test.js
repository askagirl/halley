var Faye = require('../../..');

describe('subscriptions', function() {
  var client;

  beforeEach(function() {
    client = new Faye.Client('http://localhost:8001/bayeux', { timeout: 45 });
  });

  afterEach(function() {
    client.disconnect();
  });

  it('should subscribe to a channel and receive messages', function(done) {
    var count = 0;
    var subscription = client.subscribe('/datetime', function(message) {
      if (++count >= 1) {
        return done();
      }
    });

    subscription.then(null, done);
  });

  it('should handle subscription failure correctly', function(done) {
    var count = 0;
    var subscription = client.subscribe('/banned', function(message) {
      done(new Error('Expected a failure'));
    });

    subscription.then(function() {
      done(new Error('Expected a failure'));
    }, function(err) {
      done();
    });
  });

});