import ClearSvgIcon from './weather-svg/animated/Clear'
import Cloudy from './weather-svg/animated/Cloudy'
import RainHeavy from './weather-svg/animated/RainHeavy'
import RainModerate from './weather-svg/animated/RainModerate'
import RainSlight from './weather-svg/animated/DrizzleSlight'
import Showers from './weather-svg/animated/Showers'
import SnowySvgIcon from './weather-svg/animated/Snowy'
import DrizzleSlight from './weather-svg/animated/DrizzleSlight'
import DrizzleModerate from './weather-svg/animated/DrizzleModerate'

export default function IconSwitcher(props: { weatherCode: number }) {
  const { weatherCode } = props

  switch (weatherCode) {
    case 0:
      return <ClearSvgIcon />
    case 1:
    case 2:
    case 3:
    case 45:
    case 48:
      return <Cloudy />
    case 51:
      return <DrizzleSlight />
    case 53:
    case 55:
      return <DrizzleModerate />
    case 56:
    case 57:
      return <SnowySvgIcon />
    case 61:
      return <RainSlight />
    case 63:
      return <RainModerate />
    case 65:
      return <RainHeavy />
    case 66:
    case 67:
      return <SnowySvgIcon />
    case 71:
    case 73:
    case 75:
    case 77:
      return <SnowySvgIcon />
    case 80:
    case 81:
    case 82:
      return <Showers />
    case 85:
    case 86:
      return <SnowySvgIcon />
    default:
      return <ClearSvgIcon />
  }
}
