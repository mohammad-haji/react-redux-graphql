import {DEV_CONFIG} from '../../config/dev';
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: DEV_CONFIG.graphQlBaseUrl
});

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: any) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error: any = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export const request = (url: string, options: any)=> {
  return fetch(DEV_CONFIG.restApiBaseUrl, {...options, ...{headers: {'Content-Type': 'application/json'}}})
    .then(checkStatus)
    .then(parseJSON);
}

export const graphQLQuery = (query: string)=> {
  return client
    .query({
      query: query
    });
};

export const graphQLMutate = (query: string)=> {
  return client
    .mutate({
      mutation: query
    });
};
