class Species{
    
    constructor(x,y)
    {
        this.location = new Vector([x,y])
        this.accleration = new Vector([0,0])
        this.velocity = new Vector([0,-1])
        this.maxforce = 0.1
        this.rad = 8  
        this.maxspeed = 5
        this.compression = 0.9
        this.slowingRadius = 20
    }

    update()
    {
        this.velocity.add(this.accleration)
        this.velocity.limit(this.maxspeed)
        this.location.add(this.velocity)
        this.accleration.multiply(0)
    }

    seek(target)
    {
         this.steering = Vector.sub(target, this.location)
         var currentDist = this.steering.magnitude()
         this.steering.normalize()
         this.steering.multiply(this.maxspeed)
         if(currentDist<this.slowingRadius)
         {
             this.steering.multiply(currentDist/this.slowingRadius)
         }
         this.steering.sub(this.velocity)
         this.steering.limit(this.maxforce)
         this.accleration.add(this.steering)
    }

    flee(target)
    {
         this.steering = Vector.sub(this.location, target)
         this.steering.normalize()
         this.steering.multiply(this.maxspeed)
         this.steering.sub(this.velocity)
         this.steering.limit(this.maxforce)
         this.accleration.add(this.steering)
    }

    show()
    {
        fill(255)
        var x = this.location.values[0]
        var y = this.location.values[1]
        var Ratio = this.velocity.values[1] / this.velocity.values[0]
        translate(x,y)
        rotate(Math.atan(Ratio))
        if(this.rad*this.compression>this.rad/2 && counter % 10 ==0)
        {
            this.compression-= 0.1
        }
        else if(this.rad*this.compression <= this.rad/2)
        {
            this.compression = 0.9
        }
        ellipse(0, 0, 2*this.rad*this.compression, this.rad*this.compression)
        rotate(-1*Math.atan(Ratio))
        translate(-1*x,-1*y)
    }
}