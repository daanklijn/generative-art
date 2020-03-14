from turtle import *


def rewriteSystem(axiom, rules, iterations):
    result = axiom
    for i in range(iterations):
        next_result = ""
        for char in result:
            if char in rules:
                next_result += rules[char]
            else:
                next_result += char
        result = next_result
    return result


def drawTurtle(string, turt, length, angle):
    stack = []
    for char in string:
        if char == "F":
            turt.forward(length)
        elif char == "+":
            turt.right(angle)
        elif char == "-":
            turt.left(angle)
        elif char == "[":
            stack.append((turt.pos(), turt.heading()))
        elif char == "]":
            position, heading = stack.pop()
            turt.penup()
            turt.setpos(position)
            turt.seth(heading)
            turt.pendown()
    turt.done()


axiom = "X"
rules = {"F": "FF", "X": "F+[[X]-X]-F[-FX]+X"}
string = rewriteSystem(axiom, rules, 5)
turt = Turtle()
turt.seth(90)
tracer(50, 0)
drawTurtle(string, turt, 3, 30)
