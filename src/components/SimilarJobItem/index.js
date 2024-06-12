import {MdLocationOn, MdMail} from 'react-icons/md'

import './index.css'

const SimilarJobItem = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = eachJob

  return (
    <div className="similar-job-item">
      <div className="similar-job-top-section">
        <img
          src={companyLogoUrl}
          className="similar-job-logo"
          alt="similar job company logo"
        />
        <div className="similar-title-section">
          <h1 className="similar-job-heading">{title}</h1>
          <div className="similar-rating-section">
            <img
              src="https://res.cloudinary.com/djk1yczb2/image/upload/v1717651069/star_image-removebg-preview_vamcly.png"
              className="similar-star"
              alt="star"
            />
            <p className="similar-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-description-heading">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="similar-job-location-type-section">
        <div className="location-section">
          <MdLocationOn className="similar-job-location-icon" />
          <p className="similar-job-location">{location}</p>
        </div>
        <div className="similar-job-type-section">
          <MdMail className="similar-job-icon" />
          <p className="similar-job-type">{employmentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobItem
