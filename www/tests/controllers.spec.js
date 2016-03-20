

//import 'script!jquery/dist/jquery';
//import angular from 'angular';
let expect = chai.expect;
/*
describe('Does it works fine?', () => {
    it('2 + 4 is 6', () => {
      expect(2 + 4).to.equal(6);
    });
});
*/
var stacksize=0;
var stack={
  make:function(len){
    stacksize=len;
  },

  isEmpty:function () {
    return true;
    },
  push:function (val) {

    if(stacksize===4)
     throw "overflow exp";
    stacksize++
  },
  pop:function () {
    stacksize--;
    if(stacksize <= -1)
      throw "underflow exp";

  },
  size:function () {
    return stacksize;
  },

  checkNegative:function () {
    if(stacksize <=-1)
      throw "Negative size";

  }
}

describe('Stack', () => {
  it('starts out empty', () => {
    expect(stack.isEmpty()).to.equal(true);
  });
});

beforeEach(()=>{

  stack.make(0);
});

describe('pushing 1 elm', () => {
  it('increament size by 1', () => {

    stack.push(1);
    expect(stack.size()).to.equal(1);
  });
});

describe('pushing and poping one element',()=>{

  it('leave size to 0', () =>{

    stack.push(2);
    stack.pop();
    expect(stack.size()).to.equal(0);

  });


});

describe('Overflow',()=>{

  it('throws overflwo exceptoin', () =>{
    stack.push(2);
    stack.push(2);
    stack.push(2);
    stack.push(2);
    expect(stack.push).to.throw('overflow exp');

  });


});

describe('Underflow',()=>{

  it('throws underflow exceptoin', () =>{
    stack.push(2);
    stack.push(2);
    stack.pop();

    stack.pop();
    expect(stack.pop).to.throw('underflow exp');

  });


});

describe('push 1,2 pop 2,1',()=>{

  it('push 1,2 pop 2,1 leaves empty stack', () =>{
    stack.push(1);
    stack.push(2);
    stack.pop();
    stack.pop();
    expect(stack.size()).to.equal(0);

  });


});

describe('checkNegative',()=>{

  it('is size Negative ?', () =>{
    stack.make(-3);
    expect(stack.checkNegative).to.throw('Negative size');

  });


});


/*describe('Controllers', function(){
    var scope;
  
    // load the controller's module
    beforeEach(angular.module('calci', ['ionic']));

    beforeEach(inject(function($rootScope, $controller) {
        console.log("es")
        scope = $rootScope.$new();
        $controller('CalcCtrl', {$scope: scope});
    }));

    // tests start here
    it('should have enabled friends to be true', function(){
        
        expect(scope.settings.enableFriends).toEqual(true);
    });
});*/