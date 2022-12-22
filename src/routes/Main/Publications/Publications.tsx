import { chakra, Heading, Link } from "@chakra-ui/react";

export default () => (
  <>
    <Heading fontFamily="Poppins, sans-serif" size="md">
      Latest High Notes
    </Heading>
    <chakra.object
      data="https://sbhs.co/hnpdf"
      type="application/pdf"
      width="100%"
      height="100%"
      p={8}
    >
      <Link isExternal href="https://sbhs.co/hnpdf">
        Find PDF here
      </Link>
    </chakra.object>
  </>
);
