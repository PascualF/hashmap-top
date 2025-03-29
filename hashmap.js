class HashMap{
    constructor(loadFactor = 0.75, capacity = 16){
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.buckets = new Array(capacity);
        this.size = 0;
        this.keyArray = [];
        this.pairArray = [];
    }

    hash(key){

        

        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++){
            hashCode = (primeNumber + hashCode * key.charCodeAt(i)) % this.capacity;
        }

        return hashCode
    }

    resize(){
        this.capacity *= 2
        let newBuckets = new Array(this.capacity)

        // Rehashing existing value
        this.pairArray.forEach(([key, value]) => {
            const newIndex = this.hash(key); // Compute new index,
            newBuckets[newIndex] = value; // Moving the values to the new bucket
        })

        this.buckets = newBuckets
    }

    set(key, value){

        this.pairArray.push([key, value])

        if(((this.size + 1) / this.capacity) > this.loadFactor) {
            this.resize() // Resize the bucket if needed
        } 

        if(!this.keyArray.includes(key)){
            this.keyArray.push(key)
        }

        const index = this.hash(key)
        /*  if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        } */
        this.size++
        this.buckets[index] = value;
    }

    get(key){
        const index = this.hash(key);
        if(!this.buckets[index]){
            return null
        } else{
            return this.buckets[index];
        }   
    }

    has(key){
        const index = this.hash(key)
        if(index in this.buckets){
            return true
        } else {
            return false
        }
    }

    remove(key){

        // Remove key 
        const indexRemove = this.keyArray.indexOf(key)
        if (indexRemove !== -1) {
            this.keyArray.splice(indexRemove, 1)
        }

        // Remove from pairArray
        this.pairArray = this.pairArray.filter(([k, _]) => k !== key);

        const index = this.hash(key)
        if(this.buckets[index] !== undefined) {
            delete this.buckets[index]
            this.size--
            return true
        } 
        return false
    }

    getSize(){
        return this.size
    }

    clearTable(){
        this.size = 0;
        this.buckets = newArray(this.capacity);
        this.pairArray = []
        this.keyArray = []
    }

    keys(){
        if(this.keyArray.length === 0){
            return null
        } else {
            return this.keyArray
        }
    }

    values(){
        let valuesArray = [];
        this.buckets.forEach((bucket) => {
            if (bucket != undefined) valuesArray.push(bucket)
        })

        return valuesArray
    }

    entries(){
        return this.pairArray
    }

}

const myTable = new HashMap();
myTable.set('apple', 'red')
myTable.set('banana', 'yellow')
myTable.set('carrot', 'orange')
myTable.set('dog', 'brown')
myTable.set('elephant', 'gray')
myTable.set('frog', 'green')
myTable.set('grape', 'purple')
myTable.set('hat', 'black')
myTable.set('ice cream', 'white')
myTable.set('jacket', 'blue')
myTable.set('kite', 'pink')
myTable.set('lion', 'golden')

//console.log(myTable.remove('apple'))
//myTable.clearTable()
console.log(myTable.get('apple'))
console.log(myTable.has('apple'))
console.log(myTable.getSize())
console.log('Keys just below')
console.log(myTable.keys())
console.log('Values just below')
console.log(myTable.values())
console.log('Pairkey value entries')
console.log(myTable.entries())