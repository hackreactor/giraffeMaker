//ES6 class declaration example

class Giraffe {
  constructor(name, height) {
    this.name = name;
    this.height = height;
    this.hunger = 10;
  }

  isTallEnough(treeHeight) {
    return this.height > treeHeight;
  }

  isHungry() {
    return this.hunger > 0;
  }

  say(option) {
    var sentences = {
      'greet': 'Hello, my name is ' + this.name + ', it is nice to meet you.',
      'notHungry': this.name + ' is not hungry.',
      'notTallEnough': this.name + ' is too short to reach the trees.',
      'ate': 'That was delicious!'
    };

    return console.log(sentences[option]);
  }

  eat() {
    if (this.isHungry()) {
      this.hunger -= this.height;
      this.say('ate');
    } else {
      this.say('notHungry');
    }
  }

  browse() {
    if (this.isTallEnough(2)) {
      this.eat();
    } else {
      this.say('notTallEnough')
    }
  }
}

var Stanley = new Giraffe('stanley', 5);
