import Loader from 'react-loader-spinner'

const LoaderSpinner = () => (
  <div testid="loader">
    <Loader type="TailSpin" color="#007BFF" width={70} height={70} />
  </div>
)

export default LoaderSpinner
