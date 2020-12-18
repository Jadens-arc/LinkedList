function Node(value=null) {
	this.value = value;
	this.next = null;
}

function LinkedList() {
	this.head = new Node();
	this.length = 0;


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

myList.display();


