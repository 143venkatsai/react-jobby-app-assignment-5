import './index.css'

const Skills = props => {
  const {eachSkill} = props
  const {name, skillImageUrl} = eachSkill

  return (
    <li className="skill-item">
      <img src={skillImageUrl} className="skill-img" alt={name} />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default Skills
