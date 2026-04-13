import React, { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Box, Stack, Typography, Badge, Tooltip } from "@mui/material";
import { Group as GroupIcon } from "@mui/icons-material";
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{
        padding: "0",
        textDecoration: "none",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <motion.div
        initial={{ opacity: 0, x: "-20px" }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.05 * index }}
        style={{
          display: "grid",
          // CHANGED: auto (avatar), 1fr (text takes remaining space), auto (badge)
          gridTemplateColumns: "auto 1fr auto", 
          gap: "0.75rem",
          alignItems: "center",
          padding: "12px 16px",
          margin: "6px 10px",
          borderRadius: "12px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          position: "relative",
          background: sameSender
            ? "rgba(102, 126, 234, 0.15)"
            : "transparent",
          boxShadow: sameSender
            ? "inset 0 0 8px rgba(102, 126, 234, 0.1)"
            : "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = sameSender
            ? "rgba(102, 126, 234, 0.2)"
            : "rgba(102, 126, 234, 0.08)";
          e.currentTarget.style.transform = "translateX(4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = sameSender
            ? "rgba(102, 126, 234, 0.15)"
            : "transparent";
          e.currentTarget.style.transform = "translateX(0)";
        }}
      >
        {/* 1. Avatar with Online Badge - Moved to Left Side */}
        <Box sx={{ position: "relative" }}>
          <Badge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
            invisible={!isOnline}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#31a24c",
                color: "#31a24c",
                boxShadow: "0 0 0 2px white",
                height: "12px",
                minWidth: "12px",
                borderRadius: "50%",
              },
            }}
          >
            <AvatarCard avatar={avatar} />
          </Badge>
        </Box>

        {/* 2. Chat Info - Moved to Middle */}
        <Stack spacing={0.2} minWidth={0}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "0.95rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "text.primary" // Added to ensure text is visible against background
              }}
            >
              {name}
            </Typography>
            {groupChat && (
              <Tooltip title="Group Chat">
                <GroupIcon
                  sx={{
                    fontSize: "0.85rem",
                    opacity: 0.7,
                    flexShrink: 0,
                  }}
                />
              </Tooltip>
            )}
          </Box>

          {newMessageAlert ? (
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.75rem",
                opacity: 0.7,
                fontWeight: 600,
                color: "#667eea",
              }}
            >
              {newMessageAlert.count} New Message{newMessageAlert.count > 1 ? "s" : ""}
            </Typography>
          ) : (
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.75rem",
                opacity: 0.5,
              }}
            >
              {isOnline ? "Active now" : "Offline"}
            </Typography>
          )}
        </Stack>

        {/* 3. New Message Badge - Moved to Right Side */}
        {newMessageAlert && newMessageAlert.count > 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              fontSize: "0.8rem",
              fontWeight: 700,
              boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
            }}
          >
            {newMessageAlert.count > 99 ? "99+" : newMessageAlert.count}
          </Box>
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);