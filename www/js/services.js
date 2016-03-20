  

app.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});

app.factory("$calculatorFactory", function() {
 
    return {
 
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
 
});
