export default function Description(){
  return (
    <div>
      This grid represents all configurations for the ML-Drivers.<br />
      Hover over cells to see the Drivers configuration. Click to run it in the environment.<br />
      <br />
      Green: Agent solved environment in under 15 episodes.<br />
      Black: Agent didn't solve environment in 15 episodes.<br />
      Grey: Untested configurations.
    </div>
  )
}