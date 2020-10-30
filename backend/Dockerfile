FROM python:3.7
ENV inDocker=True
ADD . /code
WORKDIR /code
RUN pip install -r requirements.txt
CMD python app.py