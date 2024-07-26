import Container from "@mui/material/Container";
import Header from "../../Header/Header";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { CSSProperties } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <Container maxWidth="sm">
      <Stack spacing={2}>
        <Box style={styles.Header}>
          <Header />
        </Box>
        <>{props.children && props.children}</>
      </Stack>
    </Container>
  );
};

interface LayoutStyles {
  Header: CSSProperties;
}

const styles: LayoutStyles = {
  Header: { position: "sticky" },
};

export default Layout;
