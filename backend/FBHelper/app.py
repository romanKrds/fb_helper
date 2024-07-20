from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app, supports_credentials=True)

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    from fb_assistant import bp
    app.register_blueprint(bp)

    return app


app = create_app()