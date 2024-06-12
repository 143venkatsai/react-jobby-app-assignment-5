import {MdLocationOn, MdMail} from 'react-icons/md'

import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`} className="link-details">
        <div className="job-logo-section">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
          />
          <div className="company-name-section">
            <h1 className="title">{title}</h1>
            <div className="rating-section">
              <img
                src="https://res.cloudinary.com/djk1yczb2/image/upload/v1717651069/star_image-removebg-preview_vamcly.png"
                className="star"
                alt="star"
              />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-middle-section">
          <div className="location-type-section">
            <div className="location-section">
              <MdLocationOn className="location-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="job-type-section">
              <MdMail className="job-icon" />
              <p className="job-type">{employmentType}</p>
            </div>
          </div>
          <div className="package-section">
            <p className="package">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="description-section">
          <h1 className="description-heading">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
