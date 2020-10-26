# Description
In this project we use a simple neural network and let it learn to drive a car.
The agents inputs are the distance to near objects (walls).
The outputs are steering and accelerating of the car.

There are checkpoints the agent can collect, the more the better.
After each round the agent with the most checkpoints get cloned and the neuralnets weights are slightly changed.
After some episodes the agents get better and collect more checkpoints.

# Settings
The settings of the agent can be adjusted, some configurations cant solve the track.
In my experience the track gets solved before episode 50 (if possible).

# Demo
A demo can be found [here](https://js.project-zeta.org/ML-Driver)