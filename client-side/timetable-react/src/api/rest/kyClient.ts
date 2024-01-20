import ky, { Options } from "ky";
import env from "../../../env"


const kyOptions: Options = {
    prefixUrl: env.api.restUrl
}

export default ky.create(kyOptions);