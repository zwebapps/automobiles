import Script from "next/script";
export default function  Head() {
  return (
    <head>
      <meta charSet="UTF-8" />
      <link rel="icon" href="/favicon.svg" sizes="any"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="description" content="majesticjourney in europe" />
      <meta name="google" content="nositelinkssearchbox" />
      <meta name="author" content="majesticjourney" />
      <title>Auto Mobiles</title>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.4.1/css/all.css"
        integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossOrigin="anonymous"
      />
      {/* Load jQuery */}
      <Script
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        crossOrigin="anonymous"
        strategy="beforeInteractive"
      />

      {/* Load Popper.js */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />

      {/* Load Bootstrap */}
      <Script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
          <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
    </head>
  );
};
