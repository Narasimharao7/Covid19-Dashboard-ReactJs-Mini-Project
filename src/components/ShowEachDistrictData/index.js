import './index.css'

const ShowEachDistrictData = props => {
  const {name, value} = props

  return (
    <li className="each-district-item-container">
      <p className="district-value">{value}</p>
      <p className="district-name">{name}</p>
    </li>
  )
}

export default ShowEachDistrictData
