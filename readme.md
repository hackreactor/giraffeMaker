# giraffeMaker

Welcome to giraffeMaker, a repo which explores different methods of constructing new Objects in JavaScript. In this sprint you'll cover:

- Maker Functions
- Sharing of methods
- Prototypal Inheritence
- Pseudo-Classical Inheritence


## The Story

`giraffeMaker` is a function that must allow the user to create a new giraffe Object, taking two arguments, the name and height of the giraffe to be created.

Each giraffe should have three properties:

- The name of the giraffe
- The height of the giraffe (meters)
- How hungry the giraffe is (arbitrary value)

Giraffes have a special set of methods which should only be accessible by them:

- Eat() - Reduces hunger depending on how tall the giraffe is. Prints that the giraffe is no longer hungry if the hunger value hits zero. Note that the trees in this plain sit at 2 meters, so the giraffe has to have a height of at least 2 meters to reach the trees.
- Say('greet') - The giraffe introduces him/herself. 

This repo contains code which presents a working representation of this Giraffe class using various methods of constructing Class Objects in JavaScript.

When you are finished you should be able to do the following:

```javascript
var Stanley = giraffeMaker('Stanley', 3);

console.log(Stanley.name)            // 'Stanley'
console.log(Stanley.height)          // 3
console.log(Stanley.hunger)          // 10
console.log(Stanley.eat())           // 'ate'
console.log(Stanley.say('hello'))    // 'hello'
```

## The Code Structure

In the repo you will find many examples of code which will have the same functionality. However the methods of instantiating Classes and creating new Objects will be different in each piece of code. All the giraffe makers will need to create new objects, assign the `name` and `height` properties of each giraffe, and share the two communal methods, `eat` and `greet`. There are seven different versions of the giraffeMaker, each with slightly different methods of Class instantiation.

### giraffeMaker();

```javascript
var giraffeMaker = function(name, height) {
    var giraffe = {};
    giraffe.name = name;
    giraffe.height = height;
    giraffe.hunger = 10;

    return giraffe;
};
```
    
This piece of code creates a new object and sets properties upon it, then returning the created object. The communal methods have not yet been shared.

### isTallEnough();

```javascript
    isTallEnough = function(treeHeight) {
        return this.height > treeHeight;
     };
```
This helper function observes the giraffe's `height` and compares it to the `height` of the trees in the world. It returns the boolean value from the check.

### isHungry();

```javascript
    isHungry = function() {
        return this.hunger > 0;
     };
```
This helper function observes whether the giraffe's hunger is greater than 0 and returns the boolean value.


### say();

```javascript
var say = function(option) {
    var sentences = {
      'greet': 'Hello, my name is ' + newGiraffe.name + ', it is nice to meet you.',
      'notHungry': newGiraffe.name + ' is not hungry.',
      'notTallEnough': newGiraffe.name + ' is too short to reach the trees.',
      'ate': 'That was delicious!'
    };

    return console.log(sentences[option]);
 };
```

This is the `say` function, a helper for the giraffe's dialogue. Rather than litter the code with `console.log`s, we map all possible strings to an option key. The function returns the string which is mapped to the option passed at calltime.
    
### eat();

```javascript
var eat = function() {
    if (this.isHungry()) {
      this.hunger -= this.height;
      this.say('ate');
    } else {
      this.say('notHungry');
    }
};
```

This is the `eat` function. First it checks a couple of properties on the giraffe that it has been called in context to. If the `height` of this giraffe is less than 2 it logs that the giraffe is too short to reach the trees. Otherwise if the giraffe is hungry then it reduces the `hunger` of the giraffe by how tall the giraffe is (taller giraffes have a better ability to `browse` food). 

Note that this function uses the previously defined helper function `say()` and `isHungry()`, to check whether the giraffe is hungry and log different choices in dialogue with a clean interface.

### browse();
```javascript
var browse = function() {
    if (this.isTallEnough(2)) {
      this.eat();
    } else {
      this.say('notTallEnough')
    }
  };
```

This function simulates the giraffe browsing the trees. If the giraffe is tall enough it will `eat`, otherwise it will `say` it isn't tall enough. Again, note the use of previously defined helper functions allowing this piece of the code to be more readable.

## The Journey

### The Maker Function
The first step will be creating some sort of maker function. 

