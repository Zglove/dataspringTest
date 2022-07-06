'use strict';

const assert = require('assert');
const MyGreeter = require('../src/MyGreeter.js');


describe('MyGreeter.Client', function () {

    describe('Constructor', function () {

        it('should be instantiated', function() {
            const greeter = new MyGreeter.Client();
            assert.ok(greeter instanceof MyGreeter.Client);
        });
    });

    describe('getGreeting', function () {

        // 测试当前时间对应问候语
        it('should return greeting at the moment', function() {
            const greeter = new MyGreeter.Client();
            assert.equal(greeter.getGreeting().length > 0, true);
            
            const now = new Date().getHours();
            if (now >= 6 && now < 12) {
                assert.equal(greeter.getGreeting(), 'Good morning');
            }else if (now >= 12 && now < 18) {
                assert.equal(greeter.getGreeting(), 'Good afternoon');
            }else {
                assert.equal(greeter.getGreeting(), 'Good evening');
            }

        });

        // 测试非法参数
        it('should return `invalid parameter`', function() {
            const greeter = new MyGreeter.Client();
            assert.equal(greeter.getGreeting(12), 'invalid parameter'); // not string
            assert.equal(greeter.getGreeting('fsafffa'), 'invalid parameter'); // not match regex like `00:00am`
            assert.equal(greeter.getGreeting('12:01am'), 'invalid parameter'); // 12:01 is pm
            assert.equal(greeter.getGreeting('00:01pm'), 'invalid parameter'); // 00:01 is am
        });

        // 测试`Good morning`区间 [6,12)
        it('should return `Good morning`', function() {
            const greeter = new MyGreeter.Client();
            assert.equal(greeter.getGreeting('06:00am'), 'Good morning');
            assert.equal(greeter.getGreeting('11:59am'), 'Good morning');
        });

        // 测试`Good afternoon`区间 [12,18)
        it('should return `Good afternoon`', function() {
            const greeter = new MyGreeter.Client();
            assert.equal(greeter.getGreeting('12:00pm'), 'Good afternoon');
            assert.equal(greeter.getGreeting('05:59pm'), 'Good afternoon');
        });

        // 测试`Good evening`区间 [18, 24) & [0, 6)
        it('should return `Good evening`', function() {
            const greeter = new MyGreeter.Client();
            assert.equal(greeter.getGreeting('06:00pm'), 'Good evening');
            assert.equal(greeter.getGreeting('11:59pm'), 'Good evening');
            assert.equal(greeter.getGreeting('00:00am'), 'Good evening');
            assert.equal(greeter.getGreeting('05:59am'), 'Good evening');
        });

    });
});
