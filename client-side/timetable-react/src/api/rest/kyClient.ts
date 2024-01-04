import ky, { Options } from "ky";
import env from "../../../envConfig"


const kyOptions: Options = {
    prefixUrl: env.apiAddress
}

export default ky.create(kyOptions);