/**
 * A single node meant to be used in a linked list
 * @param {*} value
 */
function Node(value = null) {
  this.value = value;
  this.next = null;
}

/**
 * Linearly store related data that can be easily used with specialized functions
 */
function LinkedList() {
  this.head = new Node();
  this.length = 0;

  /**
   * Check if index is within the list
   * @param {Number} index
   */
  this.doesIndexExist = (index) => index < this.length && index >= 0;

  /**
   * Check if index is within the list, if not then throw error
   * @param {Number} index
   */
  this.isOutOfBound = (index) => {
    if (!this.doesIndexExist(index)) {
      throw "OUT OF BOUNDS";
    }
  };

  /**
   * Retrieve data from a specific index in the array
   * @param {Number} index
   */
  this.get = (index) => {
    this.isOutOfBound(index);
    let curNode = this.head;
    for (let curIndex = -1; curIndex != index; curIndex++) {
      curNode = curNode.next;
    }
    return curNode.value;
  };

  /**
   * Set a the value of a specific index to a specified value
   * @param {Number} index
   * @param {*} value
   */
  this.set = (index, value) => {
    this.isOutOfBound(index);
    let curNode = this.head;
    for (let curIndex = -1; curIndex != index; curIndex++) {
      curNode = curNode.next;
    }
    curNode.value = value;
  };

  /**
   * Remove an item at a specific index in the list
   * @param {Number} index
   */
  this.remove = (index) => {
    this.isOutOfBound(index);

    let prevNode = null;
    let curNode = this.head;
    let curIndex = -1;

    while (curIndex != index) {
      prevNode = curNode;
      curNode = curNode.next;
      curIndex++;
    }

    prevNode.next = curNode.next;
    this.length--;
  };

  /**
   * Append an item to the list
   * @param {*} data
   */
  this.push = (value) => {
    let curNode = this.head;
    while (curNode.next) {
      curNode = curNode.next;
    }
    curNode.next = new Node(value);
    this.length++;
  };

  /**
   * Remove the last item in the list
   */
  this.pop = () => {
    let workingNode = this.get(this.length - 1);
    this.remove(this.length - 1);
    return workingNode;
  };

  /**
   * Prepend item to beginning of list
   */
  this.unshift = (value) => {
    let firstNode = this.head.next;
    let newFirstNode = new Node(value);

    this.head.next = newFirstNode;
    newFirstNode.next = firstNode;
    this.length++;
  };

  /**
   * Remove the first item in the list
   */
  this.shift = () => {
    this.remove(0);
  };

  /**
   * Reverse the list
   */
  this.reverse = () => {
    this.push(null); // the new head

    let prevNode = null; //keep track of the previous node which the current node will later point to
    let curNode = this.head;

    // iterate through every node in the list
    while (curNode) {
      let nextNode = curNode.next; // store the next node to be advanced to
      curNode.next = prevNode; // make the current node point to the previous node

      prevNode = curNode; // then set the previous node variable to the current node so that we can point back to it later
      curNode = nextNode; // then advance the current node to the next node which was stored earlier
    }

    this.head = prevNode; // set the head to point to the previous node completing the reversal

    this.pop(); // remove the old head
  };

  /**
   * Display all item in list
   */
  this.display = () => {
    let curNode = this.head;
    while (curNode.next) {
      curNode = curNode.next;
      console.log(curNode.value);
    }
  };

  /**
   * Call a function on each item in your list
   * @param {Function} callback
   */
  this.forEach = (callback) => {
    let curNode = this.head;
    while (curNode.next) {
      curNode = curNode.next;
      callback(curNode.value);
    }
  };

  /**
   * Call a function on each element in the list and get a new list containing all the modified values
   * @param {Function} callback
   * @return {LinkedList} the new list with the modified values
   */
  this.map = (callback) => {
    let curNode = this.head;
    let newList = new LinkedList();

    while (curNode.next) {
      curNode = curNode.next;
      newList.push(callback(curNode.value));
    }

    return newList;
  };

  /**
   * Handle printing list as a string
   */
  this.toString = () => {
    let string = "[";
    let curNode = this.head;

    while (curNode.next) {
      curNode = curNode.next;
      string += curNode.value;
      if (curNode.next) {
        string += ", ";
      }
    }

    string += "]";
    return string;
  };
}

let myList = new LinkedList();
myList.push(1);
myList.push(3);
myList.push(5);
myList.push(6);
myList.push(7);
myList.push(125);
myList.unshift(2);
myList.remove(1);
console.log(`${myList}`);
myList.reverse();
console.log(myList.pop());
let newList = myList.map((item) => {
  return item * item;
});
newList.set(1, "jaden");
console.log(newList.get(1));
console.log(`${newList}`);
console.log(newList.pop());
