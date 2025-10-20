import turtle, random
t = turtle.Turtle()
turtle.setup(400, 400,0,0)

t.speed(1000)

count=1

def rect(dis):
    for r in range(6):
        t.forward(dis)
        t.right(60)

def f():
    global count
    r=random.random()
    g=random.random()
    b=random.random()
    size=random.randint(1,10)
    dis=random.randint(1,100)
    xpos=random.randint(-200,200)
    ypos=random.randint(-200,200)

    t.penup()
    t.goto(xpos,ypos)
    t.pendown()
    t.pensize(size)
    t.color(r,g,b)

    if count%2==0:
        rect(dis)
        count+=1
    else:
        t.begin_fill()
        rect(dis)
        t.end_fill()
        count+=1

for i in range(60):
    f()