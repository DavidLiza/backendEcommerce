const CODES = require('../utils/codes')
const config = require('../config/config.json')[process.env.NODE_ENV || 'development']
const { requestCallRest } = require('../utils/requestCall')
const { isError } = require('../utils/utils') // call util function if needed

const baseCRUD = require('../database/functions/userOperations')

async function servTest(req) {
  try {
    const { example1 } = req.body
    const base = await baseCRUD.getBase({ example1 })
    if (isError(base) && typeof error.errmsg === 'string' && error.errmsg.includes('E11000 duplicate key')) {
      throw new Error(
        {
          ...CODES.KEC005, // unique error
          error: 'duplicate key: ' + error.errmsg.substring(error.errmsg.search('{ ') + 2, error.errmsg.search(': "'))
        },
        401
      )
    }
    if (base.length === 0) {
      throw new Error(CODES.KEC006, 405)
    }
    //bussiness logic

    //rest request
    // response = await requestCallRest(config.service.url, config.service.endpoint, config.service.method, example1)

    // xml request
    // const modifiedXML = `
    // 			<tem:param1>` + param1Var + `</tem:param1>
    // 			<tem:param2>` + param2Var + `</tem:param2>
    // 			<tem:param3>` + param3Var + </tem:param3>;
    // //change basicXML content to get the complete xml
    // const soapRequest = basicXML.replace("BODY_CONTENT_PLACEHOLDER", modifiedXML);
    // const sendRequest = await services.sendSoapRequest(soapRequest, [[method]], [[url]])
    // //parse the answer as a JSON
    // let parsedData = await parseXmlString(sendRequest.body);
    // if (sendRequest.statusCode === 500) {
    // 		console.log(parsedData)
    // 		return { ...codes.CCOMWS003, error: "Server returned error", status: 200 }
    // }
    // //if data has CDATA
    // const basicHeaderResponse = parsedData['soap:Envelope']['soap:Body'][0]['[[CDATA_Location]]'][0]
    // //parse CDATA to JSON
    // let parseResult = await parseXmlCDATAString(basicHeaderResponse);
    // let response = {};
    // response = parseResult;

    return { ...CODES.KEC001, message: {} }
  } catch (error) {
    if (['axiosError'].includes(error.name)) {
      // this is only an example
      throw new Error(
        {
          ...CODES.KEC004, // unique error
          error: err.message === undefined ? err : err.message
        },
        403
      )
    }
    console.error(error.message === undefined ? error : error.message)
    throw new Error(CODES.KEC000, 500)
  }
}

// ***** LOCAL NEEDED FUNCTIONS ******

// async function parseXmlString(xmlString) {
// 	try {
// 			const result = await xml2js.parseStringPromise(xmlString);
// 			return result;
// 	} catch (err) {
// 			throw err;
// 	}
// }

// async function parseXmlCDATAString(xmlString) {
// 	try {
// 			const result = await xml2js.parseStringPromise(xmlString, { explicitArray: false, explicitRoot: false, mergeAttrs: true });
// 			return result;
// 	} catch (err) {
// 			throw err;
// 	}
// }

module.exports = { servTest }
