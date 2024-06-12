import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {MdLocationOn, MdMail} from 'react-icons/md'
import {FaExternalLinkAlt} from 'react-icons/fa'

import Header from '../Header'
import Skills from '../Skills'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobsData: [],
    skills: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getFetchedData = data => ({
    companyLogoUrl: data.job_details.company_logo_url,
    companyWebsiteUrl: data.job_details.company_website_url,
    employmentType: data.job_details.employment_type,
    id: data.job_details.id,
    jobDescription: data.job_details.job_description,
    location: data.job_details.location,
    packagePerAnnum: data.job_details.package_per_annum,
    rating: data.job_details.rating,
    title: data.job_details.title,
    description: data.job_details.life_at_company.description,
    imageUrl: data.job_details.life_at_company.image_url,
  })

  renderSkillsList = skill => ({
    name: skill.name,
    skillImageUrl: skill.image_url,
    id: skill.id,
  })

  getFormattedData = job => ({
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    location: job.location,
    rating: job.rating,
    title: job.title,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = this.getFetchedData(data)

      const updatedSimilarJobsData = data.similar_jobs.map(eachProduct =>
        this.getFormattedData(eachProduct),
      )

      const skillsList = data.job_details.skills.map(eachSkill =>
        this.renderSkillsList(eachSkill),
      )
      console.log(data)

      this.setState({
        jobDetails: updatedData,
        skills: skillsList,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobItemView = () => {
    const {jobDetails, skills, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      description,
      imageUrl,
    } = jobDetails

    return (
      <>
        <div className="job-item-success-view">
          <div className="job-item-top-section">
            <img
              src={companyLogoUrl}
              className="job-item-company-logo"
              alt="job details company logo"
            />
            <div className="job-item-heading-section">
              <h1 className="job-item-heading">{title}</h1>
              <div className="job-item-rating-section">
                <img
                  src="https://res.cloudinary.com/djk1yczb2/image/upload/v1717651069/star_image-removebg-preview_vamcly.png"
                  className="job-item-start-img"
                  alt="star"
                />
                <p className="job-item-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-item-middle-section">
            <div className="job-item-location-type-section">
              <div className="job-item-location-section">
                <MdLocationOn className="job-item-location-icon" />
                <p className="job-item-location">{location}</p>
              </div>
              <div className="job-item-type-section">
                <MdMail className="job-item-mail-icon" />
                <p className="job-item-mail">{employmentType}</p>
              </div>
            </div>
            <div className="job-item-salary-section">
              <p className="job-item-salary">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="company-url-section">
            <h1 className="job-description-heading">Description</h1>
            <a href={companyWebsiteUrl} className="visit-link">
              <p className="visit-text">Visit</p>
              <FaExternalLinkAlt className="visit-icon" />
            </a>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="skill-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(eachSkill => (
              <Skills eachSkill={eachSkill} key={eachSkill.id} />
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-section">
            <p className="company-description">{description}</p>
            <img
              src={imageUrl}
              className="company-life-img"
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobsData.map(eachJob => (
            <SimilarJobItem eachJob={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </>
    )
  }

  onClickGetApiButton = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="job-item-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="job-item-failure-img"
        alt="failure view"
      />
      <h1 className="job-item-failure-heading">Oops! Something Went Wrong</h1>
      <p className="job-item-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="job-item-failure-view-btn"
        type="button"
        onClick={this.onClickGetApiButton}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-container">
        <Header />
        <div className="job-item-container">{this.renderJobItemDetails()}</div>
      </div>
    )
  }
}

export default JobItemDetails
