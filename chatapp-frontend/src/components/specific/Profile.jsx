import React from "react";
import { Avatar, Stack, Typography, Box, Divider } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";
import { motion } from "framer-motion";

const Profile = ({ user }) => {
  return (
    <Stack
      spacing={"2rem"}
      direction={"column"}
      alignItems={"center"}
      sx={{
        height: "100%",
        overflowY: "auto",
        pb: 3,
        background: "linear-gradient(135deg, #f9fafb 0%, #f5f5f7 100%)",
        padding: "2rem 1.5rem",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#667eea",
          borderRadius: "10px",
          "&:hover": {
            background: "#764ba2",
          },
        },
      }}
    >
      {/* Profile Avatar */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <Box
          sx={{
            position: "relative",
            width: 180,
            height: 180,
            borderRadius: "50%",
            padding: "4px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
          }}
        >
          <Avatar
            src={transformImage(user?.avatar?.url)}
            sx={{
              width: 172,
              height: 172,
              objectFit: "cover",
              border: "4px solid #f5f5f7",
            }}
          />
        </Box>
      </motion.div>

      {/* User Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Stack spacing={0.5} alignItems={"center"} sx={{ width: "100%" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
            }}
          >
            {user?.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#999",
              fontSize: "0.85rem",
              textAlign: "center",
            }}
          >
            @{user?.username}
          </Typography>
        </Stack>
      </motion.div>

      <Divider
        sx={{
          width: "80%",
          borderColor: "rgba(102, 126, 234, 0.2)",
        }}
      />

      {/* Profile Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ width: "100%" }}
      >
        <Stack spacing={1.5} alignItems={"center"} sx={{ width: "100%" }}>
          <ProfileCard heading={"Bio"} text={user?.bio} />
          <ProfileCard
            heading={"Username"}
            text={user?.username}
            Icon={<UserNameIcon />}
          />
          <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
          <ProfileCard
            heading={"Joined"}
            text={moment(user?.createdAt).fromNow()}
            Icon={<CalendarIcon />}
          />
        </Stack>
      </motion.div>
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <motion.div
    whileHover={{ x: 4 }}
    transition={{ type: "spring", stiffness: 400 }}
    style={{ width: "100%" }}
  >
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      sx={{
        width: "100%",
        padding: "12px 16px",
        borderRadius: "12px",
        background: "rgba(102, 126, 234, 0.1)",
        border: "1px solid rgba(102, 126, 234, 0.2)",
        transition: "all 0.3s ease",
        cursor: "default",
        "&:hover": {
          background: "rgba(102, 126, 234, 0.15)",
          border: "1px solid rgba(102, 126, 234, 0.4)",
          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.15)",
        },
      }}
    >
      {Icon && (
        <Box
          sx={{
            color: "#667eea",
            display: "flex",
            alignItems: "center",
            fontSize: "1.3rem",
            flexShrink: 0,
          }}
        >
          {Icon}
        </Box>
      )}

      <Stack spacing={0.3} flex={1}>
        <Typography
          variant="body2"
          sx={{
            color: "#1a1a1a",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          {text}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "#667eea",
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          {heading}
        </Typography>
      </Stack>
    </Stack>
  </motion.div>
);

export default Profile;
