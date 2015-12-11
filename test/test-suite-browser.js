'use strict';

require('../lib/util/externals').use({
  Events: require('backbone-events-standalone'),
  extend: require('lodash/object/extend')
});

var Promise = require('bluebird');
Promise.config({
  warnings: true,
  longStackTraces: false,
  cancellation: true
});

var RemoteServerControl = require('./helpers/remote-server-control');

describe('browser integration tests', function() {
  this.timeout(30000);

  before(function() {
    this.serverControl = new RemoteServerControl();
    return this.serverControl.setup()
      .bind(this)
      .then(function(urls) {
        this.urls = urls;
      });
  });

  after(function() {
    return this.serverControl.teardown();
  });

  beforeEach(function() {
    this.urlDirect = this.urls.bayeux;
    this.urlProxied = this.urls.proxied;

    this.clientOptions = {
      retry: 500,
      timeout: 1000
    };
  });

  afterEach(function() {
    return this.serverControl.restoreAll();
  });


  require('./browser-websocket-test');
  require('./client-long-polling-test');
  require('./client-websockets-test');
  require('./client-all-transports-test');
});

describe('browser unit tests', function() {
  require('./extensions-test');
  require('./transport-pool-test');
  require('./statemachine-mixin-test');
});
