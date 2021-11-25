module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_EXTERN_URL: process.env.NEXT_EXTERN_URL,
    NEXT_INTERN_URL: process.env.NEXT_INTERN_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  }
};
const intercept = require('intercept-stdout');

function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return '';
  }
  return text;
}

if (process.env.NODE_ENV === 'development') {
  intercept(interceptStdout);
}
