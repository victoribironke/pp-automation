import Head from "next/head";

const HeadTemplate = () => {
  return (
    <Head>
      <title>Profile picture history</title>
      {/* <link rel="shortcut-icon" href={IMAGES.logo.src} type="image/x-icon" /> */}
      {/* <link rel="icon" href={IMAGES.logo.src} type="image/x-icon" /> */}
      <meta
        name="description"
        content="history of the profile pictures of @victoribironke_ twitter account"
      />
    </Head>
  );
};

export default HeadTemplate;
