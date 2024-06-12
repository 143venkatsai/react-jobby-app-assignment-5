import './index.css'

const FiltersGroup = props => {
  const renderSalaryRangesList = () => {
    const {salaryRangesList, activeSalaryId, changeSalary} = props

    return salaryRangesList.map(salary => {
      const {salaryRangeId, label} = salary

      return (
        <li key={salaryRangeId} className="salary-item">
          <input
            type="radio"
            id={salaryRangeId}
            className="input-element"
            checked={salaryRangeId === activeSalaryId}
            onChange={() => changeSalary(salaryRangeId)}
          />
          <label className="label" htmlFor={salaryRangeId}>
            {label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRages = () => (
    <>
      <hr className="horizontal-line" />
      <h1 className="salary-heading">Salary Range</h1>
      <ul className="salaries-list">{renderSalaryRangesList()}</ul>
    </>
  )

  const renderEmploymentsList = () => {
    const {employmentTypesList, changeEmployment} = props

    return employmentTypesList.map(employment => {
      const {employmentTypeId, label} = employment

      return (
        <li key={employmentTypeId} className="employment-item">
          <input
            type="checkbox"
            id={employmentTypeId}
            className="input-element"
            onChange={() => changeEmployment(employmentTypeId)}
          />
          <label className="label" htmlFor={employmentTypeId}>
            {label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentTypes = () => (
    <>
      <hr className="horizontal-line" />
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="employments-list">{renderEmploymentsList()}</ul>
    </>
  )

  return (
    <div className="filters-group-container">
      {renderEmploymentTypes()}
      {renderSalaryRages()}
    </div>
  )
}

export default FiltersGroup
