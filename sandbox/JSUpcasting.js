class A{
    constructor(a){
        this.a = a;
    }
}

class B extends A{
    constructor(a, b){
        super(a)
        this.b = b;
    }
}

let a = new A(3); //{a: 3}
let b = new B(4, 5); //{a: 4, b: 5}

//let upcastB = upcast b to type A  //upcastB = {a: 4}


console.log("end");