```javascript
var theMaker = function(value) {
    var theThingToBeMade = {};
    theThingToBeMade.ownValue = value;
    theThingToBeMade.shout = function() {
        console.log("I have my own Value! Let it be known as " + theThingToBeMade.ownValue + "!");
    };

    return theThingToBeMade;
};
```

This function allows the user to create a thing. This thing will have its own value which is taken from the argument that is passed into the function. Each thing also has its own method which logs its value in a message to the console.

A maker function like this creates a new object and assigns a set of properties and methods to the object each time it is run. At the end of the function it returns this new object, allowing you to assign a variable to the created object.

The function allows you to create instances of these "things", each one could be considered a thing, yet each has its own value.

```javascript
    var myThing = theMaker(10);
    var stringThing = theMaker('a string');
    var booleanThing = theMaker(true);
    
    myThing.shout(); // evaluates to "I have my own Value! Let it be known as 10!"
    stringThing.shout(); // "I have my own Value! Let it be known as a string!"
    booleanThing.shout(); // "I have my own Value! Let it be known as true!"
```
    
### Sharing functionality

#### What is a class?
You can think about a Class as a mechanism which allows you to create objects which share properties and functionality that is somewhat unique to them. A Class construct should allow you to create instances of itself, the previous code in the maker function could be considered somewhat like a class as each thing created shared the property of having its own value, and a method which could announce its value. 

>You can create instances of a Class which share properties and methods.

#### Shared functions - step 1
The code in the previous maker function creates a new method `shout()` for each thing that it creates, attaching this new function to each instance. What are we really trying to do here? Do we want each thing to have a new method of its own? Wouldn't it be cool if they could just share one function which they can inherit on account of being a "thing"?

```javascript
var theMaker = function(value) { 
    var theThingToBeMade = {};
    theThingToBeMade.ownValue = value;
    theThingToBeMade.shout = shout;

    return theThingToBeMade;
};

var shout = function() {
    console.log("I have my own Value! Let it be known as " + this.ownValue + "!");
};
```

In this snippet of code, we take the `shout` functionality out of the maker function, and share it across each instance of "thing". We did this by assigning a property on each "thing", which points to the `shout` variable. Now any time you try to run `shout()` on a "thing", it will find `var shout` in the global scope, and run that code.

#### Why do we need the keyword `this`?
If we move the functionality outside of the maker function, we lose our previous way of referring to the created object, which was something like this.

```javascript
    var maker = function(value) {
        theThingToBeMade = {};
        theThingToBeMade.ownValue = value;
        //This assigns a property ownValue to the object. We can refer to it within the two brackets that wrap the maker             function.
        theThingToBeMade.shout = function(){
            console.log(theThingToBeMade.ownValue)
        };

        return theThingToBeMade;
    };

    var newThing = maker('I am a thing!');
    var thatOtherThing = maker('I might not be the thing you wanted.');

    newThing.ownValue; // evaluates to "I am a thing!"
    newThing.shout();  // "I might not be the thing you wanted."
```

Did calling `newThing.shout()` have the same effect as you expected it to? If not let's step through what happens in this code:

##### The maker function
- creates a new object
- sets its `ownValue` property to the value passed into the function
- sets a property which points to the `shout` variable in the global scope
- finally, it returns this new object

##### The `shout` function
- logs the `ownValue` property of the "ThingToBeMade"
- the property refers to the `ownValue` of the last object created

At `newthing.shout()`'s calltime, the `ownValue` property of the object "theThingToBeMade" belonged to "thatOtherThing". So even though we called the function in the context of `newThing`, it referred to the property of something else. We need some mechanic which allows us to refer to the correct instance of the class, and the keyword `this` will be that mechanic.

#### How does the keyword `this` work?

When asking about how the keyword `this` works you will usually find one of two answers:

1. It refers to what is to the left of the dot at calltime.
2. It's magical.

```javascript
    shout = function() {
        console.log(this.ownValue);
    };
```
    
When you run `newThing.shout()`, `this` refers to `newThing`, as `newThing` is to the left of the dot at calltime.

JavaScript would interpret this instance of the function call like:
```javascript
shout = function() {
    console.log(newThing.ownValue);
};
```
            
When you run `thatOtherThing.shout()`, this refers to `thatOtherThing`.

```javascript
thatOtherThing.shout(); // "I might not be the thing you wanted."
newThing.shout();       // "I am a thing!"
```
    
Using the keyword `this` allows us to refer to the particular instance of the class that we intend to refer to within the shared function. 

### Sharing functions using `extend()` - step 2

