# Description
In this project we use a simple neural network and let it learn to drive a car.

The agents inputs are the distance to near objects (walls).

The outputs control the steering and accelerating of the car.

Progressing trough the track the agent collects checkpoints.

After each round the agent with the most checkpoints get cloned and the networks weights are slightly changed.

# Settings
The settings of the agent can be adjusted, some configurations cant solve the track.

In my experience the track gets solved before episode 50 (if possible).

# Demo
A demo can be found [here](https://js.project-zeta.org/ML-Driver)