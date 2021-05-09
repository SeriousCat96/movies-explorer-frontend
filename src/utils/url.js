export const regex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

export const isURL = (link) => regex.test(link);

export const isRoute = (link) => link.startsWith('/');

export const isCrossDomainLink = (link) => {
  if (isURL(link)) {
    const url = link instanceof URL ? link : new URL(link);
    return url.hostname !== window.location.hostname || url.port !== window.location.port || url.protocol !== window.location.protocol;
  }
}

export const getPathName = (link) => link instanceof URL ? link.pathname : new URL(link).pathname