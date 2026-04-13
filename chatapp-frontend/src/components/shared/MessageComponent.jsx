import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const sameSender = sender?._id === user?._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <motion.div
      initial={{ opacity: 0, x: sameSender ? "100%" : "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        maxWidth: "60%",
      }}
    >
      <Box
        sx={{
          background: sameSender
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "#e8eaea",
          color: sameSender ? "white" : "black",
          borderRadius: sameSender
            ? "18px 18px 4px 18px"
            : "18px 18px 18px 4px",
          padding: "0.75rem 1rem",
          width: "fit-content",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        {!sameSender && (
          <Typography
            color="#667eea"
            fontWeight={"700"}
            variant="caption"
            sx={{
              display: "block",
              marginBottom: "0.25rem",
            }}
          >
            {sender.name}
          </Typography>
        )}

        {content && (
          <Typography
            sx={{
              wordBreak: "break-word",
              marginY: attachments.length > 0 ? "0.5rem" : 0,
            }}
          >
            {content}
          </Typography>
        )}

        {attachments.length > 0 &&
          attachments.map((attachment, index) => {
            const url = attachment.url;
            const file = fileFormat(url);

            return (
              <Box key={index} sx={{ marginY: "0.5rem" }}>
                <a
                  href={url}
                  target="_blank"
                  download
                  style={{
                    color: sameSender ? "white" : "black",
                  }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })}

        <Typography
          variant="caption"
          sx={{
            color: sameSender ? "rgba(255, 255, 255, 0.7)" : "#999",
            display: "block",
            marginTop: "0.25rem",
            fontSize: "0.75rem",
          }}
        >
          {timeAgo}
        </Typography>
      </Box>
    </motion.div>
  );
};

export default memo(MessageComponent);
