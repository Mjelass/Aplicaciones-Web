class Figura {
    #color="#000000"
    constructor(x, y){
        this.x=x;
        this.y=y;
    }

    pintar(){
        console.log("Nos movemos a la posición (["+this.x+"], ["+this.y+"])");
        console.log("Cogemos la pintura de color ["+this.#color+"]");
    }

    esBlanca(){
        return this.#color=="#FFFFFF";
    }
}

class Elipse extends Figura{
    constructor(x, y, rh, rv){
        super(x, y);
        this.rh=rh;
        this.rv=rv;
    }
    pintar(){
        super()
        console.log(`Pintamos elipse de radios [${rh}] y [${rv}]`);
    }
}

class Circulo extends Elipse{
    constructor(x, y, r){
        super(x, y, r, r);
    }
}



