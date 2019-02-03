export default () => {
  return {
    headers: {
      Authorization: ``,
      'Content-Type': 'application/json',
      XClient: window.location.hostname + (window.location.port ? `:${window.location.port}` : ''),
    },
  };
};