```javascript
var extend = function(copyTo, copyFrom) {
    for (var property in copyFrom) {
        copyTo[property] = copyFrom[property];
    }
};
```
    
The `extend` function copies every property from one object onto another. This will save you from having to declare each property on the maker function. It will not make a lot of difference in our examples, but imagine if you had 10 or 20 different properties to copy.

### Prototypal Inheritence

The `prototype` property on JavaScript objects allows you to share methods and properties among class members. How this works more precisely is that once you set up a prototype chain, or delegate to a prototype, any failed lookup on an object will be delegated to its prototype which will be checked for what was looked up on the object. The idea of using a prototype is to have any shared properties or methods on the prototype, allowing all class members to use them. The only property that should stay in the maker function would be one that changes or has a specific value for each instance.

```javascript
var maker = function(value) {
    var thingToBeMade = Object.create(maker.stuffAllThingsShouldHave);
    thingToBeMade.ownValue = value;

    return thingToBeMade;
};

maker.stuffAllThingsShouldHave = {};
maker.stuffAllThingsShouldHave.shout = function() {console.log(this.ownValue);};

var newThing = maker(4);
newThing.shout(); // "4"
```
    
`Object.create` not only creates the new object for us, but also sets up delegation to the prototype that is passed into it. This allows us to create and setup a chain in one line. The prototype in this example is `maker.stuffAllThingsShouldHave` and looks something like this:

```javascript

    maker.stuffAllThingsShouldHave = {
        shout: function() {console.log(this.ownValue);}
    };
```

#### What is a failed lookup?
When we call `shout()` in the context of `newThing`, the interpreter first looks for a `shout` method in `newThing`, this results in a failed lookup. Since we have delegated `newThing` a prototype, it then looks for a `shout` method in `stuffAllThingShouldHave`, it finds that method, and runs it.

If we did not set up any prototype delegation, the default delegation is to `window.Object`. In the same vein, `stuffAllThingsShouldHave` delegates to `window.Object`, which completes the prototype chain.

#### Cool things about having a prototype
There are a couple of advantages to using prototypal inheritence.

- You do not have to store a function on each instance of the Class.
- You can add new methods or properties to the Prototype and they will immediately take effect on all members of the Class.

Where if you were to extend properties from one object to another, if you then wanted to add on a bunch of new methods to the class, they would not be immediately accessible to previously created class members. However with prototypal inheritence, since all failed lookups are searched for on the prototype object at runtime, a new property added after the creation of a certain class instance can be accessed by that instance.

### Pseudo-Classical Inheritence
There is another syntax to setup inheritence in JavaScript called Pseudo-Classical. It is basically another way of creating objects and delegating prototype chains, using the keyword 'new' and 'Prototype'.

#### What happens when I use keyword `new`?

The function following `new`, is run in "constructor mode." The following rules apply:
1. Creates a new obj
2. Sets up prototype delegation
3. Binds `this` to the new object
4. Returns the new object

You would use `new` when creating another instance of the class. When creating objects using Pseudo-Classical we need to use a maker function which has more specific rules.

```javascript
    var Thing = function(value) {
        this.ownValue = value;
    };
    
    Thing.prototype.shout = function() {console.log(this.ownValue);};
    
    var newThing = new Thing(1);
    var otherThing = new Thing(100);
```
    
The maker function we use in Pseudo-Classical does not need to create or return an object explicitly or setup any delegation, as the keyword `new` does the work for us. This allows us to produce very concise maker functions.

Here is how the interpreter sees the same function as it is run in "constructor mode":

```javascript
    var Thing = function(value) {
        var newThing = Object.create(Thing.prototype);
        this = newThing;
        this.ownValue = value;

        return this;
    };
    
    var newThing = new Thing(10);
```

Functions are only run in "constructor mode" when you invoke the keyword `new`. It is dangerous to create a constructor function intended for use in Pseudoclassical style and run it without using the keyword `new`. Let's examine what would happen if I were to run it using a prototypal syntax.

```javascript
    var protoThing = Thing(10);
    
    protoThing = function(10) {
        this.ownValue = 10;
    };
```

This type of constructor just makes *no sense* when you run it without using the keyword new. The maker function which previously created an object, put properties onto it and returned it and now does none of those things. This is one of the dangers of using a Pseudo Classical constructor, and I always name these functions as the classname with a capital letter, which is a widely accepted convention, to avoid confusion.
