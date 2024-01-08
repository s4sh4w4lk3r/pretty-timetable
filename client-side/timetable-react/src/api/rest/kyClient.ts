import ky, { Options } from "ky";
import env from "../../../envConfig"


const kyOptions: Options = {
    prefixUrl: env.api.address
}

export default ky.create(kyOptions);