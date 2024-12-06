from flask import Flask, render_template


app = Flask(__name__)

@app.route("/pacman")
def pacman():
    return render_template("pacman.html")

@app.route("/memory")
def memory():
    return render_template("memory.html")

@app.route("/InProgress")
def InProgress():
    return render_template("InProgress.html")


@app.route("/")
def start():
    return render_template("index.html")

@app.route("/homepage")
def homepage():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=False)
