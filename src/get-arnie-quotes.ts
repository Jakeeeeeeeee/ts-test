import { httpGet } from './mock-http-interface';

// TODO define this type properly
type TResult = { [key: string]: string }[];
type PromiseResponseType = {
  status: number;
  body: string;
}

export const getArnieQuotes = async (urls: string[]): Promise<TResult> => {
  let resultArray: TResult;
  resultArray = [];

  // To get the http responses on urls
  const p0 = new Promise<PromiseResponseType>(async (resolve, reject) => {
    const r = await httpGet(urls[0]);
    resolve(r)
  })
  const p1 = new Promise<PromiseResponseType>(async (resolve, reject) => {
    const r = await httpGet(urls[1]);
    resolve(r)
  })
  const p2 = new Promise<PromiseResponseType>(async (resolve, reject) => {
    const r = await httpGet(urls[2]);
    resolve(r)
  })
  const p3 = new Promise<PromiseResponseType>(async (resolve, reject) => {
    const r = await httpGet(urls[3]);
    resolve(r)
  })

  let httpResponses = await Promise.all<PromiseResponseType>([p0, p1, p2, p3]);

  // To generate the final results based on each http response
  httpResponses.forEach( res => {
    const { status, body } = res;
    let message = JSON.parse(body).message;

    resultArray.push({
      [status === 200 ? 'Arnie Quote' : 'FAILURE']: message
    });
  })

  return resultArray;
};
