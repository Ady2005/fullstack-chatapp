import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography, Stack, useTheme, useMediaQuery } from "@mui/material";
import { Chat as ChatIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Box
      sx={{
        height: "100%",
        background: "linear-gradient(135deg, #f5f5f7 0%, #ffffff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: "1rem", sm: "2rem" },
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Decorative Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(102, 126, 234, 0.1)",
          blur: "40px",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(118, 75, 162, 0.1)",
          blur: "40px",
        }}
      />

      {/* Main Content */}
      <Stack
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{
          textAlign: "center",
          zIndex: 1,
          maxWidth: 500,
        }}
      >
        {/* Icon */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
        >
          <Box
            sx={{
              width: isMobile ? 80 : 120,
              height: isMobile ? 80 : 120,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
            }}
          >
            <ChatIcon
              sx={{
                fontSize: isMobile ? 50 : 70,
                color: "white",
              }}
            />
          </Box>
        </motion.div>

        {/* Main Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "1.8rem", sm: "2.5rem" },
            mb: 1,
          }}
        >
          Welcome to ChatHub
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body1"
          sx={{
            color: "#666",
            fontSize: { xs: "0.95rem", sm: "1.1rem" },
            lineHeight: 1.6,
            fontWeight: 500,
          }}
        >
          Select a friend or group from the sidebar to start chatting. Your conversations are always private and secure.
        </Typography>

        {/* Secondary Message */}
        <Stack spacing={1} sx={{ mt: 2 }}>
          <Box
            sx={{
              width: "100%",
              height: 1,
              background: "linear-gradient(90deg, transparent, #ddd, transparent)",
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: "#999",
              fontSize: "0.85rem",
              fontStyle: "italic",
            }}
          >
            ✨ Real-time messaging • Rich media support • Group chats
          </Typography>
          <Box
            sx={{
              width: "100%",
              height: 1,
              background: "linear-gradient(90deg, transparent, #ddd, transparent)",
            }}
          />
        </Stack>

        {/* CTA Hint */}
        <Typography
          variant="body2"
          sx={{
            color: "#667eea",
            fontWeight: 600,
            marginTop: 2,
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          👈 Select a chat to begin
        </Typography>
      </Stack>
    </Box>
  );
};

export default AppLayout()(Home);
