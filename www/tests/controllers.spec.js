

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


      
var calcserv={
 
        infixToPostfix: function(infix) {
            var outputQueue = "";
            var operatorStack = [];
            var operators = {
                "^": {
                    precedence: 4,
                    associativity: "Right"
                },
                "/": {
                    precedence: 3,
                    associativity: "Left"
                },
                "*": {
                    precedence: 3,
                    associativity: "Left"
                },
                "+": {
                    precedence: 2,
                    associativity: "Left"
                },
                "-": {
                    precedence: 2,
                    associativity: "Left"
                }
            }
            infix = infix.replace(/\s+/g, "");
            infix = infix.split(/([\+\-\*\/\^\(\)])/).clean();
            for(var i = 0; i < infix.length; i++) {
                var token = infix[i];
                if(token.isNumeric()) {
                    outputQueue += token + " ";
                } else if("^*/+-".indexOf(token) !== -1) {
                    var o1 = token;
                    var o2 = operatorStack[operatorStack.length - 1];
                    while("^*/+-".indexOf(o2) !== -1 && ((operators[o1].associativity === "Left" && operators[o1].precedence <= operators[o2].precedence) || (operators[o1].associativity === "Right" && operators[o1].precedence < operators[o2].precedence))) {
                        outputQueue += operatorStack.pop() + " ";
                        o2 = operatorStack[operatorStack.length - 1];
                    }
                    operatorStack.push(o1);
                } else if(token === "(") {
                    operatorStack.push(token);
                } else if(token === ")") {
                    while(operatorStack[operatorStack.length - 1] !== "(") {
                        outputQueue += operatorStack.pop() + " ";
                    }
                    operatorStack.pop();
                }
            }
            while(operatorStack.length > 0) {
                outputQueue += operatorStack.pop() + " ";
            }
            return outputQueue;
        },
        
        solvePostfix: function(postfix) {
            var resultStack = [];
            postfix = postfix.split(" ");
            for(var i = 0; i < postfix.length; i++) {
                if(postfix[i].isNumeric()) {
                    resultStack.push(postfix[i]);
                } else {
                    var a = resultStack.pop();
                    var b = resultStack.pop();
                    if(postfix[i] === "+") {
                        resultStack.push(parseInt(a) + parseInt(b));
                    } else if(postfix[i] === "-") {
                        resultStack.push(parseInt(b) - parseInt(a));
                    } else if(postfix[i] === "*") {
                        resultStack.push(parseInt(a) * parseInt(b));
                    } else if(postfix[i] === "/") {
                        resultStack.push(parseInt(b) / parseInt(a));
                    } else if(postfix[i] === "^") {
                        resultStack.push(Math.pow(parseInt(b), parseInt(a)));
                    }
                }
            }
            if(resultStack.length > 1) {
                return "error";
            } else {
                return resultStack.pop();
            }
        }
    
    }


String.prototype.isNumeric = function() {
    return !isNaN(parseFloat(this)) && isFinite(this);
}

Array.prototype.clean = function() {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === "") {
            this.splice(i, 1);
        }
    }
    return this;
}


describe('Addition test',()=>{

  it('show 1 + 0 is 1', () =>{

      var postfix = calcserv.infixToPostfix('1+0');
       
    expect(calcserv.solvePostfix(postfix.trim())).to.equal(1);

  });
    
     it('show 0 + 0 is 1', () =>{

      var postfix = calcserv.infixToPostfix('0+0');
       
    expect(calcserv.solvePostfix(postfix.trim())).to.equal(0);

  });


});


describe('Aubstraction test',()=>{

  it('show 1 - 1 is 0', () =>{

      var postfix = calcserv.infixToPostfix('1-1');
       
    expect(calcserv.solvePostfix(postfix.trim())).to.equal(0);

  });


});

describe('Multiplication test',()=>{

  it('show 3 * 10 is 30', () =>{

      var postfix = calcserv.infixToPostfix('3*10');
       
    expect(calcserv.solvePostfix(postfix.trim())).to.equal(30);

  });

 
});

describe('Division test',()=>{

  it('show 30 / 10 is 3', () =>{

      var postfix = calcserv.infixToPostfix('30/10');
       
    expect(calcserv.solvePostfix(postfix.trim())).to.equal(3);

  });
    
    it('show 30 / 0 is Infinity', () =>{

      var postfix = calcserv.infixToPostfix('30/0');
       
    expect(calcserv.solvePostfix(postfix.trim())).to.equal(Infinity);

  });


});


