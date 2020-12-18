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
myList.remove(-1);
myList.display();