const chai = require('chai');

// const jsdom = require('jsdom');
// const { JSDOM } = jsdom;

// const htmlPage = '<html><body><canvas id="canvas"></canvas><script src="/js/bundle.js" async defer></script><script src="" async defer></script></body></html>';

// const { window } = new JSDOM (htmlPage);
// const { document } = window;

// global.window = window;
// global.document = document;

// const chaiAsPromised = require('chai-as-promised');
// const axios = require('axios');
// const { firebase, db, auth } = require('./firebaseHelpers/firebaseLoginHelper');
// const { getData, getDataWhere, getDataWhereTest } = require('./firebaseHelpers/firestoreDataAccess');

const {
    spawnFood
} = require('../public/js/game_index2');
const conf = require('../public/js/config/game_conf');

// chai.use(chaiAsPromised);

const expect = chai.expect;
const assert = chai.assert;
// chai.should();

describe('test all functions', () => {

    beforeEach(() => {
        // api = axios.create({baseURL: 'http://127.0.0.1:3000'});
    });

    describe('test all functions', () => {
        describe ('test spawn_food function', () => {
            let foodPos;
            it('should never have 0 as x value for food', () => {
                foodPos = spawnFood ();
                expect(foodPos[y]).to.not.equal(0);
            });
            it('should never have width  as x value for food', () => {
                foodPos = spawnFood ();
                expect(foodPos[0]).to.be.below(conf.canvasWidth/conf.boxSize);
            });    
            it('should never have 0 as y value for food', () => {
                foodPos = spawnFood ();
                expect(foodPos[y]).to.not.equal(0);
            });    
            it('should never have height as y value for food', () => {
                foodPos = spawnFood ();
                expect(foodPos[1]).to.be.below(conf.canvasHeight/conf.boxSize);
            });    

        });
    });
});