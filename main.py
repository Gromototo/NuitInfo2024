from flask import Flask, render_template


app = Flask(__name__)

@app.route("/credits")
def credits():
    return render_template("credits.html")

@app.route("/game")
def game():
    return render_template("game.html")

@app.route("/mareenoire")
def mareenoire():
    return render_template("mareenoire.html")

@app.route("/clicker")
def clicker():
    return render_template("clicker.html")

@app.route("/protege")
def protege():
    return render_template("protege.html")

@app.route("/")
def start():
    return render_template("index.html")

@app.route("/homepage")
def homepage():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=False)
