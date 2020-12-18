function Node(value = null) {
	this.value = value;
	this.next = null;
}

function LinkedList() {
	this.head = new Node();
	this.length = 0;

	/**
	 * Check if index is within the list
	 * @param {Number} index 
	 */
	this.doesIndexExist = index => index < this.length && index >= 0;

	/**
	 * Check if index is within the list, if not then throw error
	 * @param {Number} index 
	 */
	this.isOutOfBound = index => 	{
		if (!this.doesIndexExist(index)) {
			throw 'OUT OF BOUNDS';
		}
	}

	/**
	 * Remove an item at a specific index in the list
	 * @param {Number} index 
	 */
	this.remove = index => {
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

	}

	/**
	 * Append an item to the list
	 * @param {*} data 
	 */
	this.push = value => {
		let curNode = this.head;
		while (curNode.next) {
			curNode = curNode.next;
		}
		curNode.next = new Node(value);
		this.length++;
	}

	/**
	 * Remove the last item in the list
	 */
	this.pop = () => {
		this.remove(this.length - 1);
	}

	/**
	 * Prepend item to beginning of list
	 */
	this.unshift = value => {
		let firstNode = this.head.next;
		let newFirstNode = new Node(value);

		this.head.next = newFirstNode;
		newFirstNode.next = firstNode;
	}

	/**
	 * Remove the first item in the list
	 */
	this.shift = () => {
		this.remove(0);
	}

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

		this.pop() // remove the old head
	}

	/**
	 * Display all item in list
	 */
	this.display = () => {
		let curNode = this.head;
		while (curNode.next) {
			curNode = curNode.next;
			console.log(curNode.value);
		}
	}
}


let myList = new LinkedList();
myList.push(1);
myList.push(3);
myList.push(5);
myList.push(6);
myList.push(7);
myList.push(125);
myList.unshift(2)
myList.remove(1);
myList.reverse();
myList.display();