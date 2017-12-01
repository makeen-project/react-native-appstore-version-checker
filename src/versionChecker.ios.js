import result from 'lodash/result';
import {get, parseJson} from './fetcher';

const getAppstoreAppVersion = (identifier, { typeOfId = 'id', country = 'us', entity = null }) => {
  let url = `http://itunes.apple.com/lookup?${typeOfId}=${identifier}&country=${country}`;

  if (entity) {
    url += `&entity=${entity}`;
  }

  return get(url).then(parseJson).then((d) => {
    const version = result(d, 'data.results[0].version');
    if (!version) {
      throw new Error('App not found!');
    }
    return version;
  });
};

module.exports = {
  getAppstoreAppVersion
};
