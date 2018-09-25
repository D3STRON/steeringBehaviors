var species;
var target =[]
var food
function setup()
{
    createCanvas(800,600)
    counter =0
    food = new Food()
    species = new Species(height/2,width/2)
}

function draw()
{   
    counter +=1
    background(0)
    if(counter%100==0)
    {
        food = new Food()
    }
    species.seek(new Vector([food.x,food.y]))
    food.show()
    food.update()
    stroke(255)
    species.show()
    species.update()
}