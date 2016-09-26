'use strict'

function QPS( requestNum ) {
	this.requestNum = requestNum;
	this.counter = 0;
	this.startTime = 0;
	this.endTime = 0;
	this.duration = 0;
}

QPS.prototype.start = function() {
	if (this.startTime === 0) {
		this.startTime = Date.now();
	}
}

QPS.prototype.count = function() {
	++this.counter;

	if (this.counter == this.requestNum) {
		this.endTime = Date.now();
		this.duration = this.endTime - this.startTime;
		console.log(
			`requestNum: ${this.requestNum}\n
			   startTime: ${this.startTime} endTime: ${this.endTime}\n
			   QPS: ${this.requestNum*1000/this.duration}\n
			`);
	}
}

module.exports = QPS;