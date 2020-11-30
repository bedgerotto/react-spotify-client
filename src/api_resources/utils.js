function generateRandomString(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

function urlHashToObject(hash) {
  return hash.substr(1).split('&').reduce(function (res, item) {
    var parts = item.split('=');
    res[parts[0]] = parts[1];
    return res;
  }, {});
}

function truncateString(str, num) {
  if (str.length <= num) {
    return str
  }

  return (
    <span title={str}>
      {str.slice(0, num) + '...'}
    </span>
  )
}


export { generateRandomString, urlHashToObject, truncateString };
