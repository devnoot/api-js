import unfetch from "isomorphic-unfetch";

import { camelCaseKeys } from "./camelCaseKeys";

/**
 * Fetch an HTTP resource.
 *
 * 2022-10-09: At the time of writing, Node.js LTS (16.x)
 * does not yet support fetch. As a result, we pull in
 * isomorphic-unfetch for Node.js compatibility. Our support
 * matrix includes 14.x and 16.x.
 *
 * @FIXME - When Node.js 20.x is released, remove the
 * isomorphic-unfetch dependency. At that point we will have
 * two major LTS versions that include a native fetch API.
 */
export const call = async <
  T extends readonly any[] | Record<string, any>
>(config: {
  url: string;
}) => {
  const rawResponse = await unfetch(config.url);
  const responseJson = (await rawResponse.json()) as T;

  // The RA API unfortunately returns all object keys in
  // PascalCase. We have to convert them.
  return camelCaseKeys(responseJson);
};