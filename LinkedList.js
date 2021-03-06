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
 * @param {Array} userItems items that should be in the array from initialization
 */
function LinkedList(userItems = []) {
  this.head = new Node();
  this.length = 0;

  /**
   * Check if index is within the list
   * @param {Number} index
   * @returns {Boolean} Is the index is in the list
   */
  this.doesIndexExist = (index) => index < this.length && index >= 0;

  /**
   * Check if index is within the list, if not then throw error
   * @param {Number} index
   */
  this.isOutOfBound = (index) => {
    if (!this.doesIndexExist(index)) throw "OUT OF BOUNDS";
  };

  /**
   * Retrieve data from a specific index in the array
   * @param {Number} index
   * @returns {*} The data stored at the given index
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
   * Insert a value at a specific index (will cause other following items to shift by 1)
   * @param {Number} index
   * @param {*} value
   */
  this.insert = (index, value) => {
    this.isOutOfBound(index);

    let curNode = this.head;
    let prevNode = null;
    for (let i = -1; i < index; i++) {
      prevNode = curNode;
      curNode = curNode.next;
    }

    prevNode.next = new Node(value);
    prevNode.next.next = curNode;
    this.length++;
  };

  /**
   * Remove an item at a specific index in the list and return its value
   * @param {Number} index
   * @returns {*} The data previously stored at the specified index
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
    return curNode.value;
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

  // Load parameters
  userItems.forEach((item) => {
    this.push(item);
  });

  // Decorative Functions (Not Necessary for Basic Function)

  /**
   * Remove the last item in the list
   * @returns {*} Last item in the list before it is removed
   */
  this.pop = () => this.remove(this.length - 1);

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
   * @returns {*} First item in the list before it is removed
   */
  this.shift = () => this.remove(0);

  /**
   * Reverse this list
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
   * @returns {LinkedList} the new list with the modified values
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
   * @returns a stringified version of this list
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

  /**
   * Concatenate a new list to the end of this list
   * @param {LinkedList} secondArr
   * @returns this list
   */
  this.concat = (secondArr) => {
    secondArr.forEach((item) => {
      this.push(item);
    });
    return this;
  };

  /**
   * Get an exact copy of the list
   * @returns an exact copy of the list
   */
  this.copy = () => {
    return this.map((item) => item);
  };

  /**
   * Sort the array using quicksort
   * @param {LinkedList} arr the list to be sorted leave empty if you want to sort this list
   * @returns a sorted version of this list
   */
  this.sort = (arr = this.copy()) => {
    if (arr.length <= 1) {
      return arr;
    }
    let pivot = arr.pop();

    let lesser = new LinkedList();
    let greater = new LinkedList();

    arr.forEach((item) => {
      if (item > pivot) {
        greater.push(item);
      } else {
        lesser.push(item);
      }
    });

    return this.sort(lesser).concat([pivot]).concat(this.sort(greater));
  };
}

let myList = new LinkedList([1, 125, 3, 6, 5, 7]);
myList.insert(4, 10);
myList.unshift(2);
console.log(myList.remove(1));
console.log(`${myList}`);
let newList = myList.sort();
console.log(`${newList}`